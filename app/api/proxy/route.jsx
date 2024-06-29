import { NextResponse } from 'next/server';
import httpProxy from 'http-proxy';

// Create a proxy server
const proxy = httpProxy.createProxyServer({ changeOrigin: true });

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  return new Promise((resolve, reject) => {
    proxy.web(request, request.res, { target: targetUrl }, (error) => {
      if (error) {
        reject(NextResponse.json({ error: 'Proxy error', details: error.message }, { status: 500 }));
      }
      resolve();
    });
  });
};

export const dynamic = 'force-dynamic';