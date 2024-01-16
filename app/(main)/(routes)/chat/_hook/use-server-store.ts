import { create } from "zustand";
import { ServerWithMembersWithProfiles } from "../_types";

interface ServerStoreState {
  currentServer: ServerWithMembersWithProfiles | null;
  servers: ServerWithMembersWithProfiles[];
  setServers: (servers: ServerWithMembersWithProfiles[]) => void;
  setCurrentServer: (server?: ServerWithMembersWithProfiles) => void;
}

export const useServerStore = create<ServerStoreState>((set) => ({
  currentServer: null,
  servers: [],
  setServers: (servers) => set({ servers }),
  setCurrentServer: (server) => set({ currentServer: server }),
}));
