import { useState, useEffect } from "react";

const WSS_URL = "ws://localhost:8080";

const useSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WSS_URL);
    ws.onopen = () => {
      console.log("Connected to the server");
      setSocket(ws);
    };

    ws.onclose = () => {
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, []);
  return socket;
};

export default useSocket;
