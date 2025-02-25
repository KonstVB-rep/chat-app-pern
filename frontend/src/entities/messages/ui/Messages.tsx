import MessageSkeleton from "@/shared/components/skeletons/MessageSkeleton";
import useGetMessages from "../model/hooks/useGetMessages";
import Message from "./Message";
import useListenMessages from "@/context/SocketContext/useListenMessages";
import {  RefObject } from "react";
import useScrollIntoNewMessage from "../model/hooks/useScrollIntoNewMessage";

const Messages = () => {
  const { loading, messages } = useGetMessages();
  useListenMessages()


  const ref = useScrollIntoNewMessage(messages) as unknown as RefObject<HTMLDivElement>;

  return (
    <div className="px-4 flex-1 overflow-auto bg-neutral-900 py-2" ref={ref}>
      {loading
        ? [...Array(3)].map((_, index) => <MessageSkeleton key={index} />)
        : messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
      {!loading && messages.length === 0 && (
        <p className="text-center text-white">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};
export default Messages;
