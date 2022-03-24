import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { getSession } from 'next-auth/react'

// GET, POST /api/workspaces
// Required fields in body: name
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).send({ error: "Unauthorized" });
    }

    const { name } = req.body;
    if (req.method === "GET") {
        const result = await prisma.workspace.findMany();
        res.json(result);
    } else if (req.method === "POST") {
        const result = await prisma.workspace.create({
            data: {
                name,
            },
        });
        res.json(result);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        );
    }
}
