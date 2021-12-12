import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { ExpressContext } from "apollo-server-express";

interface ContextWithPayload extends ExpressContext {
  payload?: any;
}

export const isAuth: MiddlewareFn<ContextWithPayload> = ({ context }, next) => {
  const SECRET_KEY = process.env.SECRET_KEY || "";
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("Not authenticated");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, SECRET_KEY);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw new Error("Not authenticated");
  }
  return next();
};
