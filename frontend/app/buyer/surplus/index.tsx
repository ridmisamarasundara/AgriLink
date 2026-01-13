import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

/* ---------------- MOCK DATA ---------------- */
const PRODUCTS = [
  {
    id: "1",
    name: "Surplus Tomatoes",
    vendor: "Organic Veg Master",
    price: 100,
    quantity: "1kg",
    image:"https://survivemodernlife.files.wordpress.com/2016/09/moldy-tomato.jpg?w=1140",
  },
  {
    id: "2",
    name: "Surplus Tomatoes",
    vendor: "Fresh Farm Veggies",
    price: 120,
    quantity: "1kg",
    image:
     "https://survivemodernlife.files.wordpress.com/2016/09/moldy-tomato.jpg?w=1140",
  },
  {
    id: "3",
    name: "Surplus Tomatoes",
    vendor: "Green Valley",
    price: 90,
    quantity: "1kg",
    image:
       "https://survivemodernlife.files.wordpress.com/2016/09/moldy-tomato.jpg?w=1140",
  },
  {
    id: "4",
    name: "Surplus Tomatoes",
    vendor: "Daily Fresh",
    price: 80,
    quantity: "1kg",
    image:
      "https://survivemodernlife.files.wordpress.com/2016/09/moldy-tomato.jpg?w=1140",
  },
];

export default function BuyerHome() {
  return (
    <View style={styles.container}>
      {/* ---------- HEADER ---------- */}
      <View style={styles.header}>
        <Text style={styles.welcome}>Fresh Tomatoes</Text>
        <Text style={styles.subtitle}>
          Buy directly from trusted farmers
        </Text>
      </View>

      {/* ---------- PRODUCT GRID ---------- */}
      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() =>
              router.push(`/buyer/surplus/${item.id}`)
            }
          >
            {/* Image */}
            <Image source={{ uri: item.image }} style={styles.image} />

            {/* Info Box */}
            <View style={styles.infoBox}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.vendorName}>
                Sold by: {item.vendor}
              </Text>

              <View style={styles.priceRow}>
                <Text style={styles.price}>Rs. {item.price}</Text>
                <Text style={styles.quantity}>/ {item.quantity}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* ---------- FOOTER ---------- */}
      <View style={styles.footer}>
        <Ionicons name="home" size={26} color="#9ca3af" />
        <Ionicons name="cart" size={26} color="#9ca3af" />
        <Ionicons name="person" size={26} color="#9ca3af" />
      </View>
    </View>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c7fdc9",
    paddingHorizontal: 14,
  },

  header: {
    marginTop: 20,
    marginBottom: 16,
  },

  welcome: {
    fontSize: 30,
    fontWeight: "800",
    color: "#111827",
  },

  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },

  row: {
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 30,

    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },

  image: {
    width: "100%",
    height: 120,
  },

  infoBox: {
    padding: 10,
    backgroundColor: "#f1f5f9",
  },

  productName: {
    fontSize: 15,
    fontWeight: "900",
    color: "#111827",
  },

  vendorName: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0a3e19",
    marginTop: 2,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  price: {
    fontSize: 16,
    fontWeight: "800",
    color: "#f97316",
  },

  quantity: {
    fontSize: 13,
    color: "#04620f",
    marginLeft: 4,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#fff",
  },
});
