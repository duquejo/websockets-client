import { useRef, useEffect } from 'react';
import { ChatBubble } from '../chat-bubble/ChatBubble';
import { useChatMessages } from '../../hooks/useChatMessages';

export const ENTER_KEY_CODE = 'Enter';
const userId = Date.now().toString();

export const Chat = () => {
  const bottomRef = useRef();
  const inputRef = useRef();

  const { input, setInput, messages, sendChatMessage } = useChatMessages(userId);

  useEffect(() => {
    if (messages.length > 0) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      inputRef.current.focus();
    }
  }, [messages]);

  const handleOnKeyPress = (e, input) => {
    if (e.code === ENTER_KEY_CODE) {
      sendChatMessage(input);
    }
  };

  return (
    <>
      {/* Chat */}
      <article className="overflow-y-scroll ring-emerald-800 ring-1 rounded bg-emerald-800/10">
        <div
          id="broadcast"
          className="mx-4 px-2 my-4 py-2 ring-yellow-400 ring-1 text-sm rounded leading-none bg-yellow-50 text-yellow-600"
        >
          <b>Pro tip:</b> Share resources and upgrade out community
        </div>
        <div id="messages" className="flex flex-col text-emerald-300/50 gap-2">
          {messages.length > 0 && messages.map(({ id, ...args }, i) => <ChatBubble key={id} {...args} />)}
        </div>
        <div ref={bottomRef} />
      </article>
      {/* Buttons */}
      <div className="flex justify-between gap-2">
        <input
          ref={inputRef}
          className="grow rounded px-4 ring-emerald-900 outline-emerald-700 ring-1 text-emerald-900 placeholder:text-emerald-900"
          type="text"
          placeholder="Message here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => handleOnKeyPress(e, input)}
        />
        <button
          className="bg-emerald-800 px-4 py-3 rounded shadow-md hover:bg-emerald-700 transition-colors font-semibold text-white"
          onClick={() => sendChatMessage(input)}
        >
          Send message
        </button>
      </div>
    </>
  );
};
