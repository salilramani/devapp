import { NextResponse } from 'next/server';
import httpProxy from 'http-proxy';

// Create a proxy server
const proxy = httpProxy.createProxyServer({ changeOrigin: true });

export const GET = async (req, res) => {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  return new Promise((resolve, reject) => {
    req.url = targetUrl;
    proxy.web(req, res, { target: targetUrl }, (error) => {
      if (error) {
        reject(NextResponse.json({ error: 'Proxy error', details: error.message }, { status: 500 }));
      }
      resolve();
    });
  });
};

export const config = {
  api: {
    externalResolver: true,
  },
};