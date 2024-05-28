// app/api/generate-outline/route.ts
import { NextResponse } from 'next/server';
import OpenAI from "openai";
// import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
// dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

// Retrieve the API key from the environment variables
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
    console.error("OpenAI API key not found. Please provide it in your .env file.");
    process.exit(1);
  }

const openai = new OpenAI({ apiKey });

export async function POST(request: Request) {
    const { transcript }: { transcript: string } = await request.json();

  if (!transcript) {
    return NextResponse.json({ error: 'Transcript is required' }, { status: 400 });
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

    const result = completion.choices[0].message.content;
    return NextResponse.json({ "outline": result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
