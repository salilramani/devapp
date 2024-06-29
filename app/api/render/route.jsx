import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(targetUrl, { waitUntil: 'networkidle0' });
    
    // Inject a base tag to ensure relative resources are fetched correctly
    await page.evaluate(() => {
      const base = document.createElement('base');
      base.href = window.location.href;
      document.head.appendChild(base);
    });

    const content = await page.content();
    await browser.close();

    return new Response(content, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Puppeteer error:', error);
    return NextResponse.json({ error: 'Puppeteer error', details: error.message }, { status: 500 });
  }
};

export const dynamic = 'force-dynamic';