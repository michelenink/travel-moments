import prismaClient from "@/prisma/index.js";
import { AuthUtils } from "@/utils/authUtils.js";
import bcrypt from "bcrypt";

interface LoginUserProps {
  email: string;
  password: string;
}

class LoginUserService {
  async execute({ email, password }: LoginUserProps) {
    const user = await prismaClient.user.findFirst({
      where: { email: email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const accessToken = AuthUtils.generateAccessToken(user.id);

    return {
      error: false,
      user: {
        fullname: user.fullname,
        email: user.email,
        message: "Login successful",
        accessToken,
      },
    };
  }
}

export default new LoginUserService();
