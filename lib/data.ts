import { sql } from '@vercel/postgres';
import {
  VideoData,
} from './definitions';

export async function fetchVideos() {
  try {
    const data = await sql<VideoData>`
      SELECT
      *
      FROM videos
      ORDER BY imported_at
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all videos.');
  }
}