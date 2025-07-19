import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1f1c1cff' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome to QR Sales Tracker</Text>
      <Button title="Scan Item" onPress={() => navigation.navigate('Scan')} />
      <View style={{ height: 10 }} />
      <Button title="View Sales Summary" onPress={() => navigation.navigate('Sales Summary')} />
    </View>
  );
}
