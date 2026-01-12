import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const RegisterScreen = ({ navigation }: any) => {
  const [role, setRole] = useState<'buyer' | 'vendor'>('buyer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    // This is where you will eventually call your Backend API
    console.log("Registering:", { name, email, role });
    Alert.alert("Success", `Account created as a ${role}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>AgriLink</Text>
      <Text style={styles.subtitle}>Create your account</Text>

      {/* Role Selector */}
      <View style={styles.roleContainer}>
        <TouchableOpacity 
          style={[styles.roleButton, role === 'buyer' && styles.activeRole]} 
          onPress={() => setRole('buyer')}
        >
          <Text style={[styles.roleText, role === 'buyer' && styles.activeText]}>Buyer</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.roleButton, role === 'vendor' && styles.activeRole]} 
          onPress={() => setRole('vendor')}
        >
          <Text style={[styles.roleText, role === 'vendor' && styles.activeText]}>Vendor/Farmer</Text>
        </TouchableOpacity>
      </View>

      <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

      <TouchableOpacity style={styles.primaryButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 25, justifyContent: 'center', backgroundColor: '#F5F7F8' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#2E7D32', textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 30 },
  roleContainer: { flexDirection: 'row', marginBottom: 20, gap: 10 },
  roleButton: { flex: 1, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#2E7D32', alignItems: 'center' },
  activeRole: { backgroundColor: '#2E7D32' },
  roleText: { color: '#2E7D32', fontWeight: 'bold' },
  activeText: { color: '#FFF' },
  input: { backgroundColor: '#FFF', padding: 15, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#DDD' },
  primaryButton: { backgroundColor: '#2E7D32', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  linkText: { color: '#2E7D32', textAlign: 'center', marginTop: 20, fontWeight: '500' }
});

export default RegisterScreen;