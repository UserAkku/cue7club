# Cue7Club Environment Setup Guide

To run Cue7Club locally or in production, you need to configure several third-party services. This guide explains how to get the keys for your `.env` file.

## 1. Database (Neon & Prisma)
1. Go to [Neon.tech](https://neon.tech) and create a project.
2. Get the connection string for your database.
3. Set both `DATABASE_URL` and `DIRECT_URL` to this connection string in your `.env`.
4. Run `npx prisma db push` and `npx prisma db seed` to initialize.

## 2. NextAuth & Google OAuth
1. Run `openssl rand -base64 32` in your terminal. Copy the output to `NEXTAUTH_SECRET`.
2. Go to [Google Cloud Console](https://console.cloud.google.com/).
3. Create a project -> APIs & Services -> Credentials.
4. Create an OAuth client ID (Web application).
5. Add Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google` (and your production URL).
6. Copy the Client ID and Client Secret to `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.

## 3. Brevo (Email & OTP)
1. Sign up for a free account at [Brevo](https://www.brevo.com/).
2. Go to your Profile -> SMTP & API -> API Keys.
3. Generate a new API key.
4. Set it as `BREVO_API_KEY`.

## 4. Razorpay (Payments)
1. Sign up at [Razorpay](https://razorpay.com/).
2. In the dashboard, go to Settings -> API Keys.
3. Generate Test Keys.
4. Set `RAZORPAY_KEY_ID` and `NEXT_PUBLIC_RAZORPAY_KEY_ID` to the Key ID.
5. Set `RAZORPAY_KEY_SECRET` to the Key Secret.

## 5. Pusher (Live Tracking)
1. Sign up at [Pusher](https://pusher.com/).
2. Create a Channels app.
3. In the App Keys section, copy your credentials.
4. Set `PUSHER_APP_ID`, `PUSHER_SECRET`, `NEXT_PUBLIC_PUSHER_KEY`, and `NEXT_PUBLIC_PUSHER_CLUSTER` accordingly.

---
Once your `.env` is populated, run `npm run dev` to start the app!
