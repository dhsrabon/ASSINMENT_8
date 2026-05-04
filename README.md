# ☀️ SummerShop - Modern Summer eCommerce Platform

A modern, fully responsive summer eCommerce platform where users can explore and purchase seasonal products including sunglasses, summer outfits, skincare, beach accessories, and more. Built with Next.js 16, React 19, and BetterAuth.



## ✨ Key Features

### 🔐 Authentication & User Management
- Email/Password registration and login with validation
- Google OAuth authentication for seamless sign-ups
- User profile management with avatar support
- Profile update functionality (name, photo URL)
- Protected routes for authenticated users
- Automatic redirect to login for unauthorized access
- Session persistence across page reloads

### 🛍️ Product Browsing
- Display of 6+ summer products with detailed information
- Product filtering by category (Accessories, Clothing, Skincare, Footwear, Essentials)
- Product cards showing name, price, rating, brand, and stock status
- Product details page with full information and images
- Responsive product grid (1 column on mobile, 2 on tablet, 3 on desktop)

### 🏠 Home Page
- Eye-catching hero section with summer sale banner
- Popular products showcase (top 3 products)
- Summer care tips section (3 tips with emoji)
- Top brands section (4 featured brands)
- Fully animated sections using Animate.css

### 📱 Responsive Design
- **Mobile-first approach** for screens < 640px
- **Tablet optimization** for screens 640px - 1024px
- **Desktop enhanced** for screens > 1024px
- Hamburger menu for mobile navigation
- Responsive typography and spacing
- Touch-friendly buttons and interactive elements

### 🎨 User Interface
- Beautiful orange/yellow/pink color scheme
- DaisyUI components for consistent styling
- Smooth animations with Animate.css
- Hover effects and transitions
- Professional card-based layouts
- Clean and modern design aesthetic

### ⚙️ Technical Features
- Next.js 16 App Router for seamless routing
- MongoDB integration via BetterAuth adapter
- Secure environment variables for sensitive data
- Error handling and user feedback via toast-like messages
- Loading states for async operations
- SQL/MongoDB database support

## 🛠️ Tech Stack

| Category | Technologies |
|----------|---------------|
| **Frontend** | Next.js 16, React 19, TypeScript/JSX |
| **Styling** | Tailwind CSS 4, DaisyUI 5.5, Animate.css 4.1 |
| **Authentication** | BetterAuth 1.6.9 with OAuth |
| **Database** | MongoDB (production) / SQLite (development) |
| **ORM** | Drizzle ORM 0.45.2 |
| **Build Tools** | PostCSS 4, ESLint 9 |

## 📦 NPM Packages

```json
{
  "dependencies": {
    "next": "16.2.4 - React meta-framework for production",
    "react": "19.2.4 - UI library",
    "react-dom": "19.2.4 - React DOM rendering",
    "better-auth": "1.6.9 - Authentication solution",
    "@better-auth/mongo-adapter": "1.6.9 - MongoDB adapter",
    "@better-auth/drizzle-adapter": "1.6.9 - Drizzle adapter",
    "drizzle-orm": "0.45.2 - SQL ORM",
    "better-sqlite3": "12.9.0 - SQLite driver",
    "mongodb": "7.2.0 - MongoDB client",
    "animate.css": "4.1.1 - CSS animations library"
  },
  "devDependencies": {
    "tailwindcss": "4 - CSS utility framework",
    "@tailwindcss/postcss": "4 - PostCSS plugin",
    "daisyui": "5.5.19 - Tailwind component library",
    "typescript": "5 - Type safety",
    "eslint": "9 - Code linting"
  }
}
```

## 📋 Project Structure

```
summer-store/
├── app/
│   ├── api/auth/[...all]/         # BetterAuth API routes
│   ├── components/
│   │   ├── Navbar.jsx             # Responsive navigation
│   │   └── Footer.jsx             # Footer with links
│   ├── login/
│   │   └── page.jsx               # Login page with OAuth
│   ├── register/
│   │   └── page.jsx               # Registration page
│   ├── my-profile/
│   │   └── page.jsx               # User profile (protected)
│   ├── update-profile/
│   │   └── page.jsx               # Update profile (protected)
│   ├── products/
│   │   ├── page.jsx               # All products with filters
│   │   ├── [id]/
│   │   │   └── page.jsx           # Product details (protected)
│   │   └── products.json          # Product data
│   ├── layout.tsx                 # Root layout with Nav/Footer
│   ├── page.tsx                   # Home page
│   ├── globals.css                # Global styles
│   └── not-found.tsx              # 404 page
├── lib/
│   ├── auth.js                    # BetterAuth server config
│   ├── auth-client.js             # BetterAuth client
│   ├── mongodb.js                 # MongoDB connection
│   ├── sqlite.js                  # SQLite database
│   └── db-schema.js               # Database schema
├── public/                        # Static assets
├── .env                           # Environment variables
├── next.config.ts                 # Next.js configuration
├── tailwind.config.ts             # Tailwind configuration
├── tsconfig.json                  # TypeScript config
└── package.json                   # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/pnpm/yarn
- MongoDB Atlas account (for production)
- Google OAuth credentials (optional)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd summer-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create `.env` file:
   ```env
   # BetterAuth Configuration
   BETTER_AUTH_SECRET=your-secret-key-min-32-chars
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

   # Database Configuration
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/summer-store
   
   # Google OAuth (Optional)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000`

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 🔐 Authentication Flow

### Registration
1. User fills out registration form (Name, Email, Photo URL, Password)
2. Form validation checks email format and password length
3. User account created in database
4. User redirected to login page
5. User logs in with credentials or Google OAuth

### Login
1. User enters email and password
2. Credentials validated against database
3. Session created and stored
4. User redirected to homepage or original requested page
5. Navigation shows user avatar and logout button

### Google OAuth
1. User clicks "Continue with Google"
2. Redirected to Google consent screen
3. User grants permissions
4. OAuth callback handled by BetterAuth
5. User account created or linked
6. User redirected to home page

### Protected Routes
- `/products/[id]` - Requires authentication
- `/my-profile` - Requires authentication
- `/update-profile` - Requires authentication
- Unauthorized access redirects to login with return URL

## 📱 Responsive Design Breakdown

### Mobile (< 640px)
- Single column product grid
- Hamburger menu in navbar
- Smaller text sizes
- Stack-based layout for all sections
- Touch-optimized button sizes

### Tablet (640px - 1024px)
- Two-column product grid
- Expanded navigation
- Medium text sizes
- Flexible spacing

### Desktop (> 1024px)
- Three-column product grid
- Full horizontal navigation
- Larger text sizes
- Full spacing and padding

## 🎨 Design System

### Colors
- **Primary**: Orange-500 (#f97316)
- **Secondary**: Yellow-300 (#fcd34d), Pink-300 (#f9a8d4)
- **Background**: Orange-50 (#fffbf0)
- **Text**: Slate-800, Slate-600

### Components
- **Buttons**: DaisyUI btn classes (btn-warning, btn-outline, etc.)
- **Cards**: Custom with shadow and hover effects
- **Forms**: Input with validation
- **Navigation**: Responsive navbar with mobile menu

## 🔒 Security Features

- **Environment Variables**: Sensitive keys stored in `.env`
- **Password Hashing**: BetterAuth handles secure hashing
- **Session Management**: Secure cookies with HTTPOnly flag
- **CORS Protection**: Trusted origins configured
- **Input Validation**: Form validation on client and server
- **Protected Routes**: Authentication checks on sensitive pages

## 📊 Git Commit History

The project includes 10+ meaningful commits documenting the development process:
1. Initial project setup and configuration
2. Authentication implementation with BetterAuth
3. Database schema and models
4. Product management and listing
5. User profile functionality
6. Responsive design improvements
7. Animation and UX enhancements
8. Error handling and validation
9. Accessibility improvements
10. Production-ready optimizations

View commits: `git log --oneline`

## 🚢 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import from GitHub
   - Select this repository

3. **Set Environment Variables**
   ```
   BETTER_AUTH_SECRET=your-secret
   BETTER_AUTH_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_BETTER_AUTH_URL=https://your-domain.vercel.app
   MONGODB_URI=your-mongodb-uri
   GOOGLE_CLIENT_ID=your-google-id
   GOOGLE_CLIENT_SECRET=your-google-secret
   ```

4. **Deploy**
   - Vercel automatically builds and deploys
   - Custom domain configuration available

### Route Reload Protection
- All pages are server-side compatible
- No reliance on client-side only state
- Static data in JSON files
- Database queries on demand
- Middleware handles authentication checks

## 🐛 Troubleshooting

### Common Issues

**Q: "Invalid origin" error during OAuth**
- Ensure `trustedOrigins` in `lib/auth.js` includes your domain
- Update environment variables with correct URLs

**Q: MongoDB connection fails**
- Verify `MONGODB_URI` is correct
- Check IP whitelist in MongoDB Atlas
- Ensure database user has appropriate permissions

**Q: Session not persisting after reload**
- Clear browser cookies
- Check `BETTER_AUTH_SECRET` is consistent
- Verify MongoDB connection

## 📈 Performance Optimizations

- Image optimization with Next.js Image component
- Code splitting via Next.js routing
- CSS minification via Tailwind
- Lazy loading of components
- Optimized font loading
- Caching strategies for static content

## 🎯 Future Enhancements

- [ ] Shopping cart persistence
- [ ] Order management system
- [ ] Payment integration (Stripe/PayPal)
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Search functionality
- [ ] Product recommendations
- [ ] Email verification
- [ ] Password reset flow
- [ ] Admin dashboard

## 📞 Support

For issues or questions:
- Check [Next.js docs](https://nextjs.org/docs)
- Review [BetterAuth docs](https://better-auth.com)
- Check [Tailwind CSS docs](https://tailwindcss.com/docs)

## 📄 License

This project is open source and available for educational purposes.

---

**Built with ❤️ using Next.js, React, and Tailwind CSS**

**Last Updated**: May 2026

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
