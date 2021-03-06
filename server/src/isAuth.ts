import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { UserContext } from "./userContext";

export const isAuth: MiddlewareFn<UserContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("Not Authenticated");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (err) {
    console.log("** Error **");
    console.log(err);
    throw new Error("Not Authenticated");
  }

  return next();
};
