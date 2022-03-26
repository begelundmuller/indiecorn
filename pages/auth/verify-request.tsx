import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import Layout from "components/Layout";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: { destination: "/", permanent: false },
    };
  }
  return { props: {} };
};

const VerifyRequest: React.FC = (_) => {
  return (
    <Layout>
      <div className="flex flex-col items-center space-y-8 justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <h2 className="text-center text-3xl font-bold">Check your email</h2>
          <p className="mt-6 text-center text-base text-gray-600 dark:text-gray-400">
            A sign in link has been sent to your email address
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default VerifyRequest;
