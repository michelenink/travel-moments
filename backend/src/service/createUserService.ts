import prismaClient from "@/prisma/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface UserProps {
  fullname: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ fullname, email, password }: UserProps) {
    const isUser = await prismaClient.user.findFirst({
      where: { email: email },
    });

    if (isUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prismaClient.user.create({
      data: { fullname, email, password: hashedPassword },
    });

    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: "72h",
      }
    );

    return {
      error: false,
      user: {
        fullname,
        email,
        accessToken,
      },
    };
  }
}

export default new CreateUserService();
