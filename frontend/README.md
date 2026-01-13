# AgriLink App 🌱

AgriLink is a **React Native Expo application** developed for buying and selling fresh agricultural produce.  
The app provides **separate buyer and vendor interfaces** with dedicated pages for viewing, editing, and purchasing products.

---

## Table of Contents
- Features
- Screens
- Components
- Installation
- Running the App
- Project Structure
- Technologies Used
- Installed Packages

---

## Features

### Buyer
- View all vendors for a selected product.
- Navigate to a single vendor’s product details page.
- View product image, description, price, and quantity.
- Add products to cart.
- Tap images to view them in full-screen with zoom.

### Vendor
- View detailed product and surplus product information.
- Edit product details including price, description, best before date, and image.
- Updates reflect in buyer views when connected to a backend.

---

## Screens

### Buyer Screens (`app/buyer/pages`)
1. **product/index.tsx** – Displays all vendors for a selected product.  
2. **product/[id].tsx** – Displays detailed product information from a single vendor.  
3. **surplus/index.tsx** – Displays vendors offering surplus products.  
4. **surplus/[id].tsx** – Displays detailed surplus product information.

### Vendor Screens (`app/vendor/pages`)
1. **product/[id].tsx** – Displays vendor product details.  
2. **product/edit/[id].tsx** – Allows editing of product details.  
3. **surplus/[id].tsx** – Displays surplus product details.  
4. **surplus/edit/[id].tsx** – Allows editing of surplus product details.

---

## Components

### `productDetailsCard.tsx`
A reusable component that displays complete product details.  
It supports quantity selection, price calculation, image zoom, role-based actions (buyer/vendor), and navigation.

### `RatingStars.tsx`
A reusable star-based rating component that allows users to rate products from 1 to 5 stars.  
Ratings are stored locally using AsyncStorage and persist across app restarts.

---

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd agrilink
cd frontend
````

2. Install dependencies:

```bash
npm install
```

---

## Running the App

```bash
npx expo start
```

---

agrilink/
└─ backend/
└─ frontend/
   ├─ app/
   │  ├─ buyer/
   │  │  ├─ product/
   │  │  │  ├─ [id].tsx
   │  │  │  └─ index.tsx
   │  │  └─ surplus/
   │  │     ├─ [id].tsx
   │  │     └─ index.tsx
   │  ├─ vendor/
   │  │  ├─ product/
   │  │  │  ├─ [id].tsx
   │  │  │  └─ edit/
   │  │  │     └─ [id].tsx
   │  │  │  └─ add.tsx
   │  │  └─ surplus/
   │  │     ├─ [id].tsx
   │  │     └─ edit/
   │  │        └─ [id].tsx
   ├─ components/
   │  ├─ products/
   │  │  └─ productDetailsCard.tsx
   │  └─ RatingStars.tsx
   ├─ assets/
   ├─ constants/
   ├─ hooks/
   ├─ scripts/
   ├─ services/
   ├─ types/
   │  └─ react-native-image-zoom-viewer.d.ts
   ├─ node_modules/
   ├─ package.json
   ├─ tsconfig.json
   └─ README.md



---

## Technologies Used

* React Native (Expo)
* TypeScript
* Expo Router / React Navigation
* React Hooks (`useState`, `useEffect`)
* React Native StyleSheet

---

## Installed Packages and Purpose

1. **expo-router**
   Used for file-based navigation and role-based routing.

2. **expo-image-picker**
   Used to select product images from the device gallery.

3. **@expo/vector-icons**
   Used to display icons such as stars, home, and profile icons.

4. **@react-native-async-storage/async-storage**
   Used to store ratings and other data locally on the device.

5. **react-native-image-zoom-viewer**
   Used to display full-screen, zoomable product images.

```


