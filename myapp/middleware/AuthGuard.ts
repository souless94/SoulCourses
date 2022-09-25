import { NextApiRequest, NextApiResponse } from "next";
import { createMiddlewareDecorator, NextFunction } from "next-api-decorators";
import supertokens from "supertokens-node";
import { superTokensNextWrapper } from "supertokens-node/nextjs";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { backendConfig } from "../config/backendConfig";

supertokens.init(backendConfig());

const SuperTokenGuard = createMiddlewareDecorator(
  async (req: any, res: any, next: NextFunction) => {
    await superTokensNextWrapper(
      async (next) => {
        return await verifySession()(req, res, next);
      },
      req,
      res
    );
    next();
  }
);

export default SuperTokenGuard;
