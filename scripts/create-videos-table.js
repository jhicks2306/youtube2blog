const { db } = require('@vercel/postgres');

async function createVideos(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "Videos" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS videos (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        youtube_id VARCHAR(255) NOT NULL,        
        title VARCHAR(255) NOT NULL,
        image_url TEXT,
        transcript TEXT
      );
    `;

    console.log(`Created "videos" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error creating videos table:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await createVideos(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to create Videos table in the database:',
    err,
  );
});
