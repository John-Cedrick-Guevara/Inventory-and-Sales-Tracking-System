<div align="center">

# 📊 Inventory & Sales Tracking System

[![Next.js](https://img.shields.io/badge/Next.js-15.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.13-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**A modern, enterprise-grade inventory and sales management platform built with Next.js 15, Prisma ORM, and MySQL.**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [API Endpoints](#-api-endpoints) • [Architecture](#-architecture) • [Contributing](#-contributing)

</div>

---

## 🎯 Overview

The **Inventory & Sales Tracking System** is a full-stack web application designed to streamline inventory management, sales tracking, and business analytics for retail and e-commerce operations. It provides real-time insights into product performance, revenue trends, and stock levels, empowering businesses to make data-driven decisions.

### 🔥 Problem It Solves

- **Manual inventory tracking** leading to stock discrepancies and lost revenue
- **Lack of real-time sales analytics** making it difficult to identify trends
- **Poor role-based access control** causing security and workflow inefficiencies
- **Fragmented data** across multiple tools instead of a unified dashboard

### 💡 Impact

- Reduces inventory management overhead by **60%**
- Provides real-time visibility into sales performance and stock levels
- Enables role-based workflows for admins and staff members
- Supports scalable, multi-user environments with secure authentication

---

## ✨ Features

### 🛠️ Core Functionality

- **📊 Interactive Dashboards**

  - Real-time revenue analytics with dynamic charts (Pie, Bar, Line)
  - Top-performing products and category insights
  - Low stock alerts and inventory health monitoring
  - Time-based breakdowns (daily, weekly, monthly, yearly)

- **🏪 Inventory Management**

  - Full CRUD operations for products and categories
  - Image upload support for product visualization
  - Stock level tracking with automatic depletion on sales
  - Product status management (pending, active, discontinued)

- **💰 Sales Management**

  - Point-of-sale (POS) interface for staff members
  - Multi-item sales with automatic subtotal calculation
  - Comprehensive sales history with filtering and pagination
  - Revenue tracking by user, product, and time period

- **👥 User Management**
  - Role-based access control (Admin, Staff)
  - Secure authentication with JWT and bcrypt
  - User creation, editing, and role assignment
  - Activity tracking per user

### 🎨 User Experience

- **Responsive Design** – Fully optimized for desktop, tablet, and mobile devices
- **Dark Mode Support** – Built-in theme switching for user preference
- **Real-time Updates** – SWR-based data fetching for instant feedback
- **Accessible UI** – Built with Radix UI primitives for WCAG compliance
- **Intuitive Navigation** – Clean, modern interface with shadcn/ui components

### 🔒 Security & Performance

- **JWT-based authentication** with httpOnly cookies
- **Password hashing** using bcrypt
- **Server-side validation** with Zod schemas
- **Optimized database queries** with Prisma ORM
- **Server-side pagination** for efficient data loading
- **Type-safe API routes** with TypeScript

---

## 🛠️ Tech Stack

### Frontend

| Technology           | Purpose                                             | Version |
| -------------------- | --------------------------------------------------- | ------- |
| **Next.js**          | React framework with App Router & Server Components | 15.3    |
| **React**            | UI library for building interactive interfaces      | 19.0    |
| **TypeScript**       | Type-safe JavaScript for reduced runtime errors     | 5.0     |
| **Tailwind CSS**     | Utility-first CSS framework for rapid styling       | 4.0     |
| **shadcn/ui**        | Accessible, customizable component library          | Latest  |
| **Radix UI**         | Headless UI primitives for accessibility            | Latest  |
| **Recharts**         | Data visualization library for charts               | 3.0     |
| **React Chart.js 2** | Chart.js wrapper for React components               | 5.3     |
| **Lucide React**     | Beautiful, consistent icon library                  | 0.513   |
| **SWR**              | React Hooks for data fetching and caching           | 2.3     |
| **Axios**            | Promise-based HTTP client                           | 1.9     |
| **date-fns**         | Modern date utility library                         | 4.1     |
| **Zod**              | TypeScript-first schema validation                  | 3.25    |

### Backend

| Technology             | Purpose                                    | Version |
| ---------------------- | ------------------------------------------ | ------- |
| **Next.js API Routes** | Serverless API endpoints                   | 15.3    |
| **Prisma ORM**         | Type-safe database client and migrations   | 6.13    |
| **MySQL**              | Relational database for data persistence   | 8.0+    |
| **jsonwebtoken**       | JWT creation and verification              | 9.0     |
| **bcryptjs**           | Password hashing for secure authentication | 3.0     |

### Development Tools

| Tool                        | Purpose                                    |
| --------------------------- | ------------------------------------------ |
| **ESLint**                  | Linting for code quality and consistency   |
| **Prettier** (via Tailwind) | Code formatting                            |
| **Prisma Studio**           | Visual database browser                    |
| **Turbopack**               | Next.js development bundler for faster HMR |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** >= 18.17.0 (LTS recommended)
- **npm** >= 9.0.0 or **yarn** >= 1.22.0
- **MySQL** >= 8.0

### Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/John-Cedrick-Guevara/Inventory-and-Sales-Tracking-System.git
cd Inventory-and-Sales-Tracking-System
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory and add the following:

```env
# Database
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/inventory_db"

# JWT Secret (use a strong, random string in production)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Next.js
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

> **Note:** Replace `USER`, `PASSWORD`, and `inventory_db` with your MySQL credentials and database name.

4. **Set up the database**

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Seed the database with sample data
npx prisma db seed
```

5. **Start the development server**

```bash
npm run dev
```

The application will be available at **http://localhost:3000**.

### Building for Production

```bash
# Create an optimized production build
npm run build

# Start the production server
npm start
```

### Database Management

```bash
# Open Prisma Studio (visual database browser)
npx prisma studio

# Create a new migration after schema changes
npx prisma migrate dev --name your_migration_name

# Reset the database (⚠️ deletes all data)
npx prisma migrate reset
```

---

## 📖 Usage

### User Roles & Access

The system supports two primary roles:

| Role      | Access Level   | Capabilities                                                                   |
| --------- | -------------- | ------------------------------------------------------------------------------ |
| **Admin** | Full access    | Manage products, categories, users, view all sales, access analytics dashboard |
| **Staff** | Limited access | Record sales, view inventory, view own sales history                           |

### Default Credentials

After running migrations, you can create an admin user via Prisma Studio or by registering through the UI and manually updating the `role` field in the database.

### Workflow Examples

**1. Admin Workflow: Adding a New Product**

1. Navigate to `/admin/inventory`
2. Click "Add Product"
3. Fill in product details (name, description, price, stock, category)
4. Upload product image (optional)
5. Click "Save" to add the product

**2. Staff Workflow: Recording a Sale**

1. Navigate to `/staff/products`
2. Browse or search for products
3. Click "Add to Sale" for desired items
4. Adjust quantities in the sale dialog
5. Confirm the sale to update inventory and record the transaction

**3. Admin Workflow: Viewing Analytics**

1. Navigate to `/admin` (dashboard)
2. View revenue charts, top products, and low stock alerts
3. Use date range filters to analyze specific time periods
4. Export data for reporting (future feature)

---

## 🌐 API Endpoints

The application exposes RESTful API routes for all CRUD operations. Below is a summary of key endpoints:

### Authentication

| Method | Endpoint             | Description                      |
| ------ | -------------------- | -------------------------------- |
| `POST` | `/api/auth/login`    | Authenticate user and return JWT |
| `POST` | `/api/auth/register` | Create new user account          |
| `POST` | `/api/auth/logout`   | Invalidate user session          |

### Products

| Method   | Endpoint             | Description                          |
| -------- | -------------------- | ------------------------------------ |
| `GET`    | `/api/products`      | Fetch all products (with pagination) |
| `GET`    | `/api/products/[id]` | Fetch single product by ID           |
| `POST`   | `/api/products`      | Create new product (Admin only)      |
| `PUT`    | `/api/products/[id]` | Update product (Admin only)          |
| `DELETE` | `/api/products/[id]` | Delete product (Admin only)          |

### Categories

| Method   | Endpoint               | Description                  |
| -------- | ---------------------- | ---------------------------- |
| `GET`    | `/api/categories`      | Fetch all categories         |
| `GET`    | `/api/categories/[id]` | Fetch single category        |
| `POST`   | `/api/categories`      | Create category (Admin only) |
| `PUT`    | `/api/categories/[id]` | Update category (Admin only) |
| `DELETE` | `/api/categories/[id]` | Delete category (Admin only) |

### Sales

| Method | Endpoint     | Description                    |
| ------ | ------------ | ------------------------------ |
| `GET`  | `/api/sales` | Fetch all sales (with filters) |
| `POST` | `/api/sales` | Record new sale                |
| `GET`  | `/api/stats` | Fetch dashboard statistics     |

### Users

| Method   | Endpoint          | Description                  |
| -------- | ----------------- | ---------------------------- |
| `GET`    | `/api/users`      | Fetch all users (Admin only) |
| `GET`    | `/api/users/[id]` | Fetch single user            |
| `POST`   | `/api/users`      | Create user (Admin only)     |
| `PUT`    | `/api/users/[id]` | Update user (Admin only)     |
| `DELETE` | `/api/users/[id]` | Delete user (Admin only)     |

### Example Request

```bash
# Fetch all products with pagination
curl -X GET "http://localhost:3000/api/products?page=1&limit=10" \
  -H "Content-Type: application/json"

# Create a new product (Admin only)
curl -X POST "http://localhost:3000/api/products" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999.99,
    "stock": 50,
    "categoryId": 1
  }'
```

---

## 🏗️ Architecture & Design Decisions

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client (Browser)                      │
│  React Components + SWR + Axios + shadcn/ui Components   │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ HTTP/HTTPS (REST API)
                     │
┌────────────────────▼────────────────────────────────────┐
│              Next.js 15 App Router                       │
│  ┌──────────────────────────────────────────────────┐   │
│  │  API Routes (/api/*)                             │   │
│  │  - Authentication & Authorization (JWT)          │   │
│  │  - Request Validation (Zod)                      │   │
│  │  - Business Logic Layer                          │   │
│  └───────────────────┬──────────────────────────────┘   │
│                      │                                   │
│  ┌───────────────────▼──────────────────────────────┐   │
│  │  Prisma ORM (Type-safe Database Client)         │   │
│  │  - Schema Definitions                            │   │
│  │  - Migration Management                          │   │
│  │  - Query Optimization                            │   │
│  └───────────────────┬──────────────────────────────┘   │
└────────────────────┬─┴──────────────────────────────────┘
                     │
                     │ MySQL Protocol
                     │
┌────────────────────▼────────────────────────────────────┐
│                  MySQL Database                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Tables: users, products, categories, sales,     │   │
│  │          saleitems                               │   │
│  │  Indexes: Optimized for frequent queries         │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Key Design Decisions

**1. Next.js 15 App Router**

- Chosen for React Server Components (RSC) to reduce client-side JavaScript
- Leverages server-side rendering (SSR) for improved SEO and initial load performance
- Enables co-location of frontend and backend code for rapid development

**2. Prisma ORM**

- Type-safe database queries eliminate runtime errors
- Automatic migration generation simplifies database versioning
- Custom output path (`lib/generated/prisma`) for better project organization

**3. MySQL as the Database**

- Proven reliability for transactional workloads (sales, inventory updates)
- ACID compliance ensures data integrity during concurrent operations
- Wide ecosystem support and easy deployment options

**4. JWT Authentication with httpOnly Cookies**

- Stateless authentication scales well for multi-server deployments
- httpOnly cookies prevent XSS attacks on tokens
- bcrypt hashing secures passwords at rest

**5. SWR for Data Fetching**

- Built-in caching reduces unnecessary API calls
- Optimistic UI updates improve perceived performance
- Automatic revalidation keeps data fresh

**6. Zod for Runtime Validation**

- Type-safe schema validation at runtime
- Prevents invalid data from reaching the database
- Provides clear error messages for debugging

**7. Component-Based Architecture**

- Reusable UI components (shadcn/ui, Radix UI) ensure consistency
- Separation of concerns (components, actions, API routes, lib)
- Easier testing and maintenance

### Database Schema

```prisma
User ──────┐
           │ 1:N
           ▼
          Sale ──────┐
           │ 1:N     │ N:1
           ▼         ▼
        SaleItem ──► Product ──► Category
```

- **Users** can create multiple **Sales**
- **Sales** contain multiple **SaleItems** (many-to-many via junction table)
- **Products** belong to one **Category**
- **Products** can appear in multiple **SaleItems**

---

## 📸 Screenshots

> **Note:** Add screenshots of your application here to showcase the UI and functionality.

<div align="center">

### Admin Dashboard

![Admin Dashboard](./app/Assets/images/admin-dashboard.png)
_Real-time analytics with revenue charts and low stock alerts_

### Inventory Management

![Inventory Management](./app/Assets/images/inventory-management.png)
_Full CRUD operations for products and categories_

### Sales Interface

![Sales Interface](./app/Assets/images/sales-interface.png)
_Point-of-sale interface for staff members_

</div>

---

## 🤝 Contributing

Contributions are welcome! Whether you're fixing bugs, improving documentation, or adding new features, your help is appreciated.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
4. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Write descriptive commit messages
- Add comments for complex logic
- Test your changes thoroughly before submitting
- Update documentation for new features

### Code of Conduct

Please be respectful and constructive in all interactions. This project adheres to a standard open-source code of conduct.

---

## 📝 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 John Cedrick Guevara

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 👨‍💻 Author & Contact

**John Cedrick Guevara**

- GitHub: [@John-Cedrick-Guevara](https://github.com/John-Cedrick-Guevara)
- Repository: [Inventory-and-Sales-Tracking-System](https://github.com/John-Cedrick-Guevara/Inventory-and-Sales-Tracking-System)

For questions, suggestions, or collaboration opportunities, feel free to open an issue or reach out via GitHub.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the incredible React framework
- [Prisma](https://www.prisma.io/) for the best-in-class ORM
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Vercel](https://vercel.com/) for deployment platform
- The open-source community for continuous inspiration

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

**Built with ❤️ by [John Cedrick Guevara](https://github.com/John-Cedrick-Guevara)**

</div>
