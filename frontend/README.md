# AgriLink App 🌱

AgriLink is a React Native Expo application for buying and selling fresh produce.  
It provides **buyer and vendor interfaces** with separate pages for viewing, editing, and purchasing products.


---
## Table of Contents
- [Features](#features)
- [Screens](#screens)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [License](#license)


---

## Features

### Buyer
- View all vendors for a specific product.
- Navigate to a single vendor’s product details page.
- Check product image, description, price, and quantity.
- Add products to cart.
- Tap to view zoomed product images.

### Vendor
- Edit product details for a single product.
- Edit multiple product listings in the “all products” view.
- Update price, description, best before date, and image.
- Changes reflect in buyer views (when connected to backend).

---

## Screens

### Buyer Screens (`app/buyer/pages`)
1. **ProductDetailsAll.tsx**: Shows all vendors for a selected product.  
   - Click on a vendor to view detailed product info.

2. **ProductDetailsOne.tsx**: Shows detailed product info from a single vendor.  
   - Image, description, quantity selector, total price, and add-to-cart.

### Vendor Screens (`app/vendor/pages`)
1. **EditProductDetailsAll.tsx**: Edit multiple product listings for the vendor.  
   - Edit product name, vendor name, and save changes.

2. **EditProductDetailsOne.tsx**: Edit a single product in detail.  
   - Edit all fields including image URL, description, unit price, and best before date.

---



## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd your-project-folder


2. Install dependancies:
npm install

3.Start Expo:
npx expo start

4.Running the app:

Navigate through the buyer pages to see all vendors and product details.

Navigate through the vendor pages to edit product details.

Image modals can be tapped to view full-size images.

5. project Structure

agrilink/
└─ frontend/
   ├─ app/
   │  ├─ buyer/
   │  │  └─ pages/
   │  │     ├─ ProductDetailsAll.tsx
   │  │     └─ ProductDetailsOne.tsx
   |  |     |_SurplusProductDetailsAll.tsx
   |  |     |_SurplusProductDetailsOne.tsx
   │  ├─ vendor/
   │  │  └─ pages/
   │  │     ├─ ProductDetailsAll.tsx
   │  │     └─ ProductDetailsOne.tsx
   |  |     |_SurplusProductDetailsAll.tsx
   |  |     |_SurplusProductDetailsOne.tsx
   │  │     ├─ EditProductDetailsAll.tsx
   │  │     └─ EditProductDetailsOne.tsx
   |  |     |_EditSurplusProductDetailsAll.tsx
   |  |     |_EditSurplusProductDetailsOne.tsx
   ├─ assets/
   ├─ node_modules/
   ├─ package.json
   └─ README.md


6.Technologies Used

React Native (Expo)

TypeScript

React Navigation / Expo Router

State Management: React Hooks (useState, useContext optional)

Styling: React Native StyleSheet

7.Notes

Image zoom modal uses React Native Modal; no extra dependencies required.

You can extend the project to connect with a backend (e.g., Firebase, Node.js + MongoDB) for real-time product updates.

Buyers and vendors have separate pages; buyers can only view, vendors can edit.

install packages: 