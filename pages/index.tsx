import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Posts, { PostProps } from "../components/Posts";
import prisma from "../lib/prisma";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: {
      published: true,
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
    props: { feed },
  };
};

type Props = {
  feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 lg:px-8 space-y-8">
        <div>
          <h1 className="text-3xl leading-6 font-medium">My feed</h1>
        </div>
        <Posts posts={props.feed} />
      </div>
    </Layout>
  );
};

export default Blog;
