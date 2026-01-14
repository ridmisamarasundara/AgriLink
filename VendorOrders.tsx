import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const VendorOrders = () => {
  const incomingOrders = [
    { id: '101', buyer: 'Auni', product: 'Potatoes', qty: '10kg', status: 'Pending' },
    { id: '102', buyer: 'Saman', product: 'Tomatoes', qty: '5kg', status: 'Packed' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Incoming Orders</Text>
      <Text style={styles.subText}>Manage your stock to reduce wastage</Text>

      <FlatList
        data={incomingOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <View>
              <Text style={styles.buyerName}>Buyer: {item.buyer}</Text>
              <Text style={styles.orderInfo}>{item.product} - {item.qty}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: item.status === 'Pending' ? '#FFE082' : '#C8E6C9' }]}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#1B5E20' },
  subText: { color: '#666', marginBottom: 20 },
  orderCard: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 15, borderWidth: 1, borderColor: '#EEE', borderRadius: 10, marginBottom: 10 
  },
  buyerName: { fontSize: 16, fontWeight: 'bold' },
  orderInfo: { color: '#444', marginTop: 4 },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  statusText: { fontSize: 12, fontWeight: 'bold' }
});

export default VendorOrders;