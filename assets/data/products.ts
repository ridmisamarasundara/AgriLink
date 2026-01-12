export interface Product {
  id: string;
  name: string;
  category: 'Vegetables' | 'Fruits' | 'Grains' | 'Dairy';
  price: number;
  unit: string;
  quantity: number;
  location: string;
  image: string;
  expiryDate: string; // ISO format: YYYY-MM-DD
  vendorName: string;
  description: string;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Organic Red Onions',
    category: 'Vegetables',
    price: 300,
    unit: 'kg',
    quantity: 50,
    location: 'Jaffna',
    image: 'https://images.unsplash.com/photo-1508747703725-719777637510?q=80&w=200&auto=format&fit=crop',
    expiryDate: '2026-01-25',
    vendorName: 'Arul Farmers',
    description: 'Freshly harvested organic red onions from Northern farms.',
  },
  {
    id: '2',
    name: 'Carrots',
    category: 'Vegetables',
    price: 150,
    unit: 'kg',
    quantity: 20,
    location: 'Nuwara Eliya',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=200&auto=format&fit=crop',
    expiryDate: '2026-01-18',
    vendorName: 'Green Highland',
    description: 'Sweet and crunchy highland carrots.',
  },
  {
    id: '3',
    name: 'Ceylon Tea Grains',
    category: 'Grains',
    price: 1200,
    unit: 'kg',
    quantity: 100,
    location: 'Kandy',
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4586d517?q=80&w=200&auto=format&fit=crop',
    expiryDate: '2027-12-01',
    vendorName: 'Mountain Leaf',
    description: 'Premium quality black tea grains.',
  },
  {
    id: '4',
    name: 'King Coconut',
    category: 'Fruits',
    price: 80,
    unit: 'piece',
    quantity: 200,
    location: 'Colombo',
    image: 'https://images.unsplash.com/photo-1521434317072-a1699709d665?q=80&w=200&auto=format&fit=crop',
    expiryDate: '2026-01-20',
    vendorName: 'Island Fresh',
    description: 'Refreshing and natural hydration.',
  },
];