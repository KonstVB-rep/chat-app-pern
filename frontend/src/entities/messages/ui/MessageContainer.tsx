import useConversation from "@/entities/conversations/model/store/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import NoChatSelected from "./NoChatSelected";

const MessageContainer = () => {
  const { selectedConversation } = useConversation();
  return (
    <div className="w-full flex flex-col p-2">
      <>
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <div className="flex flex-col rounded-lg overflow-hidden flex-1 h-full">
            <div className="bg-slate-500 flex justify-center gap-2 px-4 py-2">
              <span className="label-text">To:</span>
              <span className="text-gray-900 font-bold">
                {selectedConversation.fullName}
              </span>
            </div>
            <Messages />
          </div>
        )}

        <MessageInput />
      </>
    </div>
  );
};
export default MessageContainer;
