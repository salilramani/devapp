import { NextResponse } from 'next/server';
import { Client } from 'pg';

const client = new Client({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

export async function POST(request) {
  const { name, email, url } = await request.json();

  try {
    const query = 'INSERT INTO users (user_name, user_email, markup_url) VALUES ($1, $2, $3)';
    const values = [name, email, url];
    await client.query(query, values);
    return NextResponse.json({ message: 'Form submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error inserting data:', error);
    return NextResponse.json({ error: 'Error submitting form' }, { status: 500 });
  }
}