import React from 'react';
import ChatList from '../../components/chat/chatList';

const vendors = [
  { id: '1', name: 'Fresh Harvest Farms' },
  { id: '2', name: 'The Organic Patch' },
  { id: '3', name: 'Green Valley Produce' },
  // ... more data
];

export default function BuyerChatScreen() {
  return (
    <ChatList 
      title="Select vendor to contact" 
      searchPlaceholder="Search for the vendors"
      data={vendors}
      role="buyer"
    />
  );
}