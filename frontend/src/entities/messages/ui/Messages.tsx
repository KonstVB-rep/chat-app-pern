import MessageSkeleton from "@/shared/components/skeletons/MessageSkeleton";
import useGetMessages from "../model/hooks/useGetMessages";
import Message from "./Message";

const Messages = () => {
  const {loading, selectedMessages } = useGetMessages();

  return (
    <div className="px-4 flex-1 overflow-auto bg-neutral-900 py-2">
      {loading ? [...Array(3)].map((_, index) => <MessageSkeleton key={index} />) : selectedMessages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      {!loading && selectedMessages.length === 0 && (
				<p className='text-center text-white'>Send a message to start the conversation</p>
			)}
    </div>
  );
};
export default Messages;
