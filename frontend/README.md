
# AgriLink App 🌱

AgriLink is a **React Native Expo application** designed to connect buyers and vendors of fresh agricultural produce.  
The app provides **separate buyer and vendor interfaces**, enabling users to browse products, view vendor details, manage listings, and purchase produce efficiently.

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
- View all vendors offering a selected product.
- Navigate to a single vendor’s product details page.
- View product image, description, price, and available quantity.
- Add products to cart.
- Tap product images to view them in full-screen with zoom support.

### Vendor
- View detailed product and surplus product information.
- Edit product details such as price, description, best-before date, and image.
- Manage surplus products separately.
- Changes reflect in buyer views when connected to a backend.

---

## Screens

### Buyer Screens (`app/buyer`)
1. **product/index.tsx** – Displays all vendors offering a selected product.  
2. **product/[id].tsx** – Displays detailed product information from a single vendor.  
3. **surplus/index.tsx** – Displays vendors offering surplus products.  
4. **surplus/[id].tsx** – Displays detailed surplus product information.

### Vendor Screens (`app/vendor`)
1. **product/[id].tsx** – Displays vendor product details.  
2. **product/edit/[id].tsx** – Allows editing of product details.  
3. **product/add.tsx** – Allows vendors to add new products.  
4. **surplus/[id].tsx** – Displays surplus product details.  
5. **surplus/edit/[id].tsx** – Allows editing of surplus product details.

---

## Components

### `productDetailsCard.tsx`
A reusable component used across buyer and vendor screens to display complete product details.  
Features include:
- Quantity selection
- Dynamic price calculation
- Image zoom support
- Role-based actions (buyer/vendor)
- Navigation handling

### `RatingStars.tsx`
A reusable star-based rating component that allows users to rate products from **1 to 5 stars**.  
Ratings are stored locally using **AsyncStorage** and persist across app restarts.

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

## Project Structure

```
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
```

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

---
