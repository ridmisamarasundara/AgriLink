import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";

export default function Register() {
  const router = useRouter();
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    Alert.alert("Success", "Registration Successful");
    router.push("/");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22 }}>Register</Text>

      <TextInput
        placeholder="Role (buyer/vendor)"
        style={{ borderWidth: 1, marginBottom: 10 }}
        onChangeText={setRole}
      />

      <TextInput
        placeholder="Email"
        style={{ borderWidth: 1, marginBottom: 10 }}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10 }}
        onChangeText={setPassword}
      />

      <Button title="Register" onPress={register} />
    </View>
  );
}
