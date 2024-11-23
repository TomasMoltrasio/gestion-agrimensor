import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      // Lista de correos permitidos
      const allowedEmails = [
        "correo1@example.com",
        "correo2@example.com",
        "tomymoltrasio@gmail.com",
      ];
      if (profile?.email && allowedEmails.includes(profile.email)) {
        return true; // Permitir el inicio de sesión
      } else {
        return false; // Rechazar el inicio de sesión
      }
    },
    async session({ session, user }) {
      // Opcional: Puedes personalizar la sesión
      return session;
    },
  },
});

export { handler as GET, handler as POST };
