import NextAuth from "next-auth";
// import Google from 'next-auth/providers/google';
import Credentials from "next-auth/providers/credentials";
import { api } from "@/lib/api";
import { UserSession } from "./schemas";
import { isAdmin, UsersRole } from "./usersRole";
export const { handlers, auth } = NextAuth({
    providers: [
        // Google({
        //     clientId: process.env.GOOGLE_CLIENT_ID || '',
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        // }),
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const res = await api.post('/users/login', {
                    email: credentials?.email,
                    password: credentials?.password,
                });
                if (res.success && res.data) {
                    return {...res.data, role: isAdmin(res.data.email) ? 'admin' : 'user'} as UserSession;
                } else {
                    return null;
                }
            }
        }),
    ],
    pages: {
        signIn: '/login',
        // signOut: '/',
        // signOut: '/login',
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        authorized({ auth, request }) {
            console.log("\n--- MIDDLEWARE DIAGNOSTICS ---");
            console.log("REQUEST URL:", request.url);
            console.log("SESSION:", auth);
            console.log("--- END DIAGNOSTICS ---\n");
            // This is the default behavior: returns true if session exists, false otherwise.
            // Returning false will trigger a redirect to the login page.
            return !!auth;
        },
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.role = token.role as string;
                session.user.id = token.sub;
                session.user.username = token.username as string;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    // debug: process.env.NODE_ENV === 'development',
});

export default auth;