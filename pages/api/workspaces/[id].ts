import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prisma from "lib/prisma";

// GET, PATCH /api/workspaces/[id]
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  const workspaceId = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;

  if (req.method === "PATCH") {
    const { name } = req.body;
    const result = await prisma.workspace.update({
      data: {
        name,
      },
      where: {
        id: workspaceId,
      },
    });
    res.json(result);
  } else if (req.method === "DELETE") {
    await prisma.workspace.delete({
      where: {
        id: workspaceId,
      },
    });
    res.send({});
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
