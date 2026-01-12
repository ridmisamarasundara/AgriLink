import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BuyerCart = () => {
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Red Onions', price: 300, qty: 2, unit: 'kg' },
    { id: '2', name: 'Fresh Carrots', price: 150, qty: 1, unit: 'kg' },
  ]);

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Shopping Cart</Text>
      
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <View style={styles.info}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDetail}>{item.qty} {item.unit} x Rs. {item.price}</Text>
            </View>
            <Text style={styles.itemTotal}>Rs. {item.qty * item.price}</Text>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Amount:</Text>
          <Text style={styles.totalPrice}>Rs. {totalPrice}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn}>
          <Text style={styles.btnText}>Confirm Purchase</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#2E7D32', marginBottom: 20 },
  cartItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    backgroundColor: '#FFF', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 10, 
    elevation: 2 
  },
  // --- ADD THESE TWO SECTIONS BELOW ---
  info: {
    flex: 1, // This allows the text to take up the available space
  },
  itemDetail: {
    color: '#666',
    fontSize: 14,
  },
  // ------------------------------------
  itemName: { fontSize: 16, fontWeight: 'bold' },
  itemTotal: { fontWeight: 'bold', color: '#2E7D32' },
  footer: { borderTopWidth: 1, borderColor: '#DDD', paddingTop: 20 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  totalLabel: { fontSize: 18, color: '#333' },
  totalPrice: { fontSize: 22, fontWeight: 'bold', color: '#2E7D32' },
  checkoutBtn: { backgroundColor: '#2E7D32', padding: 18, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});

export default BuyerCart;