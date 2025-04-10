import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserByEmail = async ({ email }: { email: string }) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return null;
  }
  console.log(user);
  return user;
};

export const checkuseraccountexist = async ({ userId }: { userId: string }) => {
  const account = await prisma.account.findFirst({
    where: { userId },
  });
  if (!account) {
    return null;
  }
  console.log(account);
  return account;
};
