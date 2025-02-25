import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversationStore from "@/entities/conversations/model/store/useConversation";

const useGetMessages = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const {messages, setMessages, selectedConversation} = useConversationStore()

  useEffect(() => {
    if (!selectedConversation) return; 
    const controller = new AbortController();
    let isActive = true;
    const getMessages = async () => {
      try {
        setLoading(true);
        setMessages([])
        const response = await fetch(`/api/messages/${selectedConversation.id}`, {
          method: "GET",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch conversations");
        }
    
        const data = await response.json();
        
        if (isActive) setMessages(data);
      } catch (error: unknown) {
        if (controller.signal.aborted) return;
        console.log((error as Error).message || error);

        toast.error("Failed to fetch conversations", {
          id: "conversations-error",
          duration: 5000,
          position: "top-center",
          icon: "🚨",
        });
      } finally {
        if (isActive) setLoading(false);
      }
    };

    getMessages();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [selectedConversation, setMessages]);


  return { loading, messages };
};

export default useGetMessages;
