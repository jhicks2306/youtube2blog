'use server';

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
      ORDER BY imported_at ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all videos.');
  }
}

export async function fetchVideoById(id: string) {
  try {
    const data = await sql<VideoData>`
      SELECT
      id,
      youtube_id,
      title,
      image_url,
      transcript,
      imported_at,
      published_at,
      outline,
      blog
      FROM videos
      WHERE id = ${id}
    `;

    const video = data.rows[0];
    return video;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all videos.');
  }
}