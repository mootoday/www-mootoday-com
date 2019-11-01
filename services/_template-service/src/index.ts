import { Request, Response } from "express";
import notSupported from "./processors/not-supported";
import post from "./processors/post";

const httpMethods: {
  [httpMethod: string]: (req: Request, res: Response) => Promise<void>;
} = {
  post,
};

const obtainProcessor = (
  httpMethod: string,
): ((req: Request, res: Response) => Promise<void>) =>
  httpMethods[httpMethod] ? httpMethods[httpMethod] : notSupported;

export const templateService = async (req: Request, res: Response) => {
  const processor = obtainProcessor(req.method.toLowerCase());
  try {
    res.setHeader("Content-Type", "application/json");
    await processor(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).send(JSON.stringify({ error: error.message }));
  }
};
