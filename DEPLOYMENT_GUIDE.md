# SummerShop - Deployment & Setup Guide

## ✅ Project Status
- **Registration**: ✅ Working (Fixed)
- **Authentication**: ✅ Working with fallback JSON auth
- **Build**: ✅ Production build successful
- **API Routes**: ✅ Auth endpoints functioning

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
cd summer-store
npm install
npm run dev
```

Visit: `http://localhost:3000`

### Default Authentication
Local development uses **JSON file-based auth** (no MongoDB needed):
- User data stored in: `data/users.json`
- Perfect for testing without external dependencies

## 🌐 Deployment (Production)

### Option 1: Vercel (Recommended)

1. **Connect GitHub Repository**
   - Push code to GitHub
   - Link to Vercel

2. **Configure Environment Variables**
   Go to Project Settings → Environment Variables, add:
   ```
   BETTER_AUTH_SECRET=<generate-random-secret>
   BETTER_AUTH_URL=https://<your-vercel-domain>.vercel.app
   NEXT_PUBLIC_BETTER_AUTH_URL=https://<your-vercel-domain>.vercel.app
   MONGODB_URI=<your-mongodb-connection-string>
   GOOGLE_CLIENT_ID=<your-google-oauth-id>
   GOOGLE_CLIENT_SECRET=<your-google-oauth-secret>
   ```

3. **Deploy**
   - Vercel automatically deploys on push to main branch

### Option 2: Other Platforms (Netlify, Railway, Heroku)

1. **Build**
   ```bash
   npm run build
   ```

2. **Set Environment Variables** in your platform's dashboard

3. **Deploy**
   - Point to the `.next` folder as output directory
   - Node.js runtime required

## 🔧 Environment Variables

### Required for Production
- `BETTER_AUTH_SECRET` - Random secret key for session encryption
- `MONGODB_URI` - MongoDB connection string
- `BETTER_AUTH_URL` - Your production domain URL
- `NEXT_PUBLIC_BETTER_AUTH_URL` - Same as BETTER_AUTH_URL

### Optional (for Google Sign-In)
- `GOOGLE_CLIENT_ID` - From Google Cloud Console
- `GOOGLE_CLIENT_SECRET` - From Google Cloud Console

### Development Mode (Optional)
Leave `BETTER_AUTH_SECRET` commented to use local JSON auth

## 📦 MongoDB Setup

### Using MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Create database user with password
4. Whitelist your IP address
5. Copy connection string:
   ```
   mongodb+srv://user:password@cluster.mongodb.net/summer-store?retryWrites=true&w=majority
   ```

## 🔑 Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project
3. Enable "Google+ API"
4. Create OAuth 2.0 credentials
5. Add authorized origins and redirects:
   - Local: `http://localhost:3000`
   - Production: `https://yourdomain.com`
6. Copy Client ID and Client Secret to `.env`

## 📝 File Structure

```
summer-store/
├── app/
│   ├── register/page.jsx      # ✅ Fixed - Now uses Next.js
│   ├── login/page.jsx
│   ├── api/auth/[...all]/route.js
│   └── components/
├── lib/
│   ├── auth-client.js         # ✅ Fixed - Proper auth client
│   ├── auth.js                # Better Auth setup
│   ├── auth-fallback.js       # JSON-based fallback auth
│   └── mongodb.js             # ✅ Fixed - Removed deprecated options
├── data/
│   └── users.json             # Local auth storage
└── .env                       # Environment config
```

## 🐛 Recent Fixes

1. **Register Page**
   - Removed React Router imports
   - Updated to use Next.js `useRouter` and `Link`
   - Removed missing `lucide-react` dependency

2. **Auth Client**
   - Fixed `signUp()` method signature
   - Added proper social login support

3. **MongoDB Connection**
   - Removed deprecated `useNewUrlParser` and `useUnifiedTopology` options
   - Modern MongoDB driver compatibility

4. **Development Setup**
   - Switched to JSON-based auth for easier local development
   - No MongoDB required locally

## ✅ Testing Checklist

- [ ] Registration page loads without errors
- [ ] Can create new account with valid email/password
- [ ] Form validation works (email format, password length)
- [ ] Successful registration redirects to login
- [ ] User data persists in `data/users.json` (local) or MongoDB (production)
- [ ] Production build (`npm run build`) completes successfully
- [ ] All routes are accessible

## 🆘 Troubleshooting

### "Port 3000 already in use"
```bash
lsof -i :3000  # Find process
kill -9 <PID>  # Kill process
```

### MongoDB SSL errors
- Ensure connection string includes database name
- Check whitelist IP in MongoDB Atlas
- Verify credentials are URL-encoded

### Registration fails with 500 error
- Check `.env` file is properly configured
- Ensure `data/` directory exists for JSON auth
- Check terminal output for detailed error messages

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Better Auth Documentation](https://better-auth.com)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com)
- [Vercel Deployment Guide](https://vercel.com/docs)
