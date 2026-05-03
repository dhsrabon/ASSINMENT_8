# Fix "Invalid origin" on Vercel - Step by Step

Your Vercel domain: **assignment-8-six.vercel.app**

## Quick Fix (5 minutes)

### 1. Go to Vercel Project Settings
- Open: https://vercel.com/dashboard
- Click on your project: **assignment-8-six**
- Click: **Settings** (top navigation)

### 2. Add Environment Variables
Click **Environment Variables** in the left sidebar

#### Add Variable #1: BETTER_AUTH_SECRET
- **Name**: `BETTER_AUTH_SECRET`
- **Value**: `your-secret-key-12345` (any random string)
- Click **Add** button

#### Add Variable #2: BETTER_AUTH_URL
- **Name**: `BETTER_AUTH_URL`
- **Value**: `https://assignment-8-six.vercel.app`
- Click **Add** button

#### Add Variable #3 (Optional but recommended): NEXT_PUBLIC_BETTER_AUTH_URL
- **Name**: `NEXT_PUBLIC_BETTER_AUTH_URL`
- **Value**: `https://assignment-8-six.vercel.app`
- Click **Add** button

### 3. Redeploy
- Click **Deployments** (top navigation)
- Find your latest deployment
- Click the "..." button
- Click **Redeploy**
- Wait for deployment to complete

### 4. Test
- Go to: https://assignment-8-six.vercel.app/register
- Try to register
- It should work now!

## Why This Works

- **BETTER_AUTH_SECRET**: Required for auth to work in production
- **BETTER_AUTH_URL**: Tells auth system what domain to expect requests from
- The app validates that requests come from `https://assignment-8-six.vercel.app`

## If Still Not Working

1. Make sure you've **Redeployed** after adding env vars
2. Check that all URLs use `https://` (not `http://`)
3. Check Vercel **Logs** for any error messages:
   - Deployments > Click latest > Logs (right sidebar)
4. Make sure `BETTER_AUTH_SECRET` is set (most common cause of "Invalid origin")

## Environment Variables Screenshot Guide

```
Environment Variables section should show:
┌─────────────────────────────────────────┐
│ BETTER_AUTH_SECRET │ dev-secret-key     │
│ BETTER_AUTH_URL    │ https://assignment │
│ NEXT_PUBLIC_BETTER │ https://assignment │
└─────────────────────────────────────────┘
```

All three should be visible in your Environment Variables list.
