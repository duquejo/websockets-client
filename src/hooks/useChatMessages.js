import { useState, useEffect } from 'react';
import { useChatClient } from './useWebSocketClient';

export const USER_CHAT_ROLE = {
  RECEIVER: 'receiver',
  SENDER: 'sender',
};

export const useChatMessages = (userId, initialInputValue = '', initialMessages = []) => {

  const [input, setInput] = useState(initialInputValue);
  const [messages, setMessages] = useState(initialMessages);

  const handleSendMessage = (payload, role = USER_CHAT_ROLE.SENDER) => {
    if (role === USER_CHAT_ROLE.SENDER) setInput('');
    setMessages((messages) => [
      ...messages,
      {
        id: `${payload.user}-${Date.now()}`,
        name: payload.user,
        content: payload.message,
        role,
      },
    ]);
  };

  const sendChatMessage = (message) => {
    const payload = { user: userId, message };
    handleSendMessage(payload);
    sendMessage(JSON.stringify({ event: 'chats', data: payload }));
  };

  const { connect, sendMessage } = useChatClient({
    onMessageEvent: (message) => handleSendMessage(JSON.parse(message.data), USER_CHAT_ROLE.RECEIVER),
  });

  useEffect(() => {
    connect();
  }, []);

  return {
    input,
    setInput,
    messages,
    sendChatMessage
  };
};