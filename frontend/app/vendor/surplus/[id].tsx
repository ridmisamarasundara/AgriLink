import React from "react";
import { useLocalSearchParams } from "expo-router";
import ProductDetailsCard from "../../../components/products/ProductDetailsCard";

export default function VendorSurplusProductDetailsOne() {
  const { id, name, unitPrice, bestBefore, description, image } = useLocalSearchParams();

  // If no params, fallback to mock data
  const mockSurplus = {
    id: "s1",
    name: "Surplus Tomatoes",
    image: "https://images2.alphacoders.com/110/1106600.jpg",
    vendor: "Organic Veg Master",
    unitPrice: 80,
    bestBefore: "Best within 3 days",
    description: "Surplus organic tomatoes",
  };

  const product = {
    id: id as string,
    name: (name as string) ?? mockSurplus.name,
    image: (image as string) ?? mockSurplus.image,
    vendor: mockSurplus.vendor,
    unitPrice: Number(unitPrice ?? mockSurplus.unitPrice),
    bestBefore: (bestBefore as string) ?? mockSurplus.bestBefore,
    description: (description as string) ?? mockSurplus.description,
  };

  return <ProductDetailsCard product={product} role="vendor" surplus={true} />;
}
