import React from "react";
import { useLocalSearchParams } from "expo-router";
import ProductDetailsCard from "../../../components/products/ProductDetailsCard";

const mockProduct = {
  id: "1",
  name: "Tomatoes",
  image: "https://images2.alphacoders.com/110/1106600.jpg",
  vendor: "Organic Veg Master",
  unitPrice: 100,
  bestBefore: "Best within 7 days",
  description: "Enjoy the rich taste of fresh, chemical-free organic tomatoes grown with care at Organic Veg Master Farm. Our tomatoes are cultivated using natural farming methods, ensuring pure flavor, vibrant color, and maximum nutrition. Handpicked at peak ripeness, they’re perfect for salads, curries, sauces, and everyday cooking.Experience farm-to-table freshness with every bite. Healthy, juicy, and 100% organic—straight from our fields to your home.",
  };

export default function BuyerProductDetailsOne() {
  const { id } = useLocalSearchParams();

  // Normally, fetch product by id
  return <ProductDetailsCard product={{ ...mockProduct, id: id as string }} role="buyer" />;
}
