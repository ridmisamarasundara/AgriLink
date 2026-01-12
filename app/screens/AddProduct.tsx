import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

const AddProductScreen = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add New Produce</Text>
      
      {/* Image Picker Section */}
      <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.previewImage} />
        ) : (
          <Text style={styles.imagePlaceholder}>+ Add Product Photo</Text>
        )}
      </TouchableOpacity>

      <TextInput style={styles.input} placeholder="Product Name" onChangeText={setName} />
      {/* Include other inputs for Price, Quantity, and Expiry Date here */}

      <TouchableOpacity style={styles.submitBtn} onPress={() => Alert.alert("Success", "Product added with image!")}>
        <Text style={styles.btnText}>Post to AgriLink</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', color: '#2E7D32', marginBottom: 20 },
  imageBox: { 
    width: '100%', height: 200, backgroundColor: '#F0F0F0', 
    borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 20,
    borderWidth: 1, borderColor: '#ddd', borderStyle: 'dashed' 
  },
  previewImage: { width: '100%', height: '100%', borderRadius: 15 },
  imagePlaceholder: { color: '#666', fontWeight: 'bold' },
  input: { backgroundColor: '#F9F9F9', padding: 15, borderRadius: 10, marginBottom: 15 },
  submitBtn: { backgroundColor: '#2E7D32', padding: 18, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});

export default AddProductScreen;