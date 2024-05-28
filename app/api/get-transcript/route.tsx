import { NextResponse } from 'next/server';
import { YoutubeTranscript, TranscriptConfig } from 'youtube-transcript';

export async function POST(request: Request) {
  const { url }: { url: string } = await request.json();

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const options: TranscriptConfig = { lang: 'en' };
    const transcript = await YoutubeTranscript.fetchTranscript(url, options);

    // Extract only the text
    const transcriptText = transcript.map(item => item.text).join(' ');

    return NextResponse.json({ "transcript": transcriptText });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
