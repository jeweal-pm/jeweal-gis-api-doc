# GIS Jewelry POS – API Reference Documentation

A professional, interactive API reference documentation site built with React — modeled after the Orderry API docs style.

## Modules Covered

### ⚙️ Getting Setup
- Login, Language, Organization, Payment Methods, Users, Currency, Tax Rules, Payment Gateway, Voucher Types, SMTP

### 🗂️ Master
- **Item Master**: Item, Size, Collection, Style, eCommerce Category
- **Metal Master**: Metal, Metal Color
- **Stone Master**: Stone Group, Stone, Color, Size, Shape, Cut, Clarity, Setting Type
- **Service Labour**: Create & List services
- **Currency**: Create, Exchange Rate
- **Voucher Type**
- **Sales Person**
- **Vendor**
- **Traceability**

### 💍 Product
- **General Info**: Create, Get, Update
- **Advanced**: Metal, weight, making charges
- **Variant**: Create, Get
- **Choice**: Customization options

### 📦 Inventory
- **Purchase Order**: Create, Approve
- **Stock Transfer**
- **Stock Receive**
- **Stock Take**: Create, Submit
- **Allocation**
- **Reports**: Inventory Summary, SKU Movement

### 🏪 Point of Sale
- **POS Sale**: Create Order, Pay, Park Bill
- **Custom Order**
- **Exchange**
- **Refund**
- **Repair**
- **Reserve**
- **Gift Card**
- **Wishlist**
- **Catalog**
- **Quotation**
- **Appointment**
- **Quickview**

## Setup & Run

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
npm run build
```

## Features
- 🔍 Live search across all endpoints
- 📋 Copy request/response JSON with one click
- 🎨 Color-coded HTTP methods (GET, POST, PUT, DELETE)
- 📁 Collapsible sidebar with subsections
- 📊 Parameter tables with type and required info
- 🌟 Overview page with module summary
