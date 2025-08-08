import createUserController from "@/controller/Auth/createUserController.js";
import getUserController from "@/controller/Auth/getUserController.js";
import loginUserController from "@/controller/Auth/loginUserController.js";
import { authenticateToken } from "@/middleware/authenticateToken.js";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export function routes(fastify: FastifyInstance) {
  fastify.post(
    "/create-account",
    async (req: FastifyRequest, res: FastifyReply) => {
      return createUserController.handle(req, res);
    }
  );

  fastify.post("/login", async (req: FastifyRequest, res: FastifyReply) => {
    return loginUserController.handle(req, res);
  });

  fastify.get(
    "/get-user",
    { preHandler: authenticateToken },
    async (req: FastifyRequest, res: FastifyReply) => {
      return getUserController.handle(req, res);
    }
  );
}
