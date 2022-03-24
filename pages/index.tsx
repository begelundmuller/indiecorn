import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";
import { getSession } from "next-auth/react";

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
      redirect: { destination: `/workspaces/${workspaces[0].id}`, permanent: false },
    };
  }

  return {
    redirect: { destination: `/workspaces/create`, permanent: false },
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
