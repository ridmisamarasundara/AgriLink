import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (!email || !password) {
      Alert.alert("Error", "Enter all fields");
      return;
    }

    // Temporary login
    if (email.includes("vendor")) {
      router.push("./vender/home");
    } else {
      router.push("./buyer/home");
    }

    Alert.alert("Success", "Login Successful");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22 }}>AgriLink Login</Text>

      <TextInput
        placeholder="Email"
        style={{ borderWidth: 1, marginVertical: 10 }}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10 }}
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={login} />
      <Button title="Register" onPress={() => router.push("./register")} />
    </View>
  );
}
