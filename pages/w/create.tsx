import { Workspace } from "@prisma/client";
import clsx from "clsx";
import Router from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

import Alert from "components/Alert";
import FormCard from "components/FormCard";
import Layout from "components/Layout";
import useMutation from "lib/useMutation";

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
      <div className="max-w-3xl mx-auto px-0 sm:px-4">
        <form
          onSubmit={handleSubmit(async (input) => {
            createWorkspace({
              body: input,
              onSuccess: async (data) => {
                await Router.push("/w/[id]", `/w/${data.id}`);
              },
            });
          })}
        >
          <FormCard
            title="New workspace"
            subtitle="Workspaces have separate access permissions and billing plans."
            footer={
              <button
                type="submit"
                className="py-2 px-4 xx-btn-primary inline-flex justify-center text-sm leading-4"
                disabled={loading}
              >
                Create
              </button>
            }
          >
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-2">
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
                </div>
                {formState.errors.name && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {formState.errors.name.message}
                  </p>
                )}
              </div>
            </div>

            {error && (
              <div>
                <Alert title="An error occurred">{error.message}</Alert>
              </div>
            )}
          </FormCard>
        </form>
      </div>
    </Layout>
  );
};

export default CreateWorkspace;
