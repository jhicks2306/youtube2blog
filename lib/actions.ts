'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import OpenAI from "openai";
import bcrypt from 'bcrypt';
import { User } from './definitions';
import { auth, signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

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


export async function signupUser(email: string, password: string) {
  
  // Check if email already exists.
  const user = await findOneUser(email);
  if (user) return { message: "User already exists." };

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Add user to database.
  const result = addUser(email, hashedPassword);

  // Return success message.
  return result;
}

export async function findOneUser(email: string) {

    const data = await sql<User>`
      SELECT
      id,
      name,
      email,
      password,
      credits
      FROM users
      WHERE email = ${email}
      LIMIT 1;
    `;

    if (data.rowCount > 0) {
      const user = data.rows[0];
      return user
    } else {
      return null;
    }
}

export async function addUser(email: string, hashedPassword: string): Promise<{ message: string }> {
  try {
    await sql`
    INSERT INTO users (email, password, credits)
    VALUES (${email}, ${hashedPassword}, 0);
    `;
    return { message: 'User created.'};
  } catch (error: any) {
    console.error('Error adding user to database:', error);
    return {
      message: 'Database Error: Failed to add user to database.'
    };
  }
}

export async function authenticate(
  formData: FormData,
) {
  try {
    console.log(formData)
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function logOut() {
  await signOut();
}

export async function updatePassword(old_password: string, new_password: string) {
  console.log('Passwords:', old_password, new_password)
  
  // Get user session and fetch user.
  let session = await auth();
  console.log(session);

  if (!session) return { message: 'No user session found.' };
  if (typeof session.user?.email !== 'string') return { message: 'No user email found.' };
  
  const email = session.user.email;
  const user = await findOneUser(email);

  if (!user) return {message: 'No matching user found in database. Try logging out and back in first'}
  console.log(user);

  // Confirm old password is correct.
  const passwordsMatch = await bcrypt.compare(old_password, user.password);
  if(!passwordsMatch) return { message: 'Old password incorrect.'}

  // Store new password.
  const new_hashedPassword = await bcrypt.hash(new_password, 10);
  const result = await overwritePassword(user.id, new_hashedPassword)  

  return result;
};

export async function overwritePassword(id: string, new_passwordHashed: string) {
  try {
    await sql`
    UPDATE users
    SET password = ${new_passwordHashed}
    WHERE id = ${id};
    `;
    console.log("Password successfully updated.")
    return true;
  } catch (error) {
    console.error('Database Error: Password update failed.', error)
    return false;
  }
}

export async function handleCheckoutSessionCompleted(client_reference_id: string, quantity: number) {

  // Calculate credits purchased.
  const credits = 20 * quantity;

  // Update credits in database.
  try {
    await sql`
    UPDATE users
    SET credits = credits + ${credits}
    WHERE id = ${client_reference_id};
    `;
    console.log("Credits added to user account.")
  } catch (error) {
    console.error('Database Error: Failed to update credits in user account.', error)
  }
}

export async function fetchUserInfo() {
    // Get user session.
    let session = await auth();
    const stripePaymentLink = process.env.STRIPE_PAYMENT_LINK;

    if (!session) throw new Error('No active session found.');
    if (typeof session.user?.email !== 'string') throw new Error('No user email available in session data.');

    // Fetch user and credits.
    const user = await findOneUser(session.user.email)
    if(!user) throw new Error('No user found in database.');

    // Construct payment link
    const splitEmail = user.email.split('@');
    const stripePaymentLinkWithId = `${stripePaymentLink}?client_reference_id=${user.id}&prefilled_email=${splitEmail[0]}%40${splitEmail[1]}`
    console.log(stripePaymentLinkWithId)


    return { paymentLink: stripePaymentLinkWithId, credits: user.credits.toString() };
};

export async function useCredit() {
    // Get user session.
    let session = await auth();

    if (!session) throw new Error('No active session found.');
    if (typeof session.user?.email !== 'string') throw new Error('No user email available in session data.');
    
    // Fetch user and credits.
    const user = await findOneUser(session.user.email)
    if(!user) throw new Error('No user found in database.');

    if (user.credits == 0) return

    // Update credits in database.
    try {
      await sql`
      UPDATE users
      SET credits = credits - 1
      WHERE id = ${user.id};
      `;
      console.log("Credits added to user account.")
    } catch (error) {
      console.error('Database Error: Failed to update credits in user account.', error)
    }
    revalidatePath('/dashboard/settings')
  };




  






