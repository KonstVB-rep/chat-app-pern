import { useEffect, useState } from "react";
import { ConversationType } from "../types";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [conversations, setConversations] = useState<ConversationType[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;
    const getConversations = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/messages/conversations", {
          method: "GET",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch conversations");
        }
        const data = await response.json();
        if (isActive) setConversations(data);
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

    getConversations();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, []);
  return { loading, conversations, setConversations };
};

export default useGetConversations;
