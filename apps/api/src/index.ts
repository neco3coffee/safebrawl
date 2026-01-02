import { Hono } from 'hono'
import { logger } from 'hono/logger'

type Bindings = {
  PROXY_TARGET_URL: string
}

const app = new Hono<{ Bindings: Bindings }>()
app.use('*', logger())

app.get('/', (c) => {
  const proxyTargetUrl = c.env.PROXY_TARGET_URL
  return c.text(`Hello Hono!! Proxy URL: ${proxyTargetUrl}`)
})

export default app
