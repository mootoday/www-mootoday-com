import { Request, Response } from "express";
import { publishMessage } from "../pubsub";

export default async (req: Request, res: Response): Promise<void> => {
  if (req.headers.authorization !== process.env.GHOST_WEBHOOK_AUTH) {
    res.status(401).send("Unauthorized");
    console.error(new Error(`Unauthorized. Authorization header is: ${req.headers.authorization}`));
    return;
  }
  await publishMessage(req.body);
  res.status(200).send("OK");
};
