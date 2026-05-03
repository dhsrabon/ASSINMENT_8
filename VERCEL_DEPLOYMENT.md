# Vercel Deployment Guide

## Step-by-Step Instructions

### Prerequisites
- Your project pushed to GitHub
- A Vercel account (free at https://vercel.com)

### 1. Import Project to Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repository
4. Click "Import"

### 2. Configure Environment Variables

After selecting your repo, you'll see the "Environment Variables" section:

#### Required Variables:

**BETTER_AUTH_SECRET**
- Click "Add"
- Name: `BETTER_AUTH_SECRET`
- Value: Generate a random secret string (e.g., `your-secret-key-123456789`)
- Can use: `openssl rand -base64 32` to generate
- Click "Add"

**BETTER_AUTH_URL**
- Click "Add"  
- Name: `BETTER_AUTH_URL`
- Value: Leave empty OR set to `https://your-domain.vercel.app`
- Note: If left empty, it auto-detects from VERCEL_URL
- Click "Add"

**NEXT_PUBLIC_BETTER_AUTH_URL** (Optional but recommended)
- Click "Add"
- Name: `NEXT_PUBLIC_BETTER_AUTH_URL`  
- Value: Same as BETTER_AUTH_URL
- Click "Add"

#### Optional Variables (for Google OAuth):

**GOOGLE_CLIENT_ID**
- Get from: https://console.cloud.google.com
- Name: `GOOGLE_CLIENT_ID`
- Value: Your Google OAuth Client ID
- Click "Add"

**GOOGLE_CLIENT_SECRET**
- Get from: https://console.cloud.google.com
- Name: `GOOGLE_CLIENT_SECRET`
- Value: Your Google OAuth Client Secret
- Click "Add"

### 3. Deploy

1. Click "Deploy"
2. Wait for the build to complete (usually 1-2 minutes)
3. Once deployed, click "Visit" to open your app

### 4. Test Registration/Login

1. Navigate to your deployed app
2. Try registering with email/password
3. Try logging in
4. If you get "Invalid origin" error, see Troubleshooting below

## Troubleshooting

### "Invalid origin" Error

This means the auth system doesn't recognize the request origin.

**Fix:**
1. Go to Vercel Project Settings > Environment Variables
2. Make sure `BETTER_AUTH_SECRET` is set (very important!)
3. Make sure `BETTER_AUTH_URL` or `NEXT_PUBLIC_BETTER_AUTH_URL` is set to your Vercel domain
4. Format should be: `https://your-app-name.vercel.app` (with `https://`)
5. Redeploy: Click "Deployments" > "..." on the latest > "Redeploy"

### Database/User Data Not Persisting

SQLite database resets on each Vercel deployment. This is expected behavior because:
- Vercel deployments are ephemeral (temporary)
- Each deployment gets a fresh filesystem
- Only the code persists, not the database

**To Fix Persistence:**
- Upgrade the auth backend to use MongoDB or PostgreSQL
- See the [README.md](./README.md) for migration options

### Authentication Not Working at All

1. Check Vercel Deployments for build errors
2. Make sure all environment variables are set
3. Try redeploying with: Deployments > "..." > "Redeploy"

## After Successful Deployment

1. Share your app URL with users
2. Users can now register, login, and use the app
3. Google login works if GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set
4. Profile updates work normally

## Environment Variables Reference

| Variable | Required | Example | Notes |
|----------|----------|---------|-------|
| BETTER_AUTH_SECRET | Yes | abc123xyz | Generate a random string |
| BETTER_AUTH_URL | No* | https://app.vercel.app | Auto-detected if not set |
| NEXT_PUBLIC_BETTER_AUTH_URL | No* | https://app.vercel.app | For client-side usage |
| GOOGLE_CLIENT_ID | No | abc123.apps.googleusercontent.com | Only for Google OAuth |
| GOOGLE_CLIENT_SECRET | No | GOCSPX-xxx | Only for Google OAuth |

*At least one of BETTER_AUTH_URL or NEXT_PUBLIC_BETTER_AUTH_URL should be set

## Additional Help

- Check Vercel Logs: Deployments > Logs (right side)
- Vercel Docs: https://vercel.com/docs
- BetterAuth Docs: https://www.better-auth.com/docs
