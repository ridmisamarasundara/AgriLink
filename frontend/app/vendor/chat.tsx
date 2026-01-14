import React from 'react';
import ChatList from '../../components/chat/chatList';

const chats = [
  { 
    id: '1', 
    name: 'John Doe', 
    lastMessage: 'Yes, the tomatoes are organic...', 
    time: '2h ago',
    unreadCount: 0 
  },
  { 
    id: '2', 
    name: 'Ann Evens', 
    lastMessage: 'We will have more strawberries...', 
    time: '1h ago', 
    unreadCount: 2 
  },
  // ... more data
];

export default function VendorChatScreen() {
  return (
    <ChatList 
      title="Chat History" 
      searchPlaceholder="Search by buyers name"
      data={chats}
      role="vendor"
    />
  );
}