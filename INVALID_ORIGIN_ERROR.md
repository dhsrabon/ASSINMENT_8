# Understanding "Invalid origin" Error

## What Does It Mean?

When you see **"Invalid origin"** on your register page, it means:

The auth server received a request from a domain it doesn't recognize.

## Why Does It Happen?

1. **Missing BETTER_AUTH_SECRET** (most common)
   - Auth can't initialize properly without a secret
   - Fix: Set BETTER_AUTH_SECRET in Vercel env vars

2. **BETTER_AUTH_URL not set correctly**
   - Auth server doesn't know what domain to expect
   - Fix: Set BETTER_AUTH_URL = https://assignment-8-six.vercel.app

3. **Domain mismatch**
   - Request comes from different domain than configured
   - Example: Requesting from `https://assignment-8-six.vercel.app` but BETTER_AUTH_URL is set to `https://other-domain.com`

## How to Fix

### Step 1: Verify Environment Variables are Set

Go to: https://vercel.com/dashboard

1. Click: **assignment-8-six** project
2. Click: **Settings** (top nav)
3. Click: **Environment Variables** (left menu)
4. Check these are present:
   - ✅ BETTER_AUTH_SECRET (not empty)
   - ✅ BETTER_AUTH_URL = https://assignment-8-six.vercel.app
   - ✅ NEXT_PUBLIC_BETTER_AUTH_URL = https://assignment-8-six.vercel.app

### Step 2: Redeploy Your Project

1. Click: **Deployments** (top nav)
2. Find your latest deployment
3. Click: **...** (three dots menu)
4. Click: **Redeploy**
5. Wait 2-3 minutes for build to complete

### Step 3: Test Again

Visit: https://assignment-8-six.vercel.app/register

Try to register. Should work now!

## If Still Not Working

### Check the Logs

1. Go to: https://vercel.com/dashboard
2. Click: **assignment-8-six**
3. Click: **Deployments**
4. Click your latest deployment
5. Look for error messages in the logs

### Common Issues

**Issue**: BETTER_AUTH_SECRET shows as empty/not set
- **Fix**: Add it again. Make sure you click "Add" button

**Issue**: URL has `http://` instead of `https://`
- **Fix**: Change to `https://assignment-8-six.vercel.app`

**Issue**: URL is missing `https://`
- **Fix**: Add the full URL including `https://`

**Issue**: After setting env vars, still getting error
- **Fix**: You MUST redeploy. Environment variables don't take effect without a redeploy

## Technical Details (Optional)

- `BETTER_AUTH_SECRET`: Encryption key for auth tokens
- `BETTER_AUTH_URL`: Base URL for auth API (must match your domain)
- `NEXT_PUBLIC_BETTER_AUTH_URL`: Client-side auth URL (should match BETTER_AUTH_URL)
- Origin validation: Auth server checks that requests come from trusted domains
- Trusted domains: localhost, your Vercel domain, Vercel preview URLs

## Quick Checklist Before Registering

- [ ] Is BETTER_AUTH_SECRET set? (any value, doesn't matter what)
- [ ] Is BETTER_AUTH_URL set to `https://assignment-8-six.vercel.app`?
- [ ] Have you redeployed after setting env vars?
- [ ] Are you visiting `https://` (not `http://`)?
- [ ] Did the deployment complete successfully?

If all above are ✅, registration should work!
