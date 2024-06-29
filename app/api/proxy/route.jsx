import { createProxyMiddleware } from 'http-proxy-middleware';

const proxy = createProxyMiddleware({
  target: '', // This will be dynamically set
  changeOrigin: true,
  pathRewrite: (path, req) => {
    const url = new URL(req.url, `https://${req.headers.host}`);
    return url.searchParams.get('url').replace(/^\/proxy/, '');
  },
  onProxyReq: (proxyReq, req, res) => {
    const targetUrl = new URL(req.query.url);
    proxyReq.setHeader('Host', targetUrl.host);
  },
});

export const GET = (req, res) => {
  return proxy(req, res);
};

export const dynamic = 'force-dynamic';