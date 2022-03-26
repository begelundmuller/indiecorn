import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Router from "next/router";
import { useSession } from "next-auth/react";

import Layout from "components/Layout";
import { PostProps } from "components/Posts";
import prisma from "lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: post,
  };
};

async function publishPost(id: number): Promise<void> {
  await fetch(`http://localhost:3000/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/");
}

async function deletePost(id: number): Promise<void> {
  await fetch(`http://localhost:3000/api/post/${id}`, {
    method: "DELETE",
  });
  await Router.push("/");
}

const Post: React.FC<PostProps> = (props) => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 lg:px-8 space-y-8">
        <h1 className="text-3xl leading-6 font-medium">{title}</h1>
        <p className="text-base">By {props?.author?.name || "Unknown author"}</p>
        <ReactMarkdown>{props.content}</ReactMarkdown>
        <div className="flex space-x-2">
          {userHasValidSession && postBelongsToUser && (
            <button className="py-2 px-4 xx-btn-secondary" onClick={() => deletePost(props.id)}>
              Delete
            </button>
          )}
          {!props.published && userHasValidSession && postBelongsToUser && (
            <button className="py-2 px-4 xx-btn-primary" onClick={() => publishPost(props.id)}>
              Publish
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Post;
