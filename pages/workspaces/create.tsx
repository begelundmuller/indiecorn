import React from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import Router from "next/router";
import { Workspace } from "@prisma/client";

import useMutation from "lib/useMutation";
import Alert from "components/Alert";
import Layout from "components/Layout";

type Inputs = {
  name: string;
};

const CreateWorkspace: React.FC = () => {
  const { register, handleSubmit, formState } = useForm<Inputs>();
  const [createWorkspace, { loading, error }] = useMutation<Inputs, Workspace>(
    "POST",
    "/api/workspaces"
  );

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4">
        <form
          className="space-y-8 divide-y divide-gray-200 dark:divide-gray-700"
          onSubmit={handleSubmit(async (input) => {
            createWorkspace({
              body: input,
              onSuccess: async (data) => {
                await Router.push("/workspaces/[id]", `/workspaces/${data.id}`);
              },
            });
          })}
        >
          <div>
            <h3 className="text-lg leading-6 font-medium">New workspace</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Workspaces have separate access permissions and billing plans
            </p>
          </div>

          <div className="pt-5 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Workspace name
              </label>
              <div className="mt-1">
                <input
                  {...register("name", {
                    required: { value: true, message: "Required" },
                    maxLength: { value: 64, message: "Too long (max length is 64)" },
                  })}
                  type="text"
                  placeholder="Foo Corp"
                  autoFocus
                  className={clsx(
                    "xx-input-text block w-full sm:text-sm",
                    formState.errors.name && "xx-input-text-error"
                  )}
                />
                {formState.errors.name && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {formState.errors.name.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="pt-5 space-y-6">
            {error && <Alert title="An error occurred">{error.message}</Alert>}
            <div>
              <button type="submit" className="py-2 px-4 xx-btn-primary" disabled={loading}>
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateWorkspace;
