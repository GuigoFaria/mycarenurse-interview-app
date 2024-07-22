// src/app/api/auth/[...nextauth]/options.ts
import { apiUrl } from "@/helpers";
import { decode } from "jsonwebtoken";
import CredentialsProvider from "next-auth/providers/credentials";

const nextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "auth-mycarenurse",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Digite o seu e-mail",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Digite a sua senha",
        },
      },

      async authorize(credentials, req) {
        try {
          const res = await fetch(`${apiUrl}/auth/login`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });

          const result = await res.json();

          if (res.ok && result.access_token) {
            const decodedToken = decode(result.access_token) as any;

            return {
              id: decodedToken?.sub,
              email: decodedToken.email,
              accessToken: result.access_token,
            };
          }

          throw new Error(result.message || "Failed to authorize");
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      user && (token.user = { ...user });

      return token;
    },
    async session({ session, token }: any) {
      session.user = {
        ...token.user,
      };
      return session;
    },
  },
};

export default nextAuthOptions;
