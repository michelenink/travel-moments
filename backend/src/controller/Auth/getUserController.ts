import getUserService from "@/service/auth/getUserService.js";
import { FastifyReply, FastifyRequest } from "fastify";

class GetUserController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { user } = req;
    if (!user) {
      return res.status(400).send({ error: true, message: "User not found" });
    }

    try {
      const userService = await getUserService.execute({ user });

      return res.status(200).send(userService);
    } catch (error) {
      return res.status(400).send({ error: true, message: "Error" });
    }
  }
}

export default new GetUserController();
