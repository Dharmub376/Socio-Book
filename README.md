
# <img src="https://raw.githubusercontent.com/Dharmub376/Socio-Book/main/public/logo.png" width="30"/> Socio-Book Project

## 🚀 Project Overview
**Socio-Book** is a modern social media application built with React, TypeScript, and Tailwind CSS. It features user authentication, post management, profile customization, and interactive social features.

**Repository**: [https://github.com/Dharmub376/Socio-Book](https://github.com/Dharmub376/Socio-Book)

---

## 🎯 Live Demo
🔗 **Deployed Application**: https://socio-book.vercel.app/ 

## 📦 Packages Used

## Core Dependencies
- **React** (v19.1.1) - Component-based UI library
- **React Router DOM** (v7.9.0) - Client-side routing
- **Zustand** (Not in package.json) - Lightweight state management
- **React Query/TanStack Query** (v5.87.1) - Server state management
- **React Hook Form** (v7.62.0) - Form handling with validation
- **Zod** (v4.1.5) - Schema validation

## UI & Styling
- **Tailwind CSS** (v4.1.13) - Styling solution
- **Lucide React** (v0.542.0) - Icon library

## Development Tools
- **TypeScript** (~5.8.3) - Type safety
- **Vite** (v7.1.2) - Build tool and dev server
- **ESLint/Prettier** - Code formatting

---

## 🏗️ Architecture & Logic

### State Management

```typescript
interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    isLoading: boolean;
}
```


### Routing Structure

- Protected routes for authenticated users only
- Public routes for login/register
- Dynamic routes for profiles and posts

---

## 🔑 Key Features Implementation

### 1. Authentication System

- Protected route components
- Form validation with Zod schemas

### 2. Profile Management

- Form Validaion for profile updates
- Image upload handling for profile picture
- Real-time validation with React Hook Form

### 3. Post System

- Infinite scroll implementation for feed
- Likes/Bookmarks
- Real-time comment updates

### 4. Search & Filtering

- Posts search implementation
- Tag-based filtering system

---

## 🎨 UI/UX Decisions

### Design System

- Consistent color palette and typography
- Mobile-first responsive design

---

## 🚀 Deployment

### Build Process

- Optimized production build with Vite

### Hosting Platform (Vercel)

- Continuous deployment from main branch


## 📁 Project Directory Structure

```
sociobook/
├── 📁 node_modules/          # Dependencies
├── 📁 public/                # Static assets
├── 📁 src/                   # Source code
│   ├── 📁 assets/            # Images, fonts, etc.
│   ├── 📁 components/        # Reusable React components
│   │   ├── AuthContext.tsx   # Authentication context provider
│   │   ├── CreatePost.tsx    # Post creation component
│   │   ├── EditPost.tsx      # Post editing component
│   │   ├── Footer.tsx        # App footer component
│   │   ├── Navbar.tsx        # Navigation bar component
│   │   └── ProtectedRoute.tsx # Route protection wrapper
│   ├── 📁 pages/             # Page components
│   │   ├── Bookmarks.tsx     # Bookmarked posts page
│   │   ├── Error404.tsx      # 404 error page
│   │   ├── Home.tsx          # Home/feed page
│   │   ├── Login.tsx         # Login page
│   │   ├── Post.tsx          # Individual post page
│   │   ├── Profile.tsx       # User profile page
│   │   ├── Register.tsx      # Registration page
│   │   └── Settings.tsx      # User settings page
│   ├── App.css               # Global application styles
│   ├── App.tsx               # Main application component
│   ├── index.css             # Base CSS styles
│   ├── main.tsx              # Application entry point
│   └── vite-env.d.ts         # Vite type definitions
├── .gitignore                # Git ignore rules
├── eslint.config.js          # ESLint configuration
├── index.html                # HTML entry point
├── package-lock.json         # Dependency lock file
└── package.json              # Project dependencies and scripts
```

## 📋 File Descriptions

### 🛠️ Configuration Files
- **`.gitignore`** - Specifies files and directories to exclude from version control
- **`package.json`** - Project metadata, dependencies, and scripts
- **`package-lock.json`** - Exact dependency versions for reproducible builds

### 🎨 Styling
- **`index.css`** - Global CSS styles and Tailwind imports

### 🔐 Authentication
- **`AuthContext.tsx`** - Manages authentication state and provides login/logout functionality
- **`ProtectedRoute.tsx`** - Wrapper component for protecting authenticated routes

### 📄 Pages
- **`Home.tsx`** - Main feed displaying posts
- **`Login.tsx`** & **`Register.tsx`** - Authentication pages
- **`Profile.tsx`** - User profile management
- **`Settings.tsx`** - User preferences and account settings
- **`Bookmarks.tsx`** - Saved posts collection
- **`Post.tsx`** - Individual post view
- **`Error404.tsx`** - 404 error page

### 🧩 Components
- **`Navbar.tsx`** & **`Footer.tsx`** - Layout components
- **`CreatePost.tsx`** & **`EditPost.tsx`** - Post management components

Here’s the entire content in a single `README.md` file format:


# Installation

Follow these steps to set up Socio-Book locally:

1. **Clone the Repository**
```bash
git clone https://github.com/Dharmub376/Socio-Book.git
````

2. **Navigate to the Project Directory**

```bash
cd Socio-Book
```

3. **Install Dependencies**

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

4. **Start the Development Server**

Using npm:

```bash
npm run dev
```

Or using yarn:

```bash
yarn dev
```

5. **Open in Browser**

The application will automatically open in your browser at `http://localhost:5173`. If it doesn't, you can manually navigate to this address.

---