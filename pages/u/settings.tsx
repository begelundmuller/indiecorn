import { UserCircleIcon } from "@heroicons/react/outline";
import { User } from "@prisma/client";
import clsx from "clsx";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
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
  user: User;
};

type Inputs = {
  name: string;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    return { redirect: { destination: "/auth/signin", permanent: false } };
  }

  const user = await prisma.user.findFirst({
    where: {
      id: session.user?.id || "",
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  });

  return {
    props: { user },
  };
};

const UpdateUser: React.FC<Props> = ({ user }) => {
  const { register, handleSubmit, formState } = useForm<Inputs>({ defaultValues: user });
  const [updateUser, { loading: updateLoading, error: updateError }] = useMutation<Inputs, User>(
    "PATCH",
    "/api/users/me"
  );
  const [deleteUser, { loading: deleteLoading, error: deleteError }] = useMutation<Inputs, User>(
    "DELETE",
    "/api/users/me"
  );

  const [avatarNotImplementedOpen, setAvatarNotImplementedOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto lg:grid lg:grid-cols-12 lg:gap-x-5">
        <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
          <Navigation items={[{ name: "General", href: "/u/settings", icon: UserCircleIcon }]} />
        </aside>
        <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
          <form
            onSubmit={handleSubmit(async (input) => {
              updateUser({ body: input });
            })}
          >
            <FormCard
              title="Profile"
              subtitle="This information will be visible to others."
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
                        maxLength: { value: 128, message: "Too long (max length is 128)" },
                      })}
                      type="text"
                      placeholder="Hermione Granger"
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
                      <Avatar name={user.name} image={user.image} />
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

          <FormCard title="Account" subtitle="Only you can access this information.">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    placeholder="hermione@example.org"
                    className={clsx("xx-input-text block w-full sm:text-sm")}
                    value={user.email}
                    disabled
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">Contact support to change your email</p>
              </div>
            </div>
          </FormCard>

          <FormCard
            title="Delete account"
            subtitle="Warning: This action is irrevocable. We will immediately delete all your data."
            footer={
              <button
                type="submit"
                className="py-2 px-4 xx-btn-danger inline-flex justify-center text-sm leading-4"
                disabled={deleteLoading}
                onClick={() => setConfirmDeleteOpen(true)}
              >
                Delete account
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
              title="Confirm account deletion"
              description="Are you sure you want to delete your account and all your data?"
              dismissLabel="Cancel"
              onDismiss={() => setConfirmDeleteOpen(false)}
              actionLabel="Delete account"
              onAction={async () => {
                setConfirmDeleteOpen(false);
                deleteUser({
                  onSuccess: async (data) => {
                    // The current session has been deleted along with the user.
                    // Using signOut() from next-auth throws an error on the backend, but
                    // this refresh tidies up the dead session without throwing an error.
                    document.location = "/";
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

export default UpdateUser;
