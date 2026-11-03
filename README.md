# StudioSpace — Creative Spaces, Without Limits

**StudioSpace** is a peer-to-peer marketplace that connects creative professionals with unique workspaces and production studios. Whether you're a photographer looking for the perfect studio, a filmmaker searching for a production space, or a podcaster needing a professional recording room, StudioSpace makes discovering and booking creative spaces simple.

The platform also gives studio owners an opportunity to showcase their spaces, manage listings, and connect with creators looking for a place to bring their ideas to life.

🔗 **Live Website:** https://assignment-8-studio-space-frontend.vercel.app/

---

## Overview

StudioSpace is designed to make creative workspace rental more accessible, transparent, and convenient. Users can explore available studios, compare pricing, view workspace details, and reserve spaces based on their requirements.

Studio owners can create and manage their listings, while customers can manage their reservations through a personalized dashboard.

The goal is simple: make finding the right creative space easier for everyone.

## Key Features

- **Dynamic Studio Discovery:** Explore a collection of creative spaces with studio categories, pricing, ratings, and location information.
- **Advanced Filtering:** Find suitable workspaces based on categories and search preferences.
- **Studio Management:** Registered users can add, update, and delete their own studio listings.
- **Booking Management:** Reserve workspaces, view booking details, and manage existing reservations.
- **Secure Authentication:** User authentication with Better Auth, including email/password and Google sign-in.
- **Protected Routes:** Restrict private pages and sensitive operations to authenticated users.
- **Ownership Authorization:** Users can only manage their own studio listings and bookings.
- **Booking Conflict Prevention:** Validate existing reservations to prevent overlapping bookings.
- **Responsive Interface:** Optimized layouts for desktop, tablet, and mobile devices.
- **Interactive User Experience:** Custom confirmation dialogs, toast notifications, loading states, and empty states.
- **Theme Customization:** Switch between light and dark appearances.

## Technology Stack

| Category | Technologies |
|---|---|
| Frontend | Next.js, React.js, JavaScript |
| Styling | Tailwind CSS, Shadcn UI |
| Authentication | Better Auth, JWT |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| API Communication | Fetch API, REST API |
| Deployment | Vercel |

## Getting Started

Follow these instructions to run the project locally.

### Prerequisites

Make sure you have installed:

- Node.js (LTS recommended)
- npm
- MongoDB database
- Git

### 1. Clone the Client Repository

```bash
git clone YOUR_CLIENT_REPOSITORY_URL
cd YOUR_CLIENT_PROJECT_FOLDER
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the client project root.

```env
NEXT_PUBLIC_AUTH_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BACKEND_URL=http://localhost:5001

MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=Studio-space

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Use the actual environment variables required by your project. Never commit real credentials or secrets to GitHub.

### 4. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Set Up the Backend

Clone the server repository separately:

```bash
git clone YOUR_SERVER_REPOSITORY_URL
cd YOUR_SERVER_PROJECT_FOLDER
npm install
```

Create a `.env` file in the backend project root:

```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000
```

Start the backend:

```bash
npm start
```

Make sure the frontend and backend environment variables match your local configuration.

## Authentication & Security

StudioSpace uses Better Auth for user authentication and JWT-based verification for protected backend operations.

Security measures include:

- Authenticated access to private routes.
- JWT verification on protected API endpoints.
- Server-side ownership validation before modifying or deleting resources.
- Server-side booking validation.
- Environment-based configuration for sensitive credentials.

## Booking Workflow

1. Explore available creative workspaces.
2. Open a studio to view its details, pricing, and amenities.
3. Select a booking date, starting time, and rental duration.
4. Submit the reservation.
5. Manage your reservation from the My Bookings dashboard.

The backend validates booking requests and checks existing reservations to prevent time conflicts.

## Project Repositories

- **Client Repository:** https://github.com/Saif-nyt/Assignment-8-studio-space-frontend
- **Server Repository:** https://github.com/Saif-nyt/Assignment-8-studio-space-Backend
- **Live Application:** https://assignment-8-studio-space-frontend.vercel.app/

---

## Author

Developed as part of the Programming Hero assignment.

**Project:** B14-A8-Cat_Harry  
**Application:** StudioSpace

*Connecting creative people with the spaces where great ideas happen.*