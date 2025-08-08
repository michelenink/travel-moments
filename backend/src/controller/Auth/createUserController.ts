import createUserService from "@/service/auth/createUserService.js";
import type { FastifyReply, FastifyRequest } from "fastify";

class CreateUserController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { fullname, email, password } = req.body as {
      fullname: string;
      email: string;
      password: string;
    };

    if (!fullname || !email || !password) {
      return res.status(400).send({
        error: true,
        message: "All fields are required",
      });
    }

    try {
      const user = await createUserService.execute({
        fullname,
        email,
        password,
      });

      return res.status(200).send(user);
    } catch (error) {
      return res.status(400).send({
        error: true,
        message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  }
}

export default new CreateUserController();
