import Conversation from "./Conversation";
import useGetConversations from "../model/hooks/useGetConversations";
import { ConversationType } from "../model/types";
import useConversationStore from "../model/store/useConversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  const { selectedConversation } = useConversationStore();

  const sortConversation = [...conversations].sort((a, b) => {
    if (a.id === selectedConversation?.id) return -1;
    if (b.id === selectedConversation?.id) return 1;
    return 0;
  })

  if(loading) return <span className="loading loading-spinner mx-auto"/>

  return (
    <div className="py-2 flex flex-col gap-2 flex-1 overflow-y-auto">
      {sortConversation.map((conversation: ConversationType) => (
        <Conversation key={conversation.id} conversation={conversation} />
      ))}
    </div>
  );
};
export default Conversations;
