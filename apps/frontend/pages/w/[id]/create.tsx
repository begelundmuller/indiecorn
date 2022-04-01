import Router from "next/router";
import React, { useState } from "react";

import Layout from "@frontend/components/Layout";

const Draft: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content };
      await fetch(`http://localhost:3000/api/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/drafts");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 lg:px-8">
        <form
          onSubmit={submitData}
          className="space-y-8 divide-y divide-gray-200 dark:divide-gray-700"
        >
          <div>
            <h3 className="text-lg leading-6 font-medium">New draft</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              After you create a draft, you can publish it as a post
            </p>
          </div>

          <div className="pt-5 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Title
              </label>
              <div className="mt-1">
                <input
                  id="text"
                  name="text"
                  type="text"
                  className="xx-input-text block w-full sm:text-sm"
                  autoFocus
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  value={title}
                />
              </div>
            </div>
            <div className="sm:col-span-6">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Content
              </label>
              <div className="mt-1">
                <textarea
                  id="content"
                  name="content"
                  rows={8}
                  className="xx-input-text block w-full sm:text-sm"
                  placeholder="Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Time to get creative!</p>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex">
              <button
                type="button"
                onClick={() => Router.push("/")}
                className="py-2 px-4 xx-btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!content || !title}
                className="ml-3 py-2 px-4 xx-btn-primary"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Draft;
