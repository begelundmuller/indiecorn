import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Posts: React.FC<{ posts: PostProps[] }> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {posts.map((post) => (
        <div
          key={post.id}
          onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
          className="hover:cursor-pointer rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black p-6 shadow-sm space-y-3 hover:border-gray-500 dark:hover:border-gray-500"
        >
          <h2 className="text-xl font-medium">{post.title}</h2>
          <small className="text-sm">
            By {post.author ? post.author.name : "Unknown author"}
          </small>
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      ))}
    </div>
  );
};

export default Posts;
