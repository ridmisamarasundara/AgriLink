import React, { useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { MOCK_PRODUCTS } from '../../assets/data/products';

// Mock Data (In a real app, this comes from MongoDB via your API)

const [filteredProducts, setFilteredProducts] = useState(MOCK_PRODUCTS);
const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(MOCK_PRODUCTS);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = MOCK_PRODUCTS.filter(item => 
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.header}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for fresh produce..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Category Quick Filters */}
      <View style={styles.categoryRow}>
        {['All', 'Vegetables', 'Fruits', 'Grains'].map((cat) => (
          <TouchableOpacity key={cat} style={styles.chip}>
            <Text style={styles.chipText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Results List */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImg} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productCategory}>{item.category}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
            </View>
            <TouchableOpacity style={styles.addBtn}>
              <Text style={styles.addBtnText}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No products found.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { padding: 20, backgroundColor: '#2E7D32', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  searchBar: { backgroundColor: '#FFF', padding: 12, borderRadius: 10, fontSize: 16 },
  categoryRow: { flexDirection: 'row', padding: 15, justifyContent: 'space-around' },
  chip: { backgroundColor: '#E8F5E9', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  chipText: { color: '#2E7D32', fontWeight: 'bold' },
  productCard: { 
    flexDirection: 'row', 
    backgroundColor: '#FFF', 
    marginHorizontal: 15, 
    marginBottom: 10, 
    padding: 10, 
    borderRadius: 12, 
    alignItems: 'center',
    elevation: 3 
  },
  productImg: { width: 70, height: 70, borderRadius: 8 },
  productInfo: { flex: 1, marginLeft: 15 },
  productName: { fontSize: 16, fontWeight: 'bold' },
  productCategory: { color: '#666', fontSize: 12 },
  productPrice: { color: '#2E7D32', fontWeight: 'bold', marginTop: 4 },
  addBtn: { backgroundColor: '#2E7D32', padding: 8, borderRadius: 6 },
  addBtnText: { color: '#FFF', fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#999' }
});

export default SearchScreen;