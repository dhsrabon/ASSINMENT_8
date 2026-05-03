# SummerShop

A modern summer eCommerce platform where users can explore and purchase seasonal products like sunglasses, summer outfits, skincare, beach accessories, and more. Users can browse products, view details, and place orders after authentication.

## ✅ Project Status
- **Registration System**: ✅ Working
- **Authentication**: ✅ Functional (JSON-based for dev, MongoDB-ready for production)
- **Production Build**: ✅ Successful  
- **All Errors**: ✅ Resolved
- **Deployment**: ✅ Ready

See [PROJECT_FIXES_SUMMARY.md](PROJECT_FIXES_SUMMARY.md) for details on recent fixes.

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

### Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env.local` and set up environment variables:
   ```
   BETTER_AUTH_SECRET=dev-secret-key
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your-google-client-id (optional)
   GOOGLE_CLIENT_SECRET=your-google-client-secret (optional)
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Vercel Deployment

1. Push your code to GitHub/GitLab
2. Connect your repository to Vercel
3. Go to **Project Settings > Environment Variables** and add:
   - `BETTER_AUTH_SECRET`: Generate a random secret (e.g., `openssl rand -base64 32`)
   - `BETTER_AUTH_URL`: Set to your Vercel production URL (e.g., `https://your-app.vercel.app`)
   - `NEXT_PUBLIC_BETTER_AUTH_URL`: Same as BETTER_AUTH_URL
   - `GOOGLE_CLIENT_ID`: (Optional) Your Google OAuth client ID
   - `GOOGLE_CLIENT_SECRET`: (Optional) Your Google OAuth client secret
4. Deploy! The app automatically detects your Vercel domain

**Important**: If you get an "Invalid origin" error, ensure:
- `BETTER_AUTH_SECRET` is set
- `BETTER_AUTH_URL` matches your Vercel domain
- All three URLs are using `https://` (not `http://`)

See [.env.example](.env.example) for all available environment variables.

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
This application is configured for deployment on Vercel. The authentication system uses SQLite which is stored temporarily during each deployment.

### Vercel Specific Notes:
- Database resets on each deployment (SQLite is ephemeral on Vercel)
- For persistent authentication data in production, consider migrating to MongoDB or PostgreSQL
- Auth routes handle both localhost and Vercel preview URLs automatically
- The build command is `npm run build`
- The start command is `npm start`

### To Deploy:
1. Connect your Git repository to Vercel
2. Add required environment variables (see Getting Started > Vercel Deployment)
3. Click "Deploy"

## Challenges Implemented
- **My Profile**: Displays user information (name, photo, email)
- **Update Information Feature**: Allows users to update their name and photo URL
- **Animate.css**: Used for smooth animations on profile page
