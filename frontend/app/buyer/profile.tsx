import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  Switch, 
  ScrollView, 
  SafeAreaView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function BuyerProfile() {
  const router = useRouter();
  
  // State for the notification toggle
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  const toggleSwitch = () => setIsNotificationsEnabled(previousState => !previousState);

  const handleLogout = () => {
    // Add your logout logic here (clear tokens, etc.)
    console.log("Logging out...");
    router.replace('/'); // Redirect to landing or login
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/300' }} 
              style={styles.avatar} 
            />
          </View>
          <Text style={styles.name}>Jane Doe</Text>
          <Text style={styles.role}>Verified Buyer</Text>

          <TouchableOpacity style={styles.editButton} onPress={() => router.push('/buyer/edit-profile')}>
            <Text style={styles.editButtonText}>Edit profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={24} color="black" style={styles.icon} />
            <Text style={styles.infoText}>Janne@gmail.com</Text>
          </View>
        </View>

        <View style={styles.settingsSection}>
          <View style={styles.settingRow}>
            <View style={styles.settingLabel}>
              <View style={styles.iconContainer}>
                 <Ionicons name="notifications" size={22} color="black" />
                 <View style={styles.notificationDot} />
              </View>
              <Text style={styles.settingText}>Notifications</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#4ADE80" }}
              thumbColor={isNotificationsEnabled ? "#f4f3f4" : "#f4f3f4"}
              onValueChange={toggleSwitch}
              value={isNotificationsEnabled}
            />
          </View>
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#FF3B30" style={{ marginRight: 8 }} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E8FAEF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  avatarContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  role: {
    fontSize: 14,
    color: '#22C55E',
    fontWeight: '600',
    marginBottom: 15,
  },
  editButton: {
    backgroundColor: '#D1D5DB',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#000',
    fontWeight: '500',
  },
  infoCard: {
    backgroundColor: '#F3E3D3',
    borderRadius: 15,
    padding: 20,
    height: 120,
    justifyContent: 'center',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  infoText: {
    fontSize: 16,
    color: '#000',
  },
  settingsSection: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  settingLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'relative',
    marginRight: 15,
  },
  notificationDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: '#fff',
  },
  settingText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  logoutButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 18,
    fontWeight: 'bold',
  }
});