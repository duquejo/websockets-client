
import { useState, useRef, useEffect } from 'react';

export const useChatClient = ({ onMessageEvent = Function() }) => {

  const websocket = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = () => {
    if (!websocket.current || websocket.current.readyState === WebSocket.CLOSED) {
      websocket.current = new WebSocket('ws://127.0.0.1:8080/game?Authorization=MANDATORY', [
        'x-chat-transaction-id',
        'Authorization',
      ]);

      websocket.current.onopen = () => {
        console.log('WebSocket connection opened');
        setIsConnected(true);
      };

      websocket.current.onclose = (e) => {
        console.log('WebSocket connection closed - Reconnect will be attempted in 1 second.', e.reason);
        setIsConnected(false);
        setTimeout(() => connect(), 1000);
      };

      websocket.current.onmessage = (msg) => {
        console.log('Websocket client message');
        onMessageEvent(msg);
      };

      websocket.current.onerror = (err) => {
        console.error('Websocket encountered error:', err.message);
        disconnect();
      }
    }
  }

  const disconnect = () => {
    if (websocket.current) {
      websocket.current.close();
    }
  };

  const sendMessage = (message) => {
    if (websocket.current) {
      websocket.current.send(message);
    }
  }


  useEffect(() => {
    return () => disconnect();
  }, []);

  return {
    isConnected,
    connect,
    disconnect,
    sendMessage,
  };
};
