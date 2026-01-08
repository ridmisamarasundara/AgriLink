import { Text, TextInput, View } from "react-native";

export default function BuyerHome() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22 }}>Buyer Home</Text>

      <TextInput
        placeholder="Search fruits & vegetables"
        style={{ borderWidth: 1, marginVertical: 10 }}
      />

      <Text>Fresh Items</Text>
      <Text>Surplus Items</Text>
    </View>
  );
}
