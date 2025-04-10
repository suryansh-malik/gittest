import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials" 
import GoogleProvider from "next-auth/providers/google"
import { checkuseraccountexist, getUserByEmail } from "../../../../lib/database/userController";
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma";

interface Credentials {
  email: string;
  password: string;
}


const handler = NextAuth({
  
    providers: [
      CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" }
          }, 
          async authorize(credentials?: Credentials){
            if (!credentials?.email || !credentials?.password) {
              throw new Error("Email and password are required!");
            }
            // find user with email from database
            const user = await getUserByEmail({email:credentials.email});
            if (!user) {
              // No user found, so this is their first attempt to login
              throw new Error(JSON.stringify({ code: "EMAIL_NOT_FOUND", message: "Email not found" }))
            }else{
              const googleaccountexist = await checkuseraccountexist({userId:user.id})
              if(googleaccountexist){
                throw new Error(JSON.stringify({
                  code: "GOOGLE_ACCOUNT_EXISTS",
                  message: "Please sign in using Google",
                }));
              }
            }
            
            // verifying the password mathces 
            const  isPasswordValid = credentials.password === user.password
            if (!isPasswordValid){
              throw new Error(JSON.stringify({ code: "INVALID_PASSWORD", message: "Password is incorrect" }));
            }
            // return user object with their profile data
            return user
          },
          
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
          })
      ],
      adapter: PrismaAdapter(prisma),
      secret:process.env.NEXTAUTH_SECRET,
      session: {
        strategy: "jwt", // Ensure JWT session strategy for middleware
      },
      pages: {
        signIn: '/auth/signin'
      }
})

export { handler as GET, handler as POST }