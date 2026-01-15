import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Switch, Text, View, ViewStyle } from 'react-native';

// Define the props the component accepts
interface SettingsRowProps {
  icon: keyof typeof Ionicons.glyphMap; // Ensures only valid icon names are used
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  showNotificationDot?: boolean; // Optional, defaults to false
  style?: ViewStyle; // Optional custom styles for the container
}

export default function SettingsRow({
  icon,
  label,
  value,
  onValueChange,
  showNotificationDot = false,
  style,
}: SettingsRowProps) {
  return (
    <View style={[styles.settingRow, style]}>
      <View style={styles.leftContainer}>
        {/* Icon Container with Dot */}
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={22} color="black" />
          {showNotificationDot && <View style={styles.notificationDot} />}
        </View>
        
        {/* Label Text */}
        <Text style={styles.settingText}>{label}</Text>
      </View>

      {/* Toggle Switch */}
      <Switch
        trackColor={{ false: "#767577", true: "#4ADE80" }} // Green when active
        thumbColor={value ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF', // White background for the bar
    borderRadius: 12,           // Rounded corners
    marginBottom: 12,           // Space between bars
    // Optional shadow for better visibility
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'relative',
    marginRight: 15,
    width: 24, // Fixed width to align text even if icons vary slightly
    alignItems: 'center',
  },
  notificationDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444', // Red alert color
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  settingText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
});
