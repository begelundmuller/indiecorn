import clsx from "clsx";
import { GetServerSideProps } from "next";
import { getCsrfToken, getProviders, getSession, signIn } from "next-auth/react";
import { useState } from "react";

import Layout from "@frontend/components/Layout";
import { Providers } from "@frontend/types/next-auth";

type Props = {
  csrfToken: string | undefined;
  providers: Providers | undefined;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    const { callbackUrl } = context.query;
    const destination = typeof callbackUrl === "string" ? callbackUrl : "/";
    return {
      redirect: { destination, permanent: false },
    };
  }

  const csrfToken = await getCsrfToken(context);
  const providers = await getProviders();
  return {
    props: { csrfToken, providers },
  };
};

const SignIn: React.FC<Props> = ({ csrfToken, providers }) => {
  const [email, setEmail] = useState("");
  return (
    <Layout>
      <div className="flex flex-col items-center space-y-8 justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <h2 className="text-center text-5xl font-extrabold">Sign in</h2>
          <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
            Creates an account if you don't already have one
          </p>
        </div>
        <div className="w-full max-w-xs space-y-6">
          {Object.values(providers).map((provider) => {
            if (provider.id === "email") {
              return (
                <form
                  key={provider.name}
                  className="space-y-3"
                  method="post"
                  action="/api/auth/signin/email"
                >
                  <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                  <div className="w-full py-2 border-t border-gray-300 dark:border-gray-700" />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="xx-input-text w-full"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type="submit" className="w-full px-6 py-3 xx-btn-primary">
                    Sign in with Email
                  </button>
                </form>
              );
            }

            const socialButtonColors = {
              google: "text-white bg-blue-500 hover:bg-blue-600",
            };

            return (
              <button
                key={provider.name}
                type="button"
                className={clsx(
                  "w-full px-6 py-3 xx-btn",
                  socialButtonColors[provider.id] || "xx-btn-primary"
                )}
                onClick={() => signIn(provider.id)}
              >
                Sign in with {provider.name}
              </button>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
