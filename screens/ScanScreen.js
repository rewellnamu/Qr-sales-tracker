import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import items from '../data/items.json'; // adjust the path if needed

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
  setScanned(true);
  const item = items.find(i => i.id === data);

  if (item) {
    const stored = await AsyncStorage.getItem('sales');
    const existing = stored ? JSON.parse(stored) : [];
    const updated = [...existing, item];
    await AsyncStorage.setItem('sales', JSON.stringify(updated));
    Alert.alert("Success", `${item.name} added (KES ${item.price})`);
  } else {
    Alert.alert("Error", "Item not found");
  }

  setTimeout(() => setScanned(false), 2000);
};

  if (hasPermission === null) return <Text>Requesting camera permission...</Text>;
  if (hasPermission === false) return <Text>No access to camera</Text>;

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.overlay}>
        <Text style={styles.instruction}>Scan a QR Code</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center'
  },
  instruction: {
    backgroundColor: '#000000aa',
    color: '#fff',
    fontSize: 18,
    padding: 10,
    borderRadius: 5
  }
});
