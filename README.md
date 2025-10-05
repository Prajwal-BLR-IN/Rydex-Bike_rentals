---

# Rydex Bike Rentals

**Rydex Bike Rentals** is a modern full-stack web application that allows users to browse and rent bikes seamlessly. The platform offers a smooth user experience with real-time state management, optimized images, and interactive UI animations. Admins can manage bike listings and reservations efficiently.

---

## Live Demo

🔗 [Rydex Bike Rentals Demo](https://rydex-bike-rentals.vercel.app/)

---

## Tech Stack

- **Frontend**: React (TypeScript), Zustand (state management), TanStack Query (data fetching/caching), Framer Motion (animations)
- **Backend**: Node.js with Express (TypeScript)
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Image Optimization**: ImageKit
- **Hosting**: Vercel (Frontend), Vercel/Heroku (Backend)
- **Bundler**: Vite

---

## Folder Structure

### Root

```
client/          # Frontend
server/          # Backend
.gitignore
README.md
package.json
tsconfig.json
vercel.json
vite.config.ts
```

### Frontend (`client/`)

```
public/          # Static assets
src/             # React components, hooks, pages, and state management
package.json
tsconfig.app.json
tsconfig.node.json
eslint.config.js
index.html
```

### Backend (`server/`)

```
src/
├── config/       # DB connection & environment setup
├── controllers/  # Route handlers
├── middleware/   # Authentication & error handling
├── models/       # Mongoose schemas
├── routes/       # API routes
├── types/express # Custom TypeScript types for Express
├── utils/        # Utility functions
└── server.ts     # Main server entry point
package.json
tsconfig.json
vercel.json
```

---

## Features

### User Features

- Browse and filter available bikes
- Reserve bikes for specific time slots
- View and manage rental history
- Responsive and interactive UI

### Admin Features

- CRUD operations for bike listings
- Manage user accounts and reservations
- Dashboard to track rentals

---

## Installation & Setup

### Prerequisites

- Node.js ≥ 14
- npm ≥ 6
- MongoDB (local or cloud)
- ImageKit account for image optimization

### Steps

1. Clone the repo:

```bash
git clone https://github.com/Prajwal-BLR-IN/Rydex-Bike_rentals.git
cd Rydex-Bike_rentals
```

2. Install dependencies:

```bash
# Frontend
cd client
npm install
cd ..

# Backend
cd server
npm install
cd ..
```

3. Configure environment variables:

- Create a `.env` file in the `server` directory.
- Add the following variables:

  ```
  PORT=Your_port
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=Your_JWT_secret
  NODE_ENV = "production"
  IMAGEKIT_URL_ENDPOINT=Your_URL_ENDPOINT
  IMAGEKIT_PUBLIC_KEY=Your_Imagekit_public_KEY
  IMAGEKIT_PRIVATE_KEY=Your_IMAGEKIT_PRIVATE_KEY
  ```

  - Create a `.env` file in the `client` directory.
  - Add the following variables:

  ```
  VITE_BASE_URL=Your_backend_URL
  ```

4. Run the application:

```bash
# Backend
cd server
npm run dev
cd ..

# Frontend
cd client
npm run dev
```

Access at: [http://localhost:5173](http://localhost:5173) (Vite default)

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---
