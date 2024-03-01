import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

const useSocket = (serverUrl: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(serverUrl);
    setSocket(newSocket);
    console.log("Socket conectado:", newSocket.id);

    return () => {
      newSocket.disconnect();
      console.log("Socket desconectado:", newSocket.id);
    };
  }, [serverUrl]);

  return { socket };
};

export default useSocket;
