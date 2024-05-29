import { NextResponse } from 'next/server';
import axios from 'axios';

const apiKey = process.env.YOUTUBE_DATA_API_KEY;

// Function to extract video ID from the YouTube URL
function extractVideoID(url: string): string | null {
  const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\/|watch\?.+&v=)([^&=\n%\?]{11})|(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^&=\n%\?]{11})/;
  const matches = url.match(regex);
  return matches ? matches[1] || matches[2] : null;
}

// Function to fetch video details using YouTube Data API
async function fetchVideoData(videoID: string | null): Promise<any | null> {
  const apiURL = `https://www.googleapis.com/youtube/v3/videos?id=${videoID}&key=${apiKey}&part=snippet`;
  try {

    if (!videoID) {
      console.error('videoID was null.')
      throw Error;
    }

    const response = await axios.get(apiURL);
    const videoData = response.data.items[0];
    const title = videoData.snippet.title
    const thumbnailUrl = videoData.snippet.thumbnails.default.url
    return videoData ? { 'title': title, 'url': thumbnailUrl } : null;
  } catch (error) {
    console.error('Error fetching video details:', error);
    return null;
  }
}

// Next.js API route handler
export async function POST(request: Request) {
  const { url }: { url: string } = await request.json();

  if (!url || typeof url !== 'string') {
    return NextResponse.json({ error: 'Invalid or missing URL parameter' }, {status: 400});
  }

  const videoID = extractVideoID(url);
  if (videoID) {
    const videoData = await fetchVideoData(videoID);
    if (videoData) {
      return NextResponse.json(videoData);
    } else {
      return NextResponse.json({ error: 'Unable to fetch video title' }, {status: 500});
    }
  } else {
    return NextResponse.json({ error: 'Invalid YouTube URL' }, {status: 400});
  }
}
