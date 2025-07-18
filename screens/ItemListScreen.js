import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import items from '../data/items.json';

const ItemListScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Items</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.qrCode}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>Price: KES {item.price}</Text>
            <Text>QR: {item.qrCode}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  item: {
    padding: 12,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    marginBottom: 10,
  },
  name: { fontWeight: 'bold', fontSize: 16 }
});

export default ItemListScreen;
