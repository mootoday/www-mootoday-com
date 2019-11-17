import { Request, Response } from "express";

export default (req: Request, res: Response): Promise<void> => {
  return new Promise(resolve => {
    console.error(new Error(`The request has an unexpected http method: ${req.method}`));
    res.status(405).send("Method Not Allowed");
    resolve();
  });
};
