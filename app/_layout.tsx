import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#2E7D32' }, // AgriLink Green
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      {/* These names match your file names in app/screens/ */}
      <Stack.Screen name="index" options={{ headerShown: false }} /> 
      <Stack.Screen name="screens/Login" options={{ title: 'Login' }} />
      <Stack.Screen name="screens/Register" options={{ title: 'Create Account' }} />
      <Stack.Screen name="screens/Search" options={{ title: 'Marketplace' }} />
      <Stack.Screen name="screens/AddProduct" options={{ title: 'Add New Produce' }} />
    </Stack>
  );
}