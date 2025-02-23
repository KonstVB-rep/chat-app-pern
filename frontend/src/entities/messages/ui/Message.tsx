import { useState } from "react";
import { MessageType } from "../types";
import useAuthContext from "@/hooks/useAuthContext";
import useConversation from "@/entities/conversations/model/store/useConversation";

const Message = ({ message }: { message?: MessageType }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };
  const fromMe = message?.senderId === authUser?.id;
  const img = fromMe
    ? authUser?.profileImage
    : selectedConversation?.profileImage;
  const chatClass = fromMe ? "chat-end" : "chat-start";

  const bubbleBg = fromMe ? "bg-blue-500" : "";
  // const shakeClass = message.shouldShake ? "shake" : "";


  return (
    <div className={`chat ${chatClass}`}>
      <div className="hidden md:block chat-image avatar">
        <div className="w-6 md:w-10 rounded-full">
          {!isImageLoaded && (
            <p className="w-8 md:w-12 h-8 md:h-12 rounded-full bg-gray-400 animate-pulse" />
          )}

          {img && (
            <img
              src={img}
              alt="Chat bubble component"
              onLoad={handleImageLoad}
              className={isImageLoaded ? "block" : "hidden"}
            />
          )}
        </div>
      </div>
      <p className={`chat-bubble text-white ${bubbleBg} text-sm md:text-md`}>
        {message?.body}
      </p>
      <span className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white">
        {new Date(message?.createdAt as string).toLocaleString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </span>
    </div>
  );
};
export default Message;
