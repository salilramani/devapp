import { NextResponse } from 'next/server';
import httpProxy from 'http-proxy';

// Create a proxy server
const proxy = httpProxy.createProxyServer({ changeOrigin: true });

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    console.error('URL is required');
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  console.log(`Proxying request to: ${targetUrl}`);

  return new Promise((resolve, reject) => {
    proxy.web(req, req.res, { target: targetUrl }, (error) => {
      if (error) {
        console.error('Proxy error:', error);
        reject(NextResponse.json({ error: 'Proxy error', details: error.message }, { status: 500 }));
      }
      resolve();
    });
  });
}

export const dynamic = 'force-dynamic';