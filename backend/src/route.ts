import createUserController from "@/controller/createUserController.js";
import loginUserController from "@/controller/loginUserController.js";
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
}
