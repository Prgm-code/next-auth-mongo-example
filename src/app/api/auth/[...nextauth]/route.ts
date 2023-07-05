import bcrypt  from 'bcryptjs';

import NextAuth from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import { connectDB } from '@/libs/mongodb';
import User from "@/models/user";


const handler = NextAuth({  
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email ", type: "email", placeholder: "jsmith@test.com" },
                password: { label: "Password", type: "password",placeholder: "******" }
            },
             async authorize(credentials, req) {
               await connectDB();
               console.log("credentials", credentials);

                const userFound = await User.findOne({ email: credentials?.email }).select("+password");
                if (!userFound) throw new Error("invalid credentials");
                console.log("userFound", userFound);
                

                const passwordMatch = await bcrypt.compare(credentials!.password, userFound.password);
                if (!passwordMatch) throw new Error("invalid credentials");
                

                return userFound;
            }
        })
    ],
    callbacks: {
        jwt({account, token, user, profile, session}) {
           
            if (user) token.user = user;  
        console.log("jwt", token);

            return token;
        },
        session({session, token}) {
            console.log({
                session,
                token,
      
            });
            session.user = token.user as any;
            
            return session;
        }

    },
    pages: {
        signIn: "/login"
    },

});
export { handler as GET, handler as POST}
