import { useCallback, useState } from "react";
import Socket from './socket';

export interface RoomState {
  connect: (
    url: string,
    apiKey: string,
  ) => Promise<undefined>;

  isConnecting: boolean;

  error?: Error;
}

export function useRoom(): RoomState {
  const [isConnecting, setIsConnecting] = useState(false);
  const [_, setSocket] = useState<Socket | undefined>(undefined);
  const [error, setError] = useState<Error>();

  const connectFn = useCallback(
    async (roomId: string, apiKey: string) => {
      setIsConnecting(true);
      try {
        const socket = new Socket(apiKey, roomId);
        await socket.connect();
        setSocket(socket);
      } catch (error) {
        setIsConnecting(false);
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error("an error has occured"));
        }
        return undefined;
      }
    },[]
  )

  return {
    connect: connectFn,
    isConnecting,
    error,
  }
}