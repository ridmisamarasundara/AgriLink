import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type ChatListItemProps = {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  time?: string;
  unreadCount?: number;
  mode: 'directory' | 'history'; // 'directory' = Buyer view, 'history' = Vendor view
  onPress: () => void;
};

export default function ChatListItem({
  name,
  avatar,
  lastMessage,
  time,
  unreadCount,
  mode,
  onPress
}: ChatListItemProps) {
  
  // RENDER: Directory Mode (Simple list for Buyers)
  if (mode === 'directory') {
    return (
      <View style={styles.directoryItem}>
        <Text style={styles.directoryName}>{name}</Text>
        <TouchableOpacity style={styles.chatBtn} onPress={onPress}>
          <Ionicons name="chatbubble-ellipses-outline" size={18} color="#000" />
          <Text style={styles.chatBtnText}>Chat</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // RENDER: History Mode (Detailed list for Vendors)
  return (
    <TouchableOpacity style={styles.historyItem} onPress={onPress}>
      <View style={styles.avatarContainer}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.placeholderAvatar}>
             <Ionicons name="person-outline" size={24} color="#000" />
          </View>
        )}
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.topRow}>
          <Text style={styles.historyName}>{name}</Text>
          <Text style={styles.timeText}>{time}</Text>
        </View>
        
        <View style={styles.bottomRow}>
          <Text style={styles.messageText} numberOfLines={1}>
            {lastMessage}
          </Text>
          {unreadCount && unreadCount > 0 ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Directory Styles (Buyer)
  directoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 0, // No separators in your design
  },
  directoryName: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  chatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6EE7B7', // Bright green button
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 5,
  },
  chatBtnText: {
    fontSize: 14,
    fontWeight: '500',
  },

  // History Styles (Vendor)
  historyItem: {
    flexDirection: 'row',
    backgroundColor: '#C8E6C9', // Light green card background
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  placeholderAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8FAEF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  contentContainer: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  timeText: {
    fontSize: 12,
    color: '#555',
  },
  messageText: {
    fontSize: 14,
    color: '#444',
    flex: 1, 
    marginRight: 10,
  },
  badge: {
    backgroundColor: 'green',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});