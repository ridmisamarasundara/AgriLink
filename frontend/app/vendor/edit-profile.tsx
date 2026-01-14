import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const CATEGORY_OPTIONS = [
  { id: '1', name: 'Vegetables' },
  { id: '2', name: 'Fruits' },
  { id: '3', name: 'Surplus' },
];

export default function VendorEditProfile() {
  const router = useRouter();

  const [name, setName] = useState('Jenny Smith');
  const [email, setEmail] = useState('Jenny@gmail.com');
  const [farmName, setFarmName] = useState('Sunny Acres Farm');
  const [experience, setExperience] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [image, setImage] = useState<string | null>(null);

  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Vegetables']);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);

  const [tags, setTags] = useState<string[]>(['Tomatoes', 'Carrot']);
  const [currentTagText, setCurrentTagText] = useState('');


  const pickImage = async () => {
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

  const toggleCategory = (categoryName: string) => {
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(selectedCategories.filter(c => c !== categoryName));
    } else {
      setSelectedCategories([...selectedCategories, categoryName]);
    }
  };

  const addTag = () => {
    if (currentTagText.trim().length > 0 && !tags.includes(currentTagText.trim())) {
      setTags([...tags, currentTagText.trim()]);
      setCurrentTagText('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = () => {
    if (password && password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    console.log({ name, farmName, selectedCategories, tags });
    Alert.alert("Success", "Profile Updated!");
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={styles.container}>
          
          <View style={styles.uploadSection}>
            <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
               {image ? (
                  <Image source={{ uri: image }} style={styles.profileImage} />
               ) : (
                  <View style={styles.placeholderImage} />
               )}
               <View style={styles.cameraIconContainer}>
                 <Ionicons name="camera" size={20} color="white" />
               </View>
            </TouchableOpacity>
            <Text style={styles.uploadText}>Upload a Photo</Text>
            <Text style={styles.uploadSubText}>Tap to Change the Picture</Text>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />

            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

            <Text style={styles.label}>Farm Name</Text>
            <TextInput style={styles.input} value={farmName} onChangeText={setFarmName} />
          
            <View style={styles.row}>
              
              <View style={[styles.halfInputContainer, { marginRight: 10 }]}>
                <Text style={styles.label}>Category / Type Of Foods</Text>
                <TouchableOpacity 
                  style={styles.dropdownInput} 
                  onPress={() => setCategoryModalVisible(true)}
                >
                  <Text numberOfLines={1} style={styles.dropdownText}>
                    {selectedCategories.length > 0 ? selectedCategories.join(', ') : 'Select...'}
                  </Text>
                  <Ionicons name="chevron-expand" size={18} color="black" />
                </TouchableOpacity>
              </View>

              <View style={styles.halfInputContainer}>
                <Text style={styles.label}>Experience (Years)</Text>
                <TextInput 
                  style={styles.input} 
                  value={experience} 
                  onChangeText={setExperience}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <Text style={styles.label}>Available Products / Specialization</Text>
            <View style={styles.tagsContainer}>
              <View style={styles.tagsWrapper}>
                {tags.map((tag, index) => (
                  <TouchableOpacity key={index} style={styles.tag} onPress={() => removeTag(tag)}>
                    <Text style={styles.tagText}>{tag}</Text>
                    <Ionicons name="close" size={14} color="#000" style={{ marginLeft: 4 }} />
                  </TouchableOpacity>
                ))}
              </View>
              <TextInput 
                style={styles.tagInput}
                placeholder="Add a Tag..."
                placeholderTextColor="#888"
                value={currentTagText}
                onChangeText={setCurrentTagText}
                onSubmitEditing={addTag}
                blurOnSubmit={false}
              />
            </View>

            <View style={styles.row}>
               <View style={[styles.halfInputContainer, { marginRight: 10 }]}>
                  <Text style={styles.label}>New Password</Text>
                  <TextInput style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
               </View>
               <View style={styles.halfInputContainer}>
                  <Text style={styles.label}>Confirm Password</Text>
                  <TextInput style={styles.input} secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
               </View>
            </View>

          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        visible={isCategoryModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setCategoryModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Categories</Text>
              <TouchableOpacity onPress={() => setCategoryModalVisible(false)}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={CATEGORY_OPTIONS}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.modalItem} 
                  onPress={() => toggleCategory(item.name)}
                >
                  <Text style={styles.modalItemText}>{item.name}</Text>
                  {selectedCategories.includes(item.name) && (
                    <Ionicons name="checkmark-circle" size={24} color="#22C55E" />
                  )}
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity 
              style={styles.modalDoneButton} 
              onPress={() => setCategoryModalVisible(false)}
            >
              <Text style={styles.saveButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
    backgroundColor: '#E6E6E6',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  container: {
    padding: 20,
    paddingBottom: 50,
  },
  
  uploadSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  imageContainer: {
    marginBottom: 10,
    position: 'relative',
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
    backgroundColor: '#F3E3D3',
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
    backgroundColor: '#F3E3D3', // Beige
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInputContainer: {
    flex: 1,
  },

  dropdownInput: {
    backgroundColor: '#F3E3D3',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
    maxWidth: '90%',
  },

  tagsContainer: {
    backgroundColor: '#F3E3D3',
    borderRadius: 8,
    padding: 10,
    minHeight: 100,
  },
  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4ADE80', 
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 2,
  },
  tagInput: {
    fontSize: 14,
    paddingVertical: 5,
  },

  saveButton: {
    backgroundColor: '#22C55E',
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
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '50%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalItemText: {
    fontSize: 16,
  },
  modalDoneButton: {
    backgroundColor: '#22C55E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
});