import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";
import fetchSendMessage from "../model/services/fetchSendMessage";
import SendMessageButton from "./SendMessageButton";
import useConversation from "@/entities/conversations/model/store/useConversation";

const MessageInput = () => {
  const { selectedConversation, selectedMessages, setSelectedMessages } =
    useConversation();

  const [state, formAction] = useActionState(fetchSendMessage, null);

  const onSubmit = (formData: FormData) => {
    const message = formData.get("message") as string;
    if (!selectedConversation || !message.trim()) return;

    formData.append("senderId", selectedConversation.id);
    formAction(formData);
  };

  useEffect(() => {
    if (state) {
      if (state.error) {
        toast.error(state.error, {
          id: "message-error",
          duration: 5000,
          position: "top-center",
          icon: "🚨",
        });
      } else {
        setSelectedMessages([...selectedMessages, state]);
      }
    }
  }, [state]);

  return (
    <form className="py-4" action={onSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          name="message"
          required
          minLength={1}
        />
        <SendMessageButton />
      </div>
    </form>
  );
};
export default MessageInput;
