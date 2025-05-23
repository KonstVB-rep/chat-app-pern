import { useCallback, useEffect, useState } from "react";
import { ConversationType } from "../model/types";
import useConversation from "../model/store/useConversation";
import { useSearchParams } from "react-router-dom";
import useSocketContext from "@/context/SocketContext/useSocketContext";

const Conversation = ({ conversation }: { conversation: ConversationType }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const { setSelectedConversation, selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const isSelected = selectedConversation?.id === conversation.id;
  const isOnline = onlineUsers.includes(conversation.id);

  const handleSelectConversation = useCallback(() => {
    setSelectedConversation(conversation);
    setSearchParams({ conversationId: conversation.id });
  }, [setSelectedConversation, conversation, setSearchParams]);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  useEffect(() => {
    const currentConversationId = searchParams.get("conversationId");

    if (currentConversationId === conversation.id) {
      setSelectedConversation(conversation);
    }
  }, [
    conversation,
    handleSelectConversation,
    searchParams,
    setSelectedConversation,
  ]);

  return (
    <>
      <div
        className={`group flex gap-2 items-center p-2 py-1 cursor-pointer relative 
        ${
          isOnline
            ? "after:content-[''] after:absolute after:right-2 after:-top-1 after:bg-sky-500 after:h-[10px] after:w-[10px] after:rounded-full after:outline after:outline-white"
            : ""
        }
          before:content-[""] before:absolute before:inset-0 before:bg-emerald-600 before:opacity-0 before:transition-opacity touch:active:before:opacity-10 hover:before:opacity-10  ${
            isSelected ? "border-r-2 border-emerald-600" : ""
          }`}
        tabIndex={0}
        role="button"
        aria-label={`Open chat with ${conversation.fullName}`}
        onClick={handleSelectConversation}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div
            className={`w-8 md:w-12 rounded-full group-hover:outline-4 group-focus-visible:outline-4 ${
              isSelected
                ? "outline-4 outline-emerald-600 scale-110"
                : "outline-sky-500"
            }`}
          >
            {!isImageLoaded && (
              <p className="w-8 md:w-12 h-8 md:h-12 rounded-full bg-gray-950 animate-pulse" />
            )}

            {conversation.profileImage && (
              <img
                src={conversation.profileImage}
                alt={`${conversation.fullName} profile image`}
                onLoad={handleImageLoad}
                className="group-hover:scale-110 group-focus-visible:scale-110 transition-transform duration-200"
              />
            )}
          </div>
        </div>

        <div className="flex justify-center flex-1">
          <p
            className={`font-bold text-gray-800 group-hover:text-sky-700 group-focus-visible:text-sky-700 text-sm md:text-md transition-all duration-200`}
          >
            {conversation.fullName}
          </p>
        </div>
        {/* <CheckedSoundMessage id={conversation.id} /> */}
      </div>

      <div className="divider my-0 py-0 h-1 " />
    </>
  );
};
export default Conversation;
