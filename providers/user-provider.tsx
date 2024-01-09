"use client";

import { MyUserContextProvider } from "@/hooks/use-user";
import { FC } from "react";

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider: FC<UserProviderProps> = ({ children }) => {
  return <MyUserContextProvider>{children}</MyUserContextProvider>;
};

export default UserProvider;
