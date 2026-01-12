import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CartPage = () => {
  // Example state for the cart
  const cartItems = [
    { id: '1', name: 'Carrots', price: 10, qty: 2 },
    { id: '2', name: 'Potatoes', price: 5, qty: 5 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Shopping Cart</Text>
      <FlatList 
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text>{item.qty} kg x ${item.price}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.checkoutBtn}>
        <Text style={{color: 'white'}}>Checkout Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  item: { padding: 15, backgroundColor: '#fff', marginBottom: 10, borderRadius: 8, elevation: 2 },
  itemName: { fontSize: 18, fontWeight: '600' },
  checkoutBtn: { backgroundColor: '#FF9800', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 }
});

export default CartPage;