# 🚀 Vercel Deployment Guide - SummerShop

Complete step-by-step guide to deploy SummerShop to Vercel.

## Prerequisites

- GitHub account with the project repository
- Vercel account (free at https://vercel.com)
- MongoDB Atlas account (free tier available)
- Google Cloud credentials (for OAuth, optional)

## Step 1: Prepare Your Repository

### 1.1 Push to GitHub
Ensure your project is on GitHub:
```bash
git remote add origin https://github.com/yourusername/summer-store.git
git branch -M main
git push -u origin main
```

### 1.2 Verify .env.example
Make sure `.env.example` is in your repository (it is already).

## Step 2: Set Up MongoDB Atlas (Production Database)

### 2.1 Create MongoDB Cluster
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account or sign in
3. Create a new cluster (M0 tier is free)
4. Wait for cluster to be created (~10 minutes)

### 2.2 Create Database User
1. Go to Database Access
2. Click "Add New Database User"
3. Set username: `betterauthdbuser`
4. Set password: Choose a strong password
5. Click "Add User"

### 2.3 Get Connection String
1. Click "Databases" → "Connect"
2. Choose "Drivers"
3. Select "Node.js" and version "4.0 or later"
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Save this - you'll need it for Vercel

Example format:
```
mongodb+srv://betterauthdbuser:your-password@cluster.mongodb.net/summer-store?retryWrites=true&w=majority
```

### 2.4 Whitelist Vercel IP (Important!)
1. Click "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (or add `0.0.0.0/0`)
4. Confirm

## Step 3: Set Up Google OAuth (Optional)

### 3.1 Create Google Cloud Project
1. Go to https://console.cloud.google.com/
2. Create a new project: "SummerShop"
3. Enable Google+ API:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"

### 3.2 Create OAuth Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Choose "Web application"
4. Set name: "SummerShop Vercel"
5. Add authorized redirect URIs:
   ```
   http://localhost:3000/api/auth/callback/google
   https://your-vercel-domain.vercel.app/api/auth/callback/google
   ```
6. Click "Create"
7. Save Client ID and Client Secret

## Step 4: Deploy to Vercel

### 4.1 Connect GitHub to Vercel
1. Go to https://vercel.com/new
2. Click "Continue with GitHub"
3. Authorize Vercel to access your GitHub
4. Select your repository: `summer-store`
5. Click "Import"

### 4.2 Configure Environment Variables
1. In "Environment Variables" section, add:

```
BETTER_AUTH_SECRET=<generate-random-32-chars>
MONGODB_URI=<your-mongodb-connection-string>
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
```

**How to generate BETTER_AUTH_SECRET:**
```bash
# Option 1: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Option 2: Online generator
# https://www.random.org/bytes/ (copy 32 hex chars)
```

### 4.3 Set Project Settings
- **Project Name**: `summer-store` (or your preferred name)
- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Root Directory**: `./` (or leave empty)

### 4.4 Deploy
Click "Deploy" and wait for deployment to complete (~3-5 minutes).

Your deployment URL will be shown:
```
https://your-project-name.vercel.app
```

## Step 5: Update Environment Variables (Post-Deployment)

### 5.1 Add Vercel Domain to Auth
1. Go to Vercel dashboard
2. Note your deployment URL
3. Go to Project Settings → Environment Variables
4. Update `BETTER_AUTH_URL` and `NEXT_PUBLIC_BETTER_AUTH_URL`:
   ```
   BETTER_AUTH_URL=https://your-project-name.vercel.app
   NEXT_PUBLIC_BETTER_AUTH_URL=https://your-project-name.vercel.app
   ```
5. Redeploy by going to "Deployments" → Click latest → "Redeploy"

### 5.2 Update Google OAuth
1. Go to Google Cloud Console
2. Update OAuth credentials with your Vercel URL:
   ```
   https://your-project-name.vercel.app/api/auth/callback/google
   ```

## Step 6: Test Your Deployment

### 6.1 Basic Tests
- [ ] Website loads without errors
- [ ] Navigation works (Home, Products, My Profile)
- [ ] Can register a new account
- [ ] Can login with email/password
- [ ] Can logout
- [ ] Google login works (if configured)
- [ ] Product details page loads
- [ ] Profile update works

### 6.2 Route Reload Tests
- [ ] Reload home page (`/`) - no errors
- [ ] Reload products page (`/products`) - no errors
- [ ] Reload product details (`/products/1`) - redirects to login if not authenticated
- [ ] Reload profile (`/my-profile`) - redirects to login if not authenticated
- [ ] Reload update profile (`/update-profile`) - redirects to login if not authenticated

### 6.3 Authentication Flow Tests
1. Log out (if logged in)
2. Go to `/products/1` directly
3. Should redirect to `/login?redirect=/products/1`
4. Register or login
5. Should redirect back to `/products/1`

## Troubleshooting

### Issue: "Invalid origin" error during Google OAuth
**Solution:**
- Go to Vercel → Project Settings → Environment Variables
- Check `BETTER_AUTH_URL` matches your Vercel domain
- Go to Google Cloud Console and verify OAuth credentials include your domain
- Redeploy the project

### Issue: Database connection fails
**Solution:**
- Verify MongoDB connection string in Vercel environment variables
- Check MongoDB IP whitelist (should allow `0.0.0.0/0`)
- Verify database user credentials
- Test connection locally first

### Issue: Pages show 404 after redeployment
**Solution:**
- This is normal, Next.js needs to regenerate static pages
- Clear browser cache (Ctrl+Shift+Delete)
- Wait a few minutes for Vercel CDN to update

### Issue: Animations not showing on production
**Solution:**
- Verify `animate.css` is in package.json dependencies
- Check that global CSS is importing animations
- Try hard refresh in browser (Ctrl+Shift+R)

## Monitoring and Maintenance

### 6.1 Set Up Error Tracking (Optional)
```bash
npm install @sentry/nextjs
```
Then configure Sentry in your Vercel project.

### 6.2 Monitor Performance
1. Go to Vercel Analytics
2. Monitor:
   - Page load times
   - Core Web Vitals
   - Error rates

### 6.3 Update Dependencies
```bash
npm update
npm audit fix
npm run build
git commit -am "update: upgrade dependencies"
git push
```
Vercel will auto-redeploy on push to main.

## Custom Domain (Optional)

### 6.1 Add Custom Domain
1. Go to Vercel → Project Settings → Domains
2. Enter your domain name
3. Follow DNS configuration instructions
4. Wait 24-48 hours for DNS propagation

### 6.2 Update Auth URLs
- Update `BETTER_AUTH_URL` to use custom domain
- Update Google OAuth with custom domain
- Redeploy project

## Performance Tips

1. **Enable Image Optimization**: Vercel does this automatically
2. **Use Serverless Functions**: Already configured in Next.js
3. **Enable Analytics**: Vercel → Settings → Web Analytics
4. **Set up Caching**: Configure in `next.config.ts`
5. **Monitor Build Time**: Keep dependencies updated

## Security Checklist

- [ ] `BETTER_AUTH_SECRET` is secure and >32 characters
- [ ] Database credentials are not in repository
- [ ] Environment variables are configured in Vercel
- [ ] MongoDB IP whitelist includes Vercel servers
- [ ] Google OAuth secrets are not exposed
- [ ] HTTPS is enabled (automatic on Vercel)
- [ ] CORS is properly configured
- [ ] Rate limiting is enabled (if using API routes)

## Rollback Deployment

If something goes wrong:
1. Go to Vercel Deployments
2. Find previous working deployment
3. Click "..."  → "Redeploy"
4. Confirm redeploy

## Additional Resources

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [MongoDB Atlas](https://docs.atlas.mongodb.com/)
- [BetterAuth Docs](https://better-auth.com/docs)

## Support

For issues:
1. Check Vercel Deployment Logs: Vercel → Deployments → Click deployment → Logs
2. Check Vercel Function Logs
3. Check browser console for errors
4. Check GitHub Issues
5. Contact Vercel support

---

**Happy Deploying! 🚀**

Need help? Check the main README.md or create an issue on GitHub.
