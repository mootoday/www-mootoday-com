import { Request, Response } from "express";
import { publishMessage } from '../pubsub';

export default (req: Request, res: Response): Promise<void> => {
  return new Promise(resolve => {
    if (req.headers.authorization !== process.env.GHOST_WEBHOOK_AUTH) {
      res.status(401).send("Unauthorized");
      resolve();
      return;
    }
    // console.log(req.headers);
    // console.log(req.body);

    publishMessage(req.body);

    res.status(200).send("OK");
    resolve();
  });
};
