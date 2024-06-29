import { NextResponse } from 'next/server';
import { Client } from 'pg';

const client = new Client({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id'); // Ensure correct parameter name

  if (!id) {
    return NextResponse.json({ message: 'ID is required' }, { status: 400 });
  }

  try {
    console.log(`Attempting to delete markup with ID: ${id}`);
    const query = 'DELETE FROM users WHERE id = $1';
    const values = [id];
    const result = await client.query(query, values);

    if (result.rowCount === 0) {
      return NextResponse.json({ message: 'Markup not found' }, { status: 404 });
    }

    console.log(`Successfully deleted markup with ID: ${id}`);
    return NextResponse.json({ message: 'Markup deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting markup:', error);
    return NextResponse.json({ message: 'Error deleting markup', error: error.message }, { status: 500 });
  }
}