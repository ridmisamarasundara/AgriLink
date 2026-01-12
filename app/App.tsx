import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

// Import your screens
import AddProductScreen from '../app/screens/AddProduct';
import BuyerCart from '../app/screens/BuyerCart';
import LoginScreen from '../app/screens/Login';
import RegisterScreen from '../app/screens/Register';
import SearchScreen from '../app/screens/Search';
import VendorOrders from '../app/screens/VendorOrders';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="BuyerHome" component={SearchScreen} options={{ title: 'Marketplace' }} />
        <Stack.Screen name="VendorHome" component={AddProductScreen} options={{ title: 'Add Product' }} />
        <Stack.Screen name="Cart" component={BuyerCart} />
        <Stack.Screen name="Orders" component={VendorOrders} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}