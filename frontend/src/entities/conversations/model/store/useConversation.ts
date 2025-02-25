import { create } from "zustand";
import { ConversationType } from "../types";
import { MessageType } from "@/entities/messages/types";
import { persist } from "zustand/middleware";

type ConversationStateType = {
    selectedConversation: ConversationType | null;
    setSelectedConversation: (conversation: ConversationType | null) => void;
    messages: MessageType[];
    setMessages: (messages: MessageType[]) => void;
}

const useConversationStore = create<ConversationStateType>()(persist(
  (set) => {
    return {
      selectedConversation: null,
      setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
      messages: [],
      setMessages: (messages) => set({ messages }),
    }
  }, { name: "conversation" }));

export default useConversationStore;
