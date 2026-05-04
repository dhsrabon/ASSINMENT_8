# ☀️ SummerShop - Modern Summer eCommerce Platform

A modern, fully responsive summer eCommerce platform where users can explore and purchase seasonal products including sunglasses, summer outfits, skincare, beach accessories, and more. Built with Next.js 16, React 19, and BetterAuth.




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
- 
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

|
## 📦 NPM Packages



##

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




## 🔒 Security Features

#


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


**Q: Session not persisting after reload**
- Clear browser cookies
- Check `BETTER_AUTH_SECRET` is consistent
- Verify MongoDB connection

r static content


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
