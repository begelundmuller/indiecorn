import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";

import Layout from "@frontend/components/Layout";
import prisma from "@frontend/lib/prisma";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: { destination: "/auth/signin", permanent: false },
    };
  }

  const workspaces = await prisma.workspace.findMany({
    select: { id: true, name: true },
  });

  if (workspaces.length > 0) {
    return {
      redirect: { destination: `/w/${workspaces[0].id}`, permanent: false },
    };
  }

  return {
    redirect: { destination: `/w/create`, permanent: false },
  };
};

const Index: React.FC = (props) => {
  return (
    <Layout>
      <></>
    </Layout>
  );
};

export default Index;
