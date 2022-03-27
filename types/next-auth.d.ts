import type NextAuth, { DefaultSession } from "next-auth";
import type { BuiltInProviderType } from "next-auth/providers";
import type { ClientSafeProvider, LiteralUnion } from "next-auth/react";

// Convenience type since the library doesn't declare this shorthand
export type Providers = Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;

/**
 * Adds additional properties to the session object returned by useSession, getSession, etc.
 * For details, see: https://next-auth.js.org/getting-started/typescript
 */
declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
    } & DefaultSession["user"]
  }
}
