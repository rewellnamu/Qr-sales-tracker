import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ScanScreen from '../screens/ScanScreen';
import SalesSummaryScreen from '../screens/SalesSummaryScreen';
import ItemListScreen from '../screens/ItemListScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Scan" component={ScanScreen} />
      <Stack.Screen name="Sales Summary" component={SalesSummaryScreen} />
      <Stack.Screen name="Item List" component={ItemListScreen} />
    </Stack.Navigator>
  );
}
