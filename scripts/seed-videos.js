const { v4: uuidv4 } = require('uuid');
const { db } = require('@vercel/postgres');

async function insertDummyData(client, data) {
  try {
    for (const item of data) {
      await client.sql`
        INSERT INTO videos (id, youtube_id, title, image_url)
        VALUES (${item.id}, ${item.youtube_id}, ${item.title}, ${item.image_url});
      `;
    }

    console.log('Inserted dummy data into "videos" table');
  } catch (error) {
    console.error('Error inserting dummy data:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  const dummyData = [
    {
      youtube_id: 'T5bhV5H9jQE',
      name: 'Niacinamide For Skin: Everything You Need To Know | Evidence-Based',
      image_url: 'https://i.ytimg.com/vi/7lCDEYXw3mM/default.jpg',
    },
    // Add more dummy data as needed
  ];

  // Add UUIDs to the dummy data
  const dummyDataWithUUIDs = dummyData.map(data => ({
    id: uuidv4(),
    ...data,
  }));

  await insertDummyData(client, dummyDataWithUUIDs);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to insert dummy data into the videos table:',
    err,
  );
});
