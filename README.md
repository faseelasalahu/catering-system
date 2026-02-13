# 🍲 DishDash - Advanced Catering Management System

DishDash is a professional, full-stack catering management web application. It allows customers to browse menus, manage profiles, and place orders, while providing a powerful administrative dashboard for business owners to manage food items and track orders in real-time.

![License](https://img.shields.io)
![React](https://img.shields.io)
![Firebase](https://img.shields.io)
![TailwindCSS](https://img.shields.io)

## 🚀 Live Demo
Check out the live application here: https://catering-system-cf62a.firebaseapp.com/

---

## ✨ Features

### 👤 Customer Side
- **User Authentication:** Secure Signup/Login via [Firebase Auth](https://firebase.google.com).
- **Responsive Menu:** Browse food items by categories (Lunch, Dinner, etc.).
- **Smart Cart:** Persistent shopping cart (remains after refresh).
- **Profile Management:** Users can save addresses and contact info for auto-filled checkouts.
- **Order Tracking:** Real-time status updates (Pending → Preparing → Delivered) using [Firestore Snapshot](https://firebase.google.com).

### 🛠 Admin Side
- **Admin Dashboard:** Statistical overview of total, pending, and delivered orders.
- **Product Management:** CRUD operations to add, edit, or delete food items.
- **Order Control:** Update order statuses live for customers.
- **Protected Routes:** Unauthorized users are blocked from accessing admin areas.

### ⚡ Technical Optimizations
- **Dark Mode:** Seamless theme switching with [Tailwind CSS Dark Mode](https://tailwindcss.com).
- **Performance:** Implemented Lazy Loading, Code Splitting (React.lazy), and Skeleton Screens.
- **CI/CD:** Automated deployment to Firebase Hosting via **GitHub Actions**.

---

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/faseelasalahu
   cd catering-system
