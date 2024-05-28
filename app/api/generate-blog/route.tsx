// app/api/generate-outline/route.ts
import { NextResponse } from 'next/server';
import OpenAI from "openai";
import path from "path";

// Retrieve the API key from the environment variables
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
    console.error("OpenAI API key not found. Please provide it in your .env file.");
    process.exit(1);
  }

const openai = new OpenAI({ apiKey });

export async function POST(request: Request) {
    const { transcript, outline }: { transcript: string, outline: string } = await request.json();

  if (!outline) {
    return NextResponse.json({ error: 'Outline is required' }, { status: 400 });
  }

  try {
    const prompt = `Generate a blog (up to 600 words) based on this transcript: \n\n${transcript}\n\n When generating the blog, follow this outline:\n\n${outline}`;
    const completion = await openai.chat.completions.create({
        messages: [
            {"role": "system", "content": "You an assistant skilled at content creation."},
            {"role": "user", "content": prompt}
        ],
        model: "gpt-3.5-turbo",
      });

    const result = completion.choices[0].message.content;
    return NextResponse.json({ "blog": result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
