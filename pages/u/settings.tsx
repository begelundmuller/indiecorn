import { User } from "@prisma/client";
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
    },
  });

  return {
    props: { user },
  };
};

const UpdateUser: React.FC<Props> = ({ user }) => {
  const { register, handleSubmit, formState } = useForm<Inputs>({ defaultValues: user });
  const [updateUser, { loading, error }] = useMutation<Inputs, User>("PATCH", "/api/users/me");

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4">
        <form
          className="space-y-8 divide-y divide-gray-200 dark:divide-gray-700"
          onSubmit={handleSubmit(async (input) => {
            updateUser({ body: input });
          })}
        >
          <div>
            <h3 className="text-lg leading-6 font-medium">Settings</h3>
          </div>

          <div className="pt-5 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            {/* Displays email, but doesn't allow the user to edit it */}
            <div className="sm:col-span-4">
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
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Contact support to change your email
              </p>
            </div>
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
                    maxLength: { value: 128, message: "Too long (max length is 128)" },
                  })}
                  type="text"
                  placeholder="Hermione Granger"
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

export default UpdateUser;
