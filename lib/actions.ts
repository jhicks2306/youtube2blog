'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import OpenAI from "openai";
import { redirect } from 'next/navigation'
import { sleeper } from './utils';

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
    console.log('New outline updated in database.')
  } catch (error) {
    return {
      message: 'Database Error: Failed to update video with outline.'
    };
  }
  revalidatePath('/dashboard/[id]/edit-blog', 'page')
}

export async function updateVideoBlog(id: string, blog: string): Promise<{ message: string } | void> {
  try {
    await sql`
    UPDATE videos
    SET blog = ${blog}
    WHERE id = ${id};
    `;
    console.log('New blog updated in database.')
  } catch (error) {
    return {
      message: 'Database Error: Failed to update video with blog.'
    };
  }
  revalidatePath('/dashboard/[id]/edit-blog', 'page')
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
    // Check if error has a message property
    const errorMessage = error?.message || 'An unexpected error occurred';
    console.error('Error:', errorMessage);
  }
}

export async function generateBlog( id: string, outline: string, transcript: string, formData: FormData) {

  // Collect form data
  const rawFormData = {
    wordCount: formData.get('word-count'),
    tone: formData.get('tone'),
    keywords: formData.get('keywords'),
  }
  const wordCountStr = rawFormData.wordCount?.toString();

  // Retrieve the API key from the environment variables
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
      console.error("OpenAI API key not found. Please provide it in your .env file.");
      process.exit(1);
  }
  const openai = new OpenAI({ apiKey });

  try {
    // Call OpenAI API.
    const prompt = `Generate a blog (up to ${wordCountStr} words) based on this transcript:\n\n${transcript}\n\n
     When generating the blog, follow this outline:\n\n${outline}\n\n
     Include these keyword(s): ${rawFormData.keywords}\n\n
     Finally, be sure to write with this tone of voice: ${rawFormData.tone}`;
    const completion = await openai.chat.completions.create({
        messages: [
            {"role": "system", "content": "You an assistant skilled at content creation."},
            {"role": "user", "content": prompt}
        ],
        model: "gpt-3.5-turbo",
      });

    const blog = completion.choices[0].message.content;
    console.log(blog)
    if (typeof blog === 'string') { await updateVideoBlog(id, blog) }
    return blog;

  //  await sleeper();
  } catch (error: any) {
    // Check if error has a message property
    const errorMessage = error?.message || 'An unexpected error occurred';
    console.error('Error:', errorMessage);
  }

  // console.log(id, outline, transcript, rawFormData.wordCount, rawFormData.tone, rawFormData.keywords)
}