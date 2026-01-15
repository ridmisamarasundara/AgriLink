import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Mock data to visualize the UI
const MOCK_MESSAGES = [
  { id: '1', text: 'Hi! Is the organic tomato still available?', sender: 'me', time: '10:00 AM' },
  { id: '2', text: 'Yes, we have about 50kg left in stock.', sender: 'other', time: '10:05 AM' },
  { id: '3', text: 'Great! Can I order 10kg?', sender: 'me', time: '10:06 AM' },
  { id: '4', text: 'Absolutely. Do you need delivery?', sender: 'other', time: '10:07 AM' },
  { id: '5', text: 'No, I will pick it up myself.', sender: 'me', time: '10:08 AM' },
];

type ChatScreenProps = {
  recipientName: string;
  recipientAvatar?: string;
};

export default function ChatScreen({ recipientName, recipientAvatar }: ChatScreenProps) {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(MOCK_MESSAGES);

  const handleSend = () => {
    if (message.trim().length === 0) return;

    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Add new message to the TOP of the list (since we reverse the list)
    setMessages([newMessage, ...messages]);
    setMessage('');
  };

  const renderMessageItem = ({ item }: { item: typeof MOCK_MESSAGES[0] }) => {
    const isMe = item.sender === 'me';
    return (
      <View style={[
        styles.messageContainer, 
        isMe ? styles.myMessageContainer : styles.theirMessageContainer
      ]}>
        <View style={[
          styles.bubble, 
          isMe ? styles.myBubble : styles.theirBubble
        ]}>
          <Text style={[
            styles.messageText, 
            isMe ? styles.myMessageText : styles.theirMessageText
          ]}>
            {item.text}
          </Text>
          <Text style={[
            styles.timeText,
            isMe ? styles.myTimeText : styles.theirTimeText
          ]}>
            {item.time}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* 1. Header Part */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          
          <Image 
            source={{ uri: recipientAvatar || 'https://i.pravatar.cc/150' }} 
            style={styles.avatar} 
          />
          
          <View>
             <Text style={styles.headerName}>{recipientName}</Text>
             <Text style={styles.statusText}>Online</Text>
          </View>
        </View>
        
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* 2. Middle Part (Chat Area) */}
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <FlatList
          data={messages}
          renderItem={renderMessageItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          inverted // This makes the list start from the bottom (standard for chats)
        />

        {/* 3. Bottom Part (Input) */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="#999"
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Ionicons name="send" size={20} color="white" style={{ marginLeft: 2 }} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E8FAEF', // Mint Background
  },
  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#E8FAEF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    paddingRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#ccc',
  },
  headerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  statusText: {
    fontSize: 12,
    color: '#22C55E', // Green for online status
  },

  // Chat Area Styles
  keyboardAvoidingView: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  messageContainer: {
    marginVertical: 5,
    flexDirection: 'row',
  },
  myMessageContainer: {
    justifyContent: 'flex-end',
  },
  theirMessageContainer: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  
  // Specific Bubble Colors
  myBubble: {
    backgroundColor: '#22C55E', // Your "Lime Green" (Strong Brand Green)
    borderBottomRightRadius: 4, // Subtle tailored corner
  },
  theirBubble: {
    backgroundColor: '#FFFFFF', // White
    borderBottomLeftRadius: 4, // Subtle tailored corner
  },

  // Text Styles
  messageText: {
    fontSize: 16,
  },
  myMessageText: {
    color: '#FFFFFF', // White text on green background
  },
  theirMessageText: {
    color: '#000000', // Black text on white background
  },
  timeText: {
    fontSize: 10,
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  myTimeText: {
    color: 'rgba(255,255,255,0.7)',
  },
  theirTimeText: {
    color: '#888',
  },

  // Input Area Styles
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingBottom: 20, // Extra padding for safe area
    backgroundColor: '#E8FAEF',
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
    maxHeight: 100, // Limit height for multiline
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#22C55E', // Matching Green
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});