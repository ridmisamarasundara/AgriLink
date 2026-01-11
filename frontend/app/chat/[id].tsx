import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import ChatScreen from '../../components/chat/chatScreen';

export default function ChatPage() {
  // 1. Get the parameters passed from the previous screen
  const { id, name, avatar } = useLocalSearchParams();

  // 2. Render your common ChatScreen component
  // We cast 'name' to string because search params can be arrays
  return (
    <ChatScreen
      recipientName={name as string}
      recipientAvatar={avatar as string}
    />
  );
}