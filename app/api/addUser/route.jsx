import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userName = searchParams.get('userName');
  const userEmail = searchParams.get('userEmail');
  const markupUrl = searchParams.get('markupUrl');

  try {
    if (!userName || !userEmail) throw new Error('User name and email are required');
    await sql`
      INSERT INTO users (user_name, user_email, markup_url) 
      VALUES (${userName}, ${userEmail}, ${markupUrl});
    `;
    return NextResponse.json({ message: 'User added successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error inserting data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
