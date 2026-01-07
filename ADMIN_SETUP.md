# Admin Credentials Setup

## Step 1: Create Environment File

Create a file called `.env.local` in your project root (`/Users/abhijat/Downloads/vdcv/`) with these contents:

```env
# Admin credentials - CHANGE THESE TO YOUR OWN!
NEXT_PUBLIC_ADMIN_USER=abhijat_admin
NEXT_PUBLIC_ADMIN_PASS=YourSecurePassword123!
```

## Step 2: Change the Credentials

1. Replace `abhijat_admin` with your preferred username
2. Replace `YourSecurePassword123!` with a strong password

## Step 3: Restart the Dev Server

After creating/editing `.env.local`, restart the development server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Access Your Admin Panel

🔗 **URL:** `http://localhost:3000/observatory-9x7k2m`

This URL is:
- ❌ Not linked from anywhere
- ❌ Not in sitemap
- ❌ Not indexed by search engines
- ✅ Protected by authentication

## Security Features

| Feature | Description |
|---------|-------------|
| 🔐 Lockout | 5 failed attempts = 15 min lockout |
| ⏰ Session timeout | Auto-logout after 30 min inactivity |
| 🚫 No indexing | `noindex, nofollow` meta tags |
| 🔒 Session storage | Cleared on tab close |

## Important Notes

1. **Never commit `.env.local` to git** - it's already in `.gitignore`
2. **Don't share the admin URL** - keep `/observatory-9x7k2m` secret
3. **Use a strong password** - at least 12 characters with mixed case, numbers, and symbols
