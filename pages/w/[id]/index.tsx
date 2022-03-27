import { Workspace } from "@prisma/client";
import { GetServerSideProps } from "next";
import React from "react";

import Layout from "components/Layout";
import Posts, { PostProps } from "components/Posts";
import WorkspaceSelector from "components/WorkspaceSelector";
import prisma from "lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const currentWorkspace = await prisma.workspace.findFirst({
    where: { id },
    select: {
      id: true,
      name: true,
    },
  });
  if (!currentWorkspace) {
    return { notFound: true };
  }

  const feed = await prisma.post.findMany({
    where: {
      published: true,
      // workspaceId: id,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return {
    props: { feed, currentWorkspace },
  };
};

type Props = {
  feed: PostProps[];
  currentWorkspace: Workspace;
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 lg:px-8 space-y-8">
        <div className="flex space-x-4 justify-end">
          <WorkspaceSelector currentWorkspace={props.currentWorkspace} />
        </div>
        <div>
          <h1 className="text-3xl leading-6 font-medium">My feed</h1>
        </div>
        <Posts posts={props.feed} />
      </div>
    </Layout>
  );
};

export default Blog;
