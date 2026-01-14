import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import ImageViewer from "react-native-image-zoom-viewer";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Assuming your current Props looks like this
type Props = {
  product: {
    id: string;
    name: string;
    image: string;
    vendor: string;
    unitPrice: number;
    bestBefore: string;
    description: string;
  };
  role: "vendor" | "buyer";
  // Add surplus here
  surplus?: boolean;
};


export default function ProductDetailsCard({ product, role, surplus = false }: Props) {
  const [qty, setQty] = useState(1);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [rating, setRating] = useState(0);

  const totalPrice = product.unitPrice * qty;
  const screenHeight = Dimensions.get("window").height;

  const goHome = () =>
    router.push(role === "buyer" ? "/buyer/home" : "/vendor/home");
  const goProfile = () =>
    router.push(role === "buyer" ? "/buyer/profile" : "/vendor/profile");

  const handleAddToCart = () =>
    Alert.alert("Added", `${qty} kg of ${product.name} added to cart`);

  /* ---------- Load Rating ---------- */
  useEffect(() => {
    const loadRating = async () => {
      const saved = await AsyncStorage.getItem(`rating-${product.id}`);
      if (saved) setRating(Number(saved));
    };
    loadRating();
  }, [product.id]);

  /* ---------- Save Rating ---------- */
  const handleRating = async (value: number) => {
    setRating(value);
    await AsyncStorage.setItem(`rating-${product.id}`, value.toString());
  };

  return (

    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator
        persistentScrollbar
      >
        {/* ================= IMAGE ================= */}
        <TouchableOpacity onPress={() => setImageModalVisible(true)}>
          <Image
            source={{ uri: product.image }}
            style={[styles.bannerImage, { height: screenHeight * 0.55 }]}
            resizeMode="cover"
          />
        </TouchableOpacity>

        {/* ================= CONTENT ================= */}
        <View style={styles.mainContent}>
          {/* ===== PRODUCT SUMMARY CARD ===== */}
          <View style={styles.card}>
            <Text style={styles.productTitle}>{product.name}</Text>

            <Text style={styles.soldBy}>
              Sold by: <Text style={styles.vendorName}>{product.vendor}</Text>
            </Text>

            <View style={styles.rowBetween}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{product.bestBefore}</Text>
              </View>
              <Text style={styles.priceLabel}>
                Rs.{product.unitPrice} / 1kg
              </Text>
            </View>

            {role === "buyer" && (
              <View style={styles.ratingRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => handleRating(star)}
                  >
                    <Ionicons
                      name={star <= rating ? "star" : "star-outline"}
                      size={28}
                      color="#fbbf24"
                      style={{ marginRight: 6 }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* ===== QUANTITY CARD ===== */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Quantity (kg)</Text>

            <View style={styles.qtyControls}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() =>
                  setQty((q) => Math.max(0.5, +(q - 0.5).toFixed(1)))
                }
              >
                <Text style={styles.qtyBtnText}>−</Text>
              </TouchableOpacity>

              <Text style={styles.qtyText}>{qty}</Text>

              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => setQty((q) => +(q + 0.5).toFixed(1))}
              >
                <Text style={styles.qtyBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ===== TOTAL PRICE CARD ===== */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Total Price</Text>
            <Text style={styles.totalValue}>Rs.{totalPrice}</Text>
          </View>

          {/* ===== DESCRIPTION CARD ===== */}
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.descHeader}
              onPress={() => setShowFullDesc(!showFullDesc)}
            >
              <Text style={styles.cardTitle}>Description</Text>
              <Text style={styles.arrow}>
                {showFullDesc ? "⌃" : "⌄"}
              </Text>
            </TouchableOpacity>

            {showFullDesc && (
              <Text style={styles.descText}>{product.description}</Text>
            )}
          </View>

        <View style={styles.card}>
  <TouchableOpacity
    style={styles.actionButton}
    onPress={() => {
      if (role === "buyer") {
        handleAddToCart();
      } else {
        router.push({
          pathname: surplus
            ? "/vendor/surplus/edit/[id]"
            : "/vendor/product/edit/[id]",
          params: { id: product.id },
        });
      }
    }}
  >
    <Text style={styles.actionButtonText}>
      {role === "buyer" ? "Add To Cart" : "Update Product"}
    </Text>
  </TouchableOpacity>
</View>


        </View>
      </ScrollView>

      {/* ================= FOOTER ================= */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={goHome}>
          <Ionicons name="home" size={26} color="#22c55e" />
        </TouchableOpacity>
        <TouchableOpacity onPress={goProfile}>
          <Ionicons name="person" size={26} color="#22c55e" />
        </TouchableOpacity>
      </View>

      {/* ================= IMAGE MODAL ================= */}
      <Modal visible={imageModalVisible} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: "#000" }}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setImageModalVisible(false)}
          >
            <Text style={styles.closeBtnText}>Close</Text>
          </TouchableOpacity>

          <ImageViewer
            imageUrls={[{ url: product.image }]}
            enableSwipeDown
            onSwipeDown={() => setImageModalVisible(false)}
            saveToLocalByLongPress={false}
          />
        </View>
      </Modal>

       
    </View>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#d0f0c0" },
  scrollContent: { paddingBottom: 30 },

  bannerImage: { width: "100%" },

  mainContent: {
    padding: 18,
  },

  card: {
    backgroundColor: "#ffe5d6ee",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },

  productTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1f2937",
  },

  soldBy: {
    fontSize: 16,
    color: "#4b5563",
    marginVertical: 6,
  },

  vendorName: {
    fontWeight: "700",
    color: "#16a34a",
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  badge: {
    backgroundColor: "#d2530a",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  badgeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },

  priceLabel: {
    fontSize: 20,
    fontWeight: "800",
  },

  ratingRow: {
    flexDirection: "row",
    marginTop: 12,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },

  qtyControls: {
    flexDirection: "row",
    alignItems: "center",
  },

  qtyBtn: {
    backgroundColor: "#e5e7eb",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },

  qtyBtnText: {
    fontSize: 22,
    fontWeight: "700",
  },

  qtyText: {
    marginHorizontal: 16,
    fontSize: 18,
    fontWeight: "700",
  },

  totalValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#16a34a",
  },

  descHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  arrow: {
    fontSize: 18,
    fontWeight: "700",
  },

  descText: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
  },

  actionButton: {
    backgroundColor: "#22c55e",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  actionButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
  },

  closeBtn: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    zIndex: 10,
  },

  closeBtnText: {
    fontWeight: "700",
  },
});
