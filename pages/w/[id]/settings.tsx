import { HomeIcon } from "@heroicons/react/outline";
import { Workspace } from "@prisma/client";
import clsx from "clsx";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Router from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Alert from "components/Alert";
import Avatar from "components/Avatar";
import FormCard from "components/FormCard";
import Layout from "components/Layout";
import Modal from "components/Modal";
import Navigation from "components/settings/Navigation";
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
      image: true,
    },
  });

  return {
    props: { workspace },
  };
};

const UpdateWorkspace: React.FC<Props> = ({ workspace }) => {
  const { register, handleSubmit, formState } = useForm<Inputs>({ defaultValues: workspace });
  const [updateWorkspace, { loading: updateLoading, error: updateError }] = useMutation<
    Inputs,
    Workspace
  >("PATCH", `/api/workspaces/${workspace.id}`);
  const [deleteWorkspace, { loading: deleteLoading, error: deleteError }] = useMutation<
    Inputs,
    Workspace
  >("DELETE", `/api/workspaces/${workspace.id}`);

  const [avatarNotImplementedOpen, setAvatarNotImplementedOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto lg:grid lg:grid-cols-12 lg:gap-x-5">
        <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
          <Navigation
            items={[
              {
                name: "General",
                href: "/w/[id]/settings",
                as: `/w/${workspace.id}/settings`,
                icon: HomeIcon,
              },
            ]}
          />
        </aside>
        <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
          <form
            onSubmit={handleSubmit(async (input) => {
              updateWorkspace({
                body: input,
                onSuccess: async () => {
                  await Router.replace(Router.asPath);
                },
              });
            })}
          >
            <FormCard
              title="Workspace profile"
              footer={
                <button
                  type="submit"
                  className="py-2 px-4 xx-btn-primary inline-flex justify-center text-sm leading-4"
                  disabled={updateLoading}
                >
                  Save
                </button>
              }
            >
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-2">
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
                  </div>
                  {formState.errors.name && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      {formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div className="col-span-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Avatar
                  </label>
                  <div className="mt-1 flex items-center">
                    <span className="inline-block bg-gray-100 rounded-full overflow-hidden h-12 w-12">
                      <Avatar name={workspace.name} image={workspace.image} />
                    </span>
                    <button
                      type="button"
                      className="ml-5 py-2 px-3 xx-btn-secondary text-sm leading-4"
                      onClick={() => setAvatarNotImplementedOpen(true)}
                    >
                      Change
                    </button>
                    <Modal
                      open={avatarNotImplementedOpen}
                      type="danger"
                      title="Not implemented"
                      description="Avatar upload has not yet been implemented"
                      dismissLabel="Dismiss"
                      onDismiss={() => setAvatarNotImplementedOpen(false)}
                    />
                  </div>
                </div>
              </div>

              {updateError && (
                <div>
                  <Alert title="An error occurred">{updateError.message}</Alert>
                </div>
              )}
            </FormCard>
          </form>

          <FormCard
            title="Delete workspace"
            subtitle="Warning: We will immediately delete all workspace data. This action is irrevocable."
            footer={
              <button
                type="submit"
                className="py-2 px-4 xx-btn-danger inline-flex justify-center text-sm leading-4"
                disabled={deleteLoading}
                onClick={() => setConfirmDeleteOpen(true)}
              >
                Delete workspace
              </button>
            }
          >
            {deleteError && (
              <div>
                <Alert title="An error occurred">{deleteError.message}</Alert>
              </div>
            )}
            <Modal
              open={confirmDeleteOpen}
              type="danger"
              title="Confirm workspace deletion"
              description="Are you sure you want to delete this workspace and all its data?"
              dismissLabel="Cancel"
              onDismiss={() => setConfirmDeleteOpen(false)}
              actionLabel="Delete workspace"
              onAction={async () => {
                setConfirmDeleteOpen(false);
                deleteWorkspace({
                  onSuccess: async (data) => {
                    Router.replace("/");
                  },
                });
              }}
            />
          </FormCard>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateWorkspace;
