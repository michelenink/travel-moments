import prismaClient from "@/prisma/index.js";

interface GetUserProps {
  user: {
    userId: string;
  };
}

class GetUserService {
  async execute({ user }: GetUserProps) {
    const isUser = await prismaClient.user.findFirst({
      where: { id: user.userId },
    });

    if (!isUser) {
      throw new Error("User not found");
    }

    return { user: isUser, message: "User found" };
  }
}

export default new GetUserService();
