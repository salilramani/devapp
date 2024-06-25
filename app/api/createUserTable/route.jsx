import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request) {
  try {
    const result =
  
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;
    await sql`
      CREATE TABLE IF NOT EXISTS users (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          user_name VARCHAR(100) NOT NULL,
          user_email VARCHAR(100) UNIQUE NOT NULL,
          markup_url TEXT
      );
    `;

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}