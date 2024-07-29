import { currentUser, redirectToSignIn } from "@clerk/nextjs";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) return redirectToSignIn();

  return user;
};
