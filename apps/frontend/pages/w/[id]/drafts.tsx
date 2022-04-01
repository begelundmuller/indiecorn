import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import React from "react";

import Layout from "@frontend/components/Layout";
import Posts, { PostProps } from "@frontend/components/Posts";
import prisma from "@frontend/lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const drafts = await prisma.post.findMany({
    where: {
      author: { email: session.user.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { drafts },
  };
};

type Props = {
  drafts: PostProps[];
};

const Drafts: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 lg:px-8 space-y-8">
        <div>
          <h1 className="text-3xl leading-6 font-medium">My drafts</h1>
          {!session && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              You need to be authenticated to view this page
            </p>
          )}
        </div>
        {session && <Posts posts={props.drafts} />}
      </div>
    </Layout>
  );
};

export default Drafts;
