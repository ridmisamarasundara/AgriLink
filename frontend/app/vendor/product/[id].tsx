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
  description:
    "Enjoy the rich taste of fresh, chemical-free organic tomatoes grown with care at Organic Veg Master Farm.",
};

export default function VendorProductDetailsOne() {
  const params = useLocalSearchParams();

  const product = {
    id: params.id as string,
    name: (params.name as string) ?? mockProduct.name,
    image: (params.image as string) ?? mockProduct.image,
    vendor: mockProduct.vendor,
    unitPrice: Number(params.unitPrice ?? mockProduct.unitPrice),
    bestBefore: (params.bestBefore as string) ?? mockProduct.bestBefore,
    description: (params.description as string) ?? mockProduct.description,
  };

  return <ProductDetailsCard product={product} role="vendor" />;
}
