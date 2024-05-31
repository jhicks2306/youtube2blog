'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export async function createVideo(youtube_id: string, title: string, image_url: string, published_at: string, transcript: string): Promise<{ message: string } | void> {
  const time_stamp = new Date().toISOString()
  // Insert data into the database
  try {
    await sql`
      INSERT INTO videos (youtube_id, title, image_url, published_at, imported_at, transcript)
      VALUES (${youtube_id}, ${title}, ${image_url}, ${published_at}, ${time_stamp}, ${transcript})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to create video.'
    };
  }

  // Revalidate the cache for the videos page.
  revalidatePath('/');
}

export async function updateVideo(id: string, transcript: string): Promise<{ message: string } | void> {
  try {
    await sql`
    UPDATE videos
    SET transcript = ${transcript}
    WHERE id = ${id};
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to update video with transcript.'
    };
  }
}

export async function deleteVideo(id: string): Promise<{ message: string } | void> {
  try {
    await sql`
    DELETE FROM videos
    WHERE id = ${id};
    `;
    
    // Revalidate the cache for the videos page.
    revalidatePath('/')
  } catch (error) {
    return {
      message: 'Database Error: Failed to delete video.'
    };
  }
}
