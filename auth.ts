import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import * as z from 'zod';
import bcrypt from 'bcrypt';
import { findOneUser } from "./lib/actions";
import { CredentialsSchema } from "./lib/definitions";
import { authConfig } from "./auth.config";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        // Validate credentials with the schema
        console.log(credentials)
        const parsedCredentials = CredentialsSchema.safeParse(credentials);
        console.log(parsedCredentials)

        if (!parsedCredentials.success) {
          throw new Error("Invalid credentials format");
        }

        const { email, password } = parsedCredentials.data;

        // Check if user exists.
        user = await findOneUser(email);
        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.")
        }

        // Check if password is correct.
        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
          throw new Error("Invalid email or password");
        }        
 
        // return user object with the their profile data
        return user;
      },
    }),
  ],
})