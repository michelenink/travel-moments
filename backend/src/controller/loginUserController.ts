import loginUserService from "@/service/loginUserService.js";
import type { FastifyReply, FastifyRequest } from "fastify";

class LoginUserController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    if (!email || !password) {
      return res.status(400).send({
        error: true,
        message: "All fields are required",
      });
    }

    try {
      const loginUser = await loginUserService.execute({
        email,
        password,
      });

      return res.status(200).send(loginUser);
    } catch (error) {
      return res.status(400).send({
        error: true,
        message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  }
}

export default new LoginUserController();
