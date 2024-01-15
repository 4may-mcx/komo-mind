import { create } from "zustand";
import { Server } from "@prisma/client";

interface ServerStoreState {
  currentServer: Server | null;
  servers: Server[];
  setServers: (servers: Server[]) => void;
  setCurrentServer: (server?: Server) => void;
}

export const useServerStore = create<ServerStoreState>((set) => ({
  currentServer: null,
  servers: [],
  setServers: (servers) => set({ servers }),
  setCurrentServer: (server) => set({ currentServer: server }),
}));
