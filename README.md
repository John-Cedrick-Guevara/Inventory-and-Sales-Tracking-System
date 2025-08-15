# 📊 Sales Inventory and Tracker System

A modern, full-featured web application to manage and monitor product inventory, sales data, and revenue performance in real time.

Built with:

- ⚡️ Next.js 14 (App Router)
- 🧠 Prisma + MySQL
- 🎨 Tailwind CSS + shadcn/ui
- 📈 Recharts (interactive charts)

---

## 🚀 Features

✅ **Dashboard Overview**  
Get a clear snapshot of revenue per product, top prodcyst(daily, weekly, monthly), low stock products, and time-based breakdowns (daily, monthly, yearly).

✅ **Sales Management**  
Track, record, and calculate total sales with detailed breakdowns per item.

✅ **Inventory Management**  
Create, update, and delete products and categories. Keep stock levels accurate and up-to-date.

✅ **Role-Based Access**  
Supports multiple user roles (e.g. admin, staff), each with appropriate access to data and features.

✅ **Analytics Charts**  
Visualize performance with dynamic Pie and Bar charts using Recharts.

✅ **Pagination Support**  
Efficiently load and navigate large datasets (products, sales, etc.) using server-side pagination.

---

## 📂 Tech Stack

| Tech         | Purpose                            |
|--------------|-------------------------------------|
| **Next.js**  | Full-stack framework (App Router)   |
| **Prisma**   | ORM for MySQL database              |
| **MySQL**    | Relational database                 |
| **Tailwind** | Utility-first CSS framework         |
| **shadcn/ui**| Modern, accessible UI components    |
| **Recharts** | Data visualization (Bar, Pie, etc.) |

---

## ⚙️ Setup & Installation

bash
# 1. Clone the repo
git clone https://github.com/John-Cedrick-Guevara/Inventory-and-Sales-Tracking-System.git
cd sales-inventory-tracker

# 2. Install dependencies
npm install

# 3. Set environment variables
cp .env.example .env
# Fill in your DATABASE_URL and other keys

# 4. Generate Prisma Client & run migrations
npx prisma generate
npx prisma migrate dev --name init

# 5. Run the dev server
npm run dev
