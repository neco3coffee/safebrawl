import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'

type Bindings = {
  PROXY_TARGET_URL: string
  KV: KVNamespace
  DB: D1Database
}

type SearchEvent = {
  id: number
  player_tag: string
  player_name: string | null
  icon_id: number | null
  country: string | null
  created_at: number
}

const app = new Hono<{ Bindings: Bindings }>()
app.use('*', logger())
app.use('*', cors({
  origin: ['https://safebrawl.com', 'https://dev-app.safebrawl.com', 'http://localhost:3333'],
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
}))

app.get('/', (c) => {
  return c.text('Safebrawl API')
})

// POST /api/track - 検索イベントを記録
app.post('/api/track', async (c) => {
  const body = await c.req.json<{
    player_tag: string
    player_name: string | null
    icon_id: number | null
  }>()

  const { player_tag, player_name, icon_id } = body
  if (!player_tag) {
    return c.json({ error: 'player_tag is required' }, 400)
  }

  const country = c.req.raw.cf?.country as string | null ?? null
  const ip = c.req.header('CF-Connecting-IP') ?? 'unknown'
  const created_at = Math.floor(Date.now() / 1000)

  // スパム防止: 同一IP+タグの60秒以内の連続検索を防ぐ
  const kvKey = `recent_search:${ip}:${player_tag}`
  const existing = await c.env.KV.get(kvKey)
  if (existing) {
    return c.json({ ok: true, skipped: true })
  }

  await Promise.all([
    c.env.DB.prepare(
      `INSERT INTO search_events (player_tag, player_name, icon_id, country, created_at)
       VALUES (?, ?, ?, ?, ?)`
    ).bind(player_tag, player_name, icon_id, country, created_at).run(),
    c.env.KV.put(kvKey, '1', { expirationTtl: 60 }),
  ])

  return c.json({ ok: true })
})

// GET /api/feed - ライブフィードを取得
app.get('/api/feed', async (c) => {
  const afterParam = c.req.query('after')
  const after = afterParam ? parseInt(afterParam, 10) : null

  let result: D1Result<SearchEvent>

  if (after !== null && !isNaN(after)) {
    // 差分取得: after以降のイベントを昇順で最大100件
    result = await c.env.DB.prepare(
      `SELECT * FROM search_events WHERE id > ? LIMIT 100`
    ).bind(after).all<SearchEvent>()
  } else {
    // 初回取得: 最新30件を降順で
    result = await c.env.DB.prepare(
      `SELECT * FROM search_events ORDER BY id DESC LIMIT 30`
    ).all<SearchEvent>()

    // Edge Cacheを有効化
    c.header('Cache-Control', 's-maxage=5')
  }

  return c.json({ events: result.results })
})

// Cron: 30日以上前のsearch_eventsを削除
export default {
  fetch: app.fetch,
  async scheduled(_event: ScheduledEvent, env: Bindings, _ctx: ExecutionContext) {
    const thirtyDaysAgo = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60
    await env.DB.prepare(
      `DELETE FROM search_events WHERE created_at < ?`
    ).bind(thirtyDaysAgo).run()
  },
}