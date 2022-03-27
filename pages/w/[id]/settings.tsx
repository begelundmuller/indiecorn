import { User, Workspace } from "@prisma/client";
import clsx from "clsx";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";

import Alert from "components/Alert";
import Layout from "components/Layout";
import prisma from "lib/prisma";
import useMutation from "lib/useMutation";

type Props = {
  workspace: Workspace;
};

type Inputs = {
  name: string;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
  const session = await getSession({ req });
  if (!session) {
    return { redirect: { destination: "/auth/signin", permanent: false } };
  }

  const workspaceId = Array.isArray(params.id) ? params.id[0] : params.id;

  const workspace = await prisma.workspace.findFirst({
    where: {
      id: workspaceId,
    },
    select: {
      id: true,
      name: true,
    },
  });

  return {
    props: { workspace },
  };
};

const UpdateWorkspace: React.FC<Props> = ({ workspace }) => {
  const { register, handleSubmit, formState } = useForm<Inputs>({ defaultValues: workspace });
  const [updateWorkspace, { loading, error }] = useMutation<Inputs, User>(
    "PATCH",
    `/api/workspaces/${workspace.id}`
  );

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4">
        <form
          className="space-y-8 divide-y divide-gray-200 dark:divide-gray-700"
          onSubmit={handleSubmit(async (input) => {
            updateWorkspace({ body: input });
          })}
        >
          <div>
            <h3 className="text-lg leading-6 font-medium">Workspace settings</h3>
          </div>

          <div className="pt-5 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  {...register("name", {
                    required: { value: true, message: "Required" },
                    maxLength: { value: 64, message: "Too long (max length is 64)" },
                  })}
                  type="text"
                  placeholder="Foo Corp"
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
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default UpdateWorkspace;
