import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ChatListItem from './chatListItem';

type ChatData = {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  time?: string;
  unreadCount?: number;
};

type ChatListProps = {
  title: string;
  searchPlaceholder: string;
  data: ChatData[];
  role: 'buyer' | 'vendor'; 
};

export default function ChatList({ title, searchPlaceholder, data, role }: ChatListProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');

  // Filter data based on search
  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity>
           <Ionicons name="ellipsis-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#000" style={styles.searchIcon} />
          <TextInput
            placeholder={searchPlaceholder}
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>

        {/* CONDITIONAL LAYOUT:
          If Buyer -> Wrap list in the Beige Box
          If Vendor -> Just show the list
        */}
        {role === 'buyer' ? (
          <View style={styles.buyerListContainer}>
            <FlatList
              data={filteredData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ChatListItem 
                  {...item} 
                  mode="directory"
                    onPress={() => {
                        router.push({
                            pathname: "/chat/[id]", // This points to app/chat/[id].tsx
                            params: { 
                            id: item.id, 
                            name: item.name, 
                            avatar: item.avatar || '' 
                            }
                        });
                        }}                />
              )}
            />
          </View>
        ) : (
          <View style={styles.vendorListContainer}>
            <FlatList
              data={filteredData}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: 20 }}
              renderItem={({ item }) => (
                <ChatListItem 
                  {...item} 
                  mode="history"
                    onPress={() => {
                        router.push({
                            pathname: "/chat/[id]", // This points to app/chat/[id].tsx
                            params: { 
                            id: item.id, 
                            name: item.name, 
                            avatar: item.avatar || '' 
                            }
                        });
                        }}                />
              )}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E8FAEF', // Mint background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#95E1A8', // Darker mint for search bar
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  // Buyer Specific Layout (The Beige Box)
  buyerListContainer: {
    backgroundColor: '#F3E3D3', // Beige
    borderRadius: 20,
    padding: 20,
    flex: 1, // Fill remaining space
    marginBottom: 20,
  },
  // Vendor Specific Layout (Transparent background, items have their own cards)
  vendorListContainer: {
    flex: 1,
  },
});