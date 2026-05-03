# Vercel Dashboard Quick Navigation

## Your Project URL
https://vercel.com/dashboard/assignment-8-six

## To Add Environment Variables:

1. **Open Vercel Dashboard**
   - Go to: https://vercel.com/dashboard

2. **Select Your Project**
   - Find and click: **assignment-8-six**

3. **Go to Settings**
   - Top menu: click **Settings** tab

4. **Find Environment Variables**
   - Left sidebar menu
   - Click: **Environment Variables**

5. **Add Each Variable**
   - Click: "Add New Variable" button
   - Enter Name and Value
   - Click: "Add" or "Save"

## The Three Variables You Need

| # | Name | Value |
|---|------|-------|
| 1 | `BETTER_AUTH_SECRET` | `your-secret-123` |
| 2 | `BETTER_AUTH_URL` | `https://assignment-8-six.vercel.app` |
| 3 | `NEXT_PUBLIC_BETTER_AUTH_URL` | `https://assignment-8-six.vercel.app` |

## After Adding Variables

1. Go to: **Deployments** tab
2. Find your latest deployment
3. Click the **...** menu button
4. Select: **Redeploy**
5. Wait for deployment to complete (2-3 minutes)
6. Test: https://assignment-8-six.vercel.app/register

## If You Need to See Deployment Logs

1. Go to: **Deployments** tab
2. Click on a deployment
3. Scroll down to see **Build Logs**
4. Or click **Runtime Logs** to see live errors

---

**That's it!** Once redeployed, register/login should work without "Invalid origin" error.
