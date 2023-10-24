import { NextAuthOptions } from 'next-auth'
import GoogleProvider from "next-auth/providers/google";
import { prisma } from './db';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { JWT } from 'next-auth/jwt';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: "/login"
    },
    secret: process.env.SECRET,
    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.CLIENT_ID as string,
            clientSecret: process.env.CLIENT_SECRET as string,
        })
    ],
    callbacks: {
        async session({ session, token }) {
            const _user = await prisma.user.findFirst({
                where: {
                    email: token.email
                }
            })
            return {
                ...session,
                user: {
                    ...session.user,
                    id: _user?.id,
                    role: token.role,
                }

            }
        },
        async jwt({ token, session }) {
            const _user = await prisma.user.findFirst({
                where: {
                    email: token.email
                }
            })
            const role = _user?.role;
            const id = _user?.id;
            return {
                ...token,
                role,
                id
            } as JWT
        }


    }
}