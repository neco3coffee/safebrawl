import { Hono } from 'hono'

type Bindings = {
  PROXY_TARGET_URL: string
}

const app = new Hono<{ Bindings: Bindings }>()
app.route('/api', app)

app.get('/', (c) => {
  const proxyTargetUrl = c.env.PROXY_TARGET_URL
  return c.text(`Hello Hono! Proxy URL: ${proxyTargetUrl}`)
})

export default app
