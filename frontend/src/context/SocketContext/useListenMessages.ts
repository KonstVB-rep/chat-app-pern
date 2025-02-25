import { useEffect } from 'react'

import useSocketContext from './useSocketContext'
import useConversationStore from '@/entities/conversations/model/store/useConversation'


const useListenMessages = () => {
  const {socket} = useSocketContext()
  const {messages, setMessages, selectedConversation} = useConversationStore()

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
        newMessage.shouldShake = true;

        if(!selectedConversation) return
        const soundMessage = JSON.parse(localStorage.getItem(selectedConversation.id) || '');
        const sound = new Audio(soundMessage);
        sound.play();
        setMessages([...messages, newMessage]);
    });

    return () => {
        socket?.off("newMessage");
    };
}, [socket, messages, setMessages, selectedConversation]);
}

export default useListenMessages