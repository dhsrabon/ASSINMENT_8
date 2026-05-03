# SummerShop

A modern summer eCommerce platform where users can explore and purchase seasonal products like sunglasses, summer outfits, skincare, beach accessories, and more. Users can browse products, view details, and place orders after authentication.

## Live URL
[https://summer-shop.vercel.app](https://summer-shop.vercel.app) (Replace with actual deployed URL)

## Key Features
- User authentication with BetterAuth (Email/Password and Google OAuth)
- Product browsing and detailed views
- Protected routes for authenticated users
- User profile management and updates
- Responsive design for mobile, tablet, and desktop
- Summer-themed UI with animations

## Tech Stack
- **Frontend**: Next.js 16, React 19, Tailwind CSS, DaisyUI
- **Authentication**: BetterAuth
- **Database**: SQLite (via Drizzle ORM)
- **Animations**: Animate.css

## NPM Packages Used
- `next`: React framework for production
- `react`: UI library
- `react-dom`: React DOM rendering
- `better-auth`: Authentication library
- `@better-auth/drizzle-adapter`: Database adapter for BetterAuth
- `drizzle-orm`: ORM for database operations
- `better-sqlite3`: SQLite database driver
- `tailwindcss`: Utility-first CSS framework
- `daisyui`: Component library for Tailwind CSS
- `animate.css`: CSS animation library

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env`:
   ```
   BETTER_AUTH_SECRET=your-secret-key
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure
```
app/
├── api/auth/[...all]/route.js    # BetterAuth API routes
├── components/
│   ├── Navbar.jsx                # Navigation component
│   └── Footer.jsx                # Footer component
├── login/page.jsx                # Login page
├── register/page.jsx             # Registration page
├── my-profile/page.jsx           # User profile page
├── update-profile/page.jsx       # Profile update page
├── products/
│   ├── page.jsx                  # Products listing
│   └── [id]/page.jsx             # Product details
├── products.json                 # Product data
├── layout.tsx                    # Root layout
└── page.tsx                      # Home page
lib/
├── auth.js                       # BetterAuth configuration
├── auth-client.js                # BetterAuth client
└── db-schema.js                  # Database schema
```

## Deployment
This application is configured for deployment on Vercel or Render. Ensure that:
- Environment variables are set in the deployment platform
- The build command is `npm run build`
- The start command is `npm start`
- For SPA routing, configure the platform to serve `index.html` for all routes

## Challenges Implemented
- **My Profile**: Displays user information (name, photo, email)
- **Update Information Feature**: Allows users to update their name and photo URL
- **Animate.css**: Used for smooth animations on profile page
