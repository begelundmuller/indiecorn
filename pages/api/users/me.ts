import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prisma from "lib/prisma";

// PATCH /api/workspaces
// Required fields in body: name
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session.user) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  if (req.method === "PATCH") {
    const { name } = req.body;
    const result = await prisma.user.update({
      data: {
        name,
      },
      where: {
        id: session.user.id,
      },
    });
    res.json(result);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
