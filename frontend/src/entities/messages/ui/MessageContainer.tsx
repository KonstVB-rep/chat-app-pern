import useConversation from "@/entities/conversations/model/store/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import NoChatSelected from "./NoChatSelected";
import { ChevronRight } from "lucide-react";
import CheckedSoundMessage from "@/entities/conversations/ui/CheckedSoundMessage";
import { useSearchParams } from "react-router";
import { useEffect } from "react";

type MessageContainerProps = {
  openSidebar: boolean;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const MessageContainer = ({
  openSidebar,
  setOpenSidebar,
}: MessageContainerProps) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("conversationId") === null)
      setSelectedConversation(null);
  }, [
    searchParams,
    setSelectedConversation,
  ]);

  const toggleSidebar = () => setOpenSidebar((prev) => !prev);
  return (
    <div className="w-full flex flex-col p-2">
      <>
        {!selectedConversation ? (
          <div className="grid grid-rows-[auto_1fr] flex-1">
            <div className="bg-slate-500 flex justify-between gap-2 px-4 py-2 h-14 rounded-t-lg">
              {!openSidebar && (
                <button
                  onClick={toggleSidebar}
                  title={openSidebar ? "Close sidebar" : "Open sidebar"}
                  aria-label={openSidebar ? "Close sidebar" : "Open sidebar"}
                  className="flex justify-center md:w-fit text-white cursor-pointer p-2 rounded-full touch:active:bg-[var(--primary-color)] touch:active:text-white hover:bg-[var(--primary-color)] focus-visible:bg-[var(--primary-color)] hover:text-white focus-visible:text-white"
                >
                  <ChevronRight />
                </button>
              )}
            </div>
            <NoChatSelected />
          </div>
        ) : (
          <div className="flex flex-col rounded-lg overflow-hidden flex-1 h-full">
            <div className="bg-slate-500 flex justify-between gap-2 px-4 py-2 h-14">
              {!openSidebar && (
                <button
                  onClick={toggleSidebar}
                  title={openSidebar ? "Close sidebar" : "Open sidebar"}
                  aria-label={openSidebar ? "Close sidebar" : "Open sidebar"}
                  className="flex justify-center md:w-fit text-white cursor-pointer p-2 rounded-full touch:active:bg-[var(--primary-color)] touch:active:text-white hover:bg-[var(--primary-color)] focus-visible:bg-[var(--primary-color)] hover:text-white focus-visible:text-white"
                >
                  <ChevronRight />
                </button>
              )}
              <div className="flex items-center gap-1">
                <span className="label-text">To:</span>
                <span className="text-gray-900 font-bold">
                  {selectedConversation.fullName}
                </span>
              </div>
              <CheckedSoundMessage id={selectedConversation.id} />
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
