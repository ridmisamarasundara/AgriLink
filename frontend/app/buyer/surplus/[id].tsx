import React from "react";
import { useLocalSearchParams } from "expo-router";
import ProductDetailsCard from "../../../components/products/ProductDetailsCard";

const mockSurplus = {
  id: "s1",
  name: "Surplus Tomatoes",
  image:  "https://survivemodernlife.files.wordpress.com/2016/09/moldy-tomato.jpg?w=1140",
  vendor: "Organic Veg Master",
  unitPrice: 80,
  bestBefore: "Best within 5 days (Surplus)",
  description:"Selling a batch of overripe/rotten tomatoes from our latest harvest. These aren’t good for cooking anymore, but they’re great for compost, garden use, or animal feed. Available in bulk at a very low price. Perfect if you need organic waste for your plants or farm work. Message me for quantity and pickup details!",
  };


export default function BuyerSurplusProductDetailsOne() {
  const { id } = useLocalSearchParams();
  return <ProductDetailsCard product={{ ...mockSurplus, id: id as string }} role="buyer" />;
}
