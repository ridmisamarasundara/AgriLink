import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  LayoutAnimation,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  UIManager,
  View
} from 'react-native';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface SettingsRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  showNotificationDot?: boolean;
}

const SettingsRow = ({
  icon,
  label,
  value,
  onValueChange,
  showNotificationDot = false,
}: SettingsRowProps) => {
  return (
    <View style={styles.settingRow}>
      <View style={styles.leftContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={22} color="#333" />
          {showNotificationDot && <View style={styles.notificationDot} />}
        </View>
        <Text style={styles.settingText}>{label}</Text>
      </View>

      <Switch
        trackColor={{ false: "#767577", true: "#4ADE80" }}
        thumbColor={"#f4f3f4"}
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  );
};


export default function VendorProfile() {
  const router = useRouter();
  
  // State
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isInfoExpanded, setIsInfoExpanded] = useState(true);

  const toggleSwitch = () => setIsNotificationsEnabled(prev => !prev);
  
  const toggleInfo = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsInfoExpanded(!isInfoExpanded);
  };

  const handleLogout = () => {
    router.replace('/'); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Profile Avatar & Rating Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/300?img=5' }} 
              style={styles.avatar} 
            />
          </View>
          <Text style={styles.name}>Jenny Smith</Text>
          <Text style={styles.role}>Verified Vendor</Text>

          {/* Rating Block */}
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingNumber}>4.8</Text>
            <View style={styles.starsRow}>
               {[1,2,3,4].map((i) => (
                 <Ionicons key={i} name="star" size={20} color="#FBBF24" />
               ))}
               <Ionicons name="star-half" size={20} color="#FBBF24" />
            </View>
            <Text style={styles.reviewCount}>120 reviews</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => router.push('/vender/edit-profile')}
            >
              <Text style={styles.editButtonText}>Edit profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.listingsButton}>
              <Text style={styles.listingsButtonText}>View my listings</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Basic Information Card */}
        <View style={styles.infoCard}>
          <TouchableOpacity 
            style={styles.infoHeader} 
            onPress={toggleInfo}
            activeOpacity={0.7}
          >
            <Text style={styles.infoTitle}>Basic Information</Text>
            <Ionicons 
              name={isInfoExpanded ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#666" 
            />
          </TouchableOpacity>

          {isInfoExpanded && (
            <View style={styles.infoContent}>
              <View style={styles.infoRow}>
                <Ionicons name="mail-outline" size={20} color="#555" style={styles.infoIcon} />
                <Text style={styles.infoText}>Jenny@gmail.com</Text>
              </View>

              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="fruit-watermelon" size={20} color="#555" style={styles.infoIcon} />
                <Text style={styles.infoText}>Organic vegetables</Text>
              </View>

              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="tractor" size={20} color="#555" style={styles.infoIcon} />
                <Text style={styles.infoText}>Sunny Acres Farm</Text>
              </View>

              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="history" size={20} color="#555" style={styles.infoIcon} />
                <Text style={styles.infoText}>15years</Text>
              </View>
            </View>
          )}
        </View>

        {/* Notification Bar - Now uses the same Peach color! */}
        <SettingsRow
          icon="notifications"
          label="Notifications"
          value={isNotificationsEnabled}
          onValueChange={toggleSwitch}
          showNotificationDot={true}
        />

      </ScrollView>

      {/* Logout Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#FF3B30" style={{ marginRight: 8 }} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

// ---------------------------------------------------------
// 3. STYLES
// ---------------------------------------------------------
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25,
  },
  avatarContainer: {
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#F472B6',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  role: {
    fontSize: 14,
    color: '#22C55E', 
    fontWeight: '600',
    marginBottom: 15,
  },
  ratingContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingNumber: {
    fontSize: 32,
    fontWeight: 'bold', 
    color: '#000',
    marginBottom: 5,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 5,
    marginBottom: 5,
  },
  reviewCount: {
    color: '#666',
    fontSize: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 15,
    width: '100%',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  editButtonText: {
    color: '#000',
    fontWeight: '500',
  },
  listingsButton: {
    backgroundColor: '#3CDC2C', 
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  listingsButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  
  // Information Card Styles
  infoCard: {
    backgroundColor: '#FDF4F0', // Peach Background
    borderRadius: 15,
    padding: 20,
    marginBottom: 15, // Reduced margin to bring notifications closer
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  infoContent: {
    marginTop: 5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoIcon: {
    width: 30,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  
  // SettingsRow Styles (Now matching the Theme!)
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20, // Matched padding with Info Card
    backgroundColor: '#FDF4F0', // CHANGED: Now uses Peach instead of Grey
    borderRadius: 15,
    marginBottom: 20,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'relative',
    marginRight: 15,
    width: 24,
    alignItems: 'center',
  },
  notificationDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444', 
    borderWidth: 1,
    borderColor: '#FDF4F0', // Border matches background
  },
  settingText: {
    fontSize: 16,
    fontWeight: '600', // Matched weight with "Basic Information" title
    color: '#333',
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  logoutButton: {
    backgroundColor: '#F3F4F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 15,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 18,
    fontWeight: 'bold',
  },
});