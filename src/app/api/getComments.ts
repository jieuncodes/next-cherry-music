import client from "@/libs/server/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await client.comment.findMany();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json(error);
  }
}
