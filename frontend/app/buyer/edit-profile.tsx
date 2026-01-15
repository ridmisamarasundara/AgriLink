import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  Image,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function EditProfile() {
  const router = useRouter();

  // State for form fields
  const [name, setName] = useState('Jane Doe');
  const [email, setEmail] = useState('Janne@gmail.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // State for profile image
  const [image, setImage] = useState<string | null>(null);

  // Function to pick an image
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    // Add logic to update user data here
    Alert.alert("Success", "Profile updated successfully");
    router.back(); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Image Upload Section */}
        <View style={styles.uploadSection}>
          <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
             {image ? (
                <Image source={{ uri: image }} style={styles.profileImage} />
             ) : (
                <View style={styles.placeholderImage} />
             )}
             
             {/* Camera Icon Overlay */}
             <View style={styles.cameraIconContainer}>
               <Ionicons name="camera" size={20} color="white" />
             </View>
          </TouchableOpacity>
          
          <Text style={styles.uploadText}>Upload a Photo</Text>
          <Text style={styles.uploadSubText}>Tap to Change the Picture</Text>
        </View>

        {/* Form Fields */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput 
            style={styles.input} 
            value={name} 
            onChangeText={setName}
            placeholder="Enter your name"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput 
            style={styles.input} 
            value={email} 
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="Enter your email"
          />

          <Text style={styles.label}>New Password</Text>
          <TextInput 
            style={styles.input} 
            value={password} 
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Enter new password"
          />

          <Text style={styles.label}>Confirm Password</Text>
          <TextInput 
            style={styles.input} 
            value={confirmPassword} 
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholder="Confirm new password"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E8FAEF', // Mint green background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#E6E6E6', // Light grey header background per design
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  container: {
    padding: 20,
  },
  uploadSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  placeholderImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F3E3D3', // Peach color
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#333',
    padding: 6,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#E8FAEF',
  },
  uploadText: {
    color: '#22C55E',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
  },
  uploadSubText: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
  formGroup: {
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#F3E3D3', // Beige input background
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
  },
  saveButton: {
    backgroundColor: '#22C55E', // Green button
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});