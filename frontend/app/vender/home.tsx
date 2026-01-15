import { Button, Text, View } from "react-native";

export default function VendorHome() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22 }}>Vendor Dashboard</Text>

      <Button title="Add Product" />
      <Button title="Profile" />
      <Button title="Chat List" />
    </View>
  );
}
