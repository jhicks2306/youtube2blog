'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import OpenAI from "openai";

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

export async function updateVideoTranscript(id: string, transcript: string): Promise<{ message: string } | void> {
  try {
    await sql`
    UPDATE videos
    SET transcript = ${transcript}
    WHERE id = ${id};
    `;
    console.log("New transcript updated in database.")
  } catch (error) {
    return {
      message: 'Database Error: Failed to update video with transcript.'
    };
  }
}

export async function updateVideoOutline(id: string, outline: string): Promise<{ message: string } | void> {
  try {
    await sql`
    UPDATE videos
    SET outline = ${outline}
    WHERE id = ${id};
    `;
    console.log('New outline updated in databse.')
  } catch (error) {
    return {
      message: 'Database Error: Failed to update video with outline.'
    };
  }
  revalidatePath('/[id]/outline', 'page')
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

export async function generateOutline(transcript: string) {

  // Retrieve the API key from the environment variables
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
      console.error("OpenAI API key not found. Please provide it in your .env file.");
      process.exit(1);
    }

  const openai = new OpenAI({ apiKey });

  if (!transcript) {
    throw Error('generateOutline action requires a transcript as string.')
  }

  try {
    const prompt = `Generate a blog title and suggested outline based on the following transcript:\n\n${transcript}`;
    const completion = await openai.chat.completions.create({
        messages: [
            {"role": "system", "content": "You an assistant skilled at content creation."},
            {"role": "user", "content": prompt}
        ],
        model: "gpt-3.5-turbo",
      });

    const outline = completion.choices[0].message.content;
    return outline;
  } catch (error: any) {
    throw Error(error.message)
  }
}

export async function generateBlog(outline: string, transcript: string, formData: FormData) {

  const rawFormData = {
    wordCount: formData.get('word-count'),
    tone: formData.get('tone'),
    keywords: formData.get('keywords'),
  }

  console.log(outline, transcript, rawFormData.wordCount, rawFormData.tone, rawFormData.keywords)
}