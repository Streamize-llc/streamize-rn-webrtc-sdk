import React, { useEffect } from "react";
import { View, Text } from 'react-native';
import { useRoom } from './useRoom';

export interface RoomProps {
  roomId: string;
  apiKey: string;
  onConnected?: () => void;
  onLeave?: () => void;
}

export const RTCRoom = ({
  roomId,
  apiKey,
  onConnected,
  onLeave,
}: RoomProps) => {
  const roomState = useRoom();

  useEffect(() => {
    roomState.connect(roomId, apiKey);

  }, [])
  
  return (
    <View>
      <Text>RTCRoom</Text>
    </View>
  );
};