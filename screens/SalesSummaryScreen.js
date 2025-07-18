import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { printReceipt } from '../utils/PrintHelper';

const SalesSummaryScreen = ({ route }) => {
  const { sales } = route.params || { sales: [] };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const filteredSales = sales.filter((sale) => {
    const saleDate = new Date(sale.timestamp);
    return (
      saleDate.toDateString() === selectedDate.toDateString()
    );
  });

  const totalCost = filteredSales.reduce(
    (sum, sale) => sum + sale.item.price,
    0
  );

  const handlePrint = () => {
    printReceipt(filteredSales, totalCost, selectedDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sales Summary</Text>

      <Button
        title={`Filter Date: ${selectedDate.toDateString()}`}
        onPress={() => setShowPicker(true)}
      />
      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, date) => {
            setShowPicker(false);
            if (date) setSelectedDate(date);
          }}
        />
      )}

      <FlatList
        data={filteredSales}
        keyExtractor={(item, index) => `${item.item.qrCode}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.item.name}</Text>
            <Text>Price: KES {item.item.price}</Text>
            <Text>Time: {new Date(item.timestamp).toLocaleTimeString()}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No sales found for this date.</Text>}
      />

      <Text style={styles.total}>Total: KES {totalCost}</Text>

      <Button title="Print Summary" onPress={handlePrint} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  item: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#e6e6e6',
    borderRadius: 8,
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  total: { fontSize: 20, fontWeight: 'bold', marginTop: 16 },
});

export default SalesSummaryScreen;
