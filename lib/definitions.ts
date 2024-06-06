import * as z from 'zod';

export type VideoData = {
  id: string;
  youtube_id: string;
  title: string;
  image_url: string;
  transcript: string;
  imported_at: Date;  
  published_at: Date;
  outline: string;
  blog: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export const CredentialsSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[a-z]/, { message: 'Password must include at least one lowercase letter' })
    .regex(/[A-Z]/, { message: 'Password must include at least one uppercase letter' })
    .regex(/[0-9]/, { message: 'Password must include at least one number' })
    .regex(/[\W_]/, { message: 'Password must include at least one special character' }),
});