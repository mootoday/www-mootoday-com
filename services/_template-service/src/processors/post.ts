import { Request, Response } from "express";

export default (req: Request, res: Response): Promise<void> => {
  return new Promise(resolve => {
    console.log(req.body);
    // TODO: Implement POST method processor
    resolve();
  });
};
