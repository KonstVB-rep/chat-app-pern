/* eslint-disable @typescript-eslint/no-unused-vars */
import useGetConversations from "@/entities/conversations/model/hooks/useGetConversations";
import { ConversationType } from "@/entities/conversations/model/types";
import Conversation from "@/entities/conversations/ui/Conversation";
import { Search } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [searchUser, setSearchUser] = useState<ConversationType[]>([]);
  const { conversations } = useGetConversations();

  const [value, setValue] = useState("");

  const handleClickSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value || !conversations) return;
    const finderConversations = conversations.filter((conversation) => {
      return conversation.fullName
        .toLowerCase()
        .includes(value.toLowerCase());
    });

    if (!finderConversations.length) {
      toast.error("User not found", {
        id: "conversation-not-found",
        duration: 3000,
        position: "top-center",
      });
      return;
    }
    setSearchUser(finderConversations);
  };

  const handleClickSelect = () => {
    setValue("");
    setSearchUser([]);
  };

  return (
    <form
      className="flex items-center relative"
      onSubmit={handleClickSearch}
    >
      <label className="w-full relative">
        <input
          type="text"
          placeholder="Search…"
          className="input input-bordered w-full"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="absolute top-full left-0 w-full z-10 rounded-b-lg overflow-hidden">
          {searchUser.length > 0 && (
            <div className="w-full bg-gray-200 flex flex-col gap-2 p-2">
              {searchUser.map((conversation) => (
                <div onClick={handleClickSelect}>
                  <Conversation
                    key={conversation.id}
                    conversation={conversation}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </label>
      <button
        type="submit"
        className="btn bg-sky-500 text-white"
      >
        <Search className="w-4 h-4 md:w-6 md:h-6 outline-none" />
      </button>
    </form>
  );
};
export default SearchInput;
