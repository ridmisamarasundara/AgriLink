import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";

export default function EditSurplusProduct() {
  const { id, name: initialName, unitPrice: initialPrice, bestBefore: initialBestBefore, description: initialDescription, image: initialImage } = useLocalSearchParams();

  const [name, setName] = useState(String(initialName ?? ""));
  const [unitPrice, setUnitPrice] = useState(String(initialPrice ?? ""));
  const [bestBefore, setBestBefore] = useState(String(initialBestBefore ?? ""));
  const [description, setDescription] = useState(String(initialDescription ?? ""));
  const [image, setImage] = useState(String(initialImage ?? ""));

  // Pick image
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission denied", "You need to allow access to select an image.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  // Update surplus product
  const updateProduct = () => {
    if (!name || !unitPrice || !bestBefore || !description) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    // Navigate back to surplus/[id] page
    router.replace(
      `/vendor/surplus/${id}?name=${encodeURIComponent(name)}&unitPrice=${unitPrice}&bestBefore=${encodeURIComponent(bestBefore)}&description=${encodeURIComponent(description)}&image=${encodeURIComponent(image)}`
    );

    Alert.alert("Success", "Surplus product updated successfully");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <Text style={styles.title}>Edit Surplus Product</Text>

      {/* IMAGE */}
      <View style={styles.imageCard}>
        {image ? (
          <Image source={{ uri: image }} style={styles.productImage} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>No Image Selected</Text>
          </View>
        )}
        <TouchableOpacity style={styles.imageBtn} onPress={pickImage}>
          <Text style={styles.imageBtnText}>Change Image</Text>
        </TouchableOpacity>
      </View>

      {/* PRODUCT INFO */}
      <View style={styles.card}>
        <Text style={styles.label}>Product Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter product name" />

        <Text style={styles.label}>Unit Price (Rs.)</Text>
        <TextInput style={styles.input} value={unitPrice} onChangeText={setUnitPrice} keyboardType="numeric" placeholder="Enter price per kg" />

        <Text style={styles.label}>Best Before</Text>
        <TextInput style={styles.input} value={bestBefore} onChangeText={setBestBefore} placeholder="Enter best before info" />

        <Text style={styles.label}>Description</Text>
        <TextInput style={[styles.input, styles.textArea]} value={description} onChangeText={setDescription} multiline placeholder="Enter product description" />
      </View>

      {/* UPDATE BUTTON */}
      <TouchableOpacity style={styles.updateBtn} onPress={updateProduct}>
        <Text style={styles.updateBtnText}>Update Product</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eef2f7", paddingHorizontal: 16 },
  title: { fontSize: 28, fontWeight: "800", color: "#111827", marginVertical: 20 },
  imageCard: { backgroundColor: "#fff", padding: 16, borderRadius: 16, alignItems: "center", marginBottom: 24, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 5 },
  productImage: { width: 180, height: 180, borderRadius: 12, marginBottom: 12 },
  placeholder: { width: 180, height: 180, borderRadius: 12, backgroundColor: "#e5e7eb", justifyContent: "center", alignItems: "center", marginBottom: 12 },
  placeholderText: { color: "#6b7280", fontWeight: "600" },
  imageBtn: { backgroundColor: "#22c55e", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 12 },
  imageBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  card: { backgroundColor: "#fff", padding: 20, borderRadius: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 5, marginBottom: 24 },
  label: { fontSize: 14, fontWeight: "600", color: "#6b7280", marginBottom: 6 },
  input: { borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 16, backgroundColor: "#f9fafb", fontSize: 16, color: "#111827" },
  textArea: { height: 120, textAlignVertical: "top" },
  updateBtn: { backgroundColor: "#f97316", paddingVertical: 16, borderRadius: 14, alignItems: "center", shadowColor: "#f97316", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 4 },
  updateBtnText: { color: "#fff", fontSize: 18, fontWeight: "700" },
});
