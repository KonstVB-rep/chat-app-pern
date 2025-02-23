import { create } from "zustand";
import { ConversationType } from "../types";
import { MessageType } from "@/entities/messages/types";
// import { persist } from "zustand/middleware";

type ConversationStateType = {
    selectedConversation: ConversationType | null;
    setSelectedConversation: (conversation: ConversationType | null) => void;
    selectedMessages: MessageType[];
    setSelectedMessages: (selectedMessages: MessageType[]) => void;
}

const useConversationStore = create<ConversationStateType>((set) => {
  return {
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    selectedMessages: [],
    setSelectedMessages: (selectedMessages) => set({ selectedMessages }),
  };
});

export default useConversationStore;
