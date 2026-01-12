import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const router = useRouter(); // Initialize the router

  const handleLogin = () => {
    // Basic validation logic
    if (email && password) {
      // In a real app, you'd check if the user is a Vendor or Buyer
      // For now, let's navigate to the Search/Marketplace page
      router.replace('/screens/Search'); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>AgriLink</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} 
      />

      
      {/* ... your inputs ... */}
      <TouchableOpacity onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/screens/Register')}>
        <Text>Don't have an account? Register</Text>
      </TouchableOpacity>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 30, backgroundColor: '#FFF' },
  logo: { fontSize: 36, fontWeight: 'bold', color: '#2E7D32', textAlign: 'center', marginBottom: 40 },
  input: { backgroundColor: '#F1F3F4', padding: 18, borderRadius: 10, marginBottom: 15 },
  loginBtn: { backgroundColor: '#2E7D32', padding: 18, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  footerText: { textAlign: 'center', marginTop: 25, color: '#666' }
});

export default LoginScreen;