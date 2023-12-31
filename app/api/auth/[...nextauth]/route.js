import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
if(!process.env.NEXTAUTH_SECRET){
  throw new Error("please provide process.env.NEXTAUTH_SECRET environment variable");
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your Email",
        }, // You can customize this label to 'Email'
        password: { label: "Password", type: "password" }, // You can customize this label to 'Password'
      },
      authorize: async (credentials) => {
        // Add your own authentication logic here
        if (
          credentials.email === "user@example.com" &&
          credentials.password === "1Password"
        ) {
          // If credentials are valid, return the user object
          return Promise.resolve({ email: credentials.email });
        } else {
          // If credentials are invalid, return null
          return Promise.resolve(null);
        }
      },
    }),
  ],
session:{
  strategy: "jwt",
}

});

export { handler as GET, handler as POST };
