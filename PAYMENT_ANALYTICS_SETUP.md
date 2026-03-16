# Payment & Analytics Setup Guide

This guide covers the setup for Stripe payments and Google Analytics 4 on AeroWholesale.

## Table of Contents
1. [Stripe Setup](#stripe-setup)
2. [Google Analytics 4 Setup](#google-analytics-4-setup)
3. [Environment Variables](#environment-variables)
4. [Deployment](#deployment)
5. [Testing](#testing)

## Stripe Setup

### 1. Create a Stripe Account
- Go to https://dashboard.stripe.com
- Sign up or log in
- Complete company verification

### 2. Get API Keys
- Navigate to **Developers** → **API Keys**
- Copy your **Secret Key** (starts with `sk_live_` or `sk_test_`)
- Copy your **Publishable Key** (starts with `pk_live_` or `pk_test_`)
- Store these securely in your environment variables

### 3. Create Webhook Endpoint
- Go to **Developers** → **Webhooks**
- Click **Add endpoint**
- Enter URL: `https://aerowholesale.com/api/stripe-webhook`
- Select events to listen for:
  - `checkout.session.completed`
  - `payment_intent.succeeded`
- Copy the **Signing Secret** (starts with `whsec_`)

### 4. Add to Vercel Environment
In your Vercel project settings:
```
STRIPE_SECRET_KEY = sk_live_...
STRIPE_WEBHOOK_SECRET = whsec_...
VITE_STRIPE_PUBLIC_KEY = pk_live_...
```

## Google Analytics 4 Setup

### 1. Create a Google Analytics Property
- Go to https://analytics.google.com
- Create a new property for AeroWholesale
- Set up data stream for your web domain
- Copy the **Measurement ID** (looks like `G-XXXXXXXXXX`)

### 2. Add to Vercel Environment
```
VITE_GA4_ID = G-XXXXXXXXXX
```

### 3. Track Events
The analytics module (`src/lib/analytics.ts`) includes pre-configured events:
- `quote_submitted` - When dealer submits a quote
- `payment_initiated` - When dealer starts payment process
- `payment_completed` - When payment succeeds
- `dealer_login` - When dealer logs in
- `catalog_viewed` - When someone views the catalog
- `product_viewed` - When someone views a specific product
- `contact_form_submitted` - When contact form is submitted

### 4. View Analytics
- Check **Real-time** dashboard for immediate events
- Check **Conversion** section for quote submissions and payments
- Set up custom dashboards and reports in Google Analytics

## Environment Variables

Create or update `.env.local` in your project root:

```bash
# Database
DATABASE_URL=postgresql://...

# Email (Resend)
RESEND_API_KEY=re_...

# Stripe (Test or Live)
STRIPE_SECRET_KEY=sk_test_...  # or sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
VITE_STRIPE_PUBLIC_KEY=pk_test_...  # or pk_live_...

# Google Analytics
VITE_GA4_ID=G-XXXXXXXXXX

# Site
NEXT_PUBLIC_SITE_URL=https://aerowholesale.com
```

## Deployment

### Vercel Settings
1. Go to **Settings** → **Environment Variables**
2. Add all variables listed above
3. Make sure `VITE_*` variables are exposed to the frontend
4. Production/Preview can have different keys (test vs. live Stripe)

### Testing Mode
For initial testing, use Stripe test keys:
- Secret: `sk_test_...`
- Publishable: `pk_test_...`
- Test card: `4242 4242 4242 4242` with any future expiry and any CVC

### Production Mode
When ready for live payments:
1. Get live Stripe keys from production API Keys section
2. Create new webhook endpoint for production domain
3. Update Vercel production environment variables
4. Test with small transaction first

## Testing

### Local Testing
```bash
npm install
npm run dev
```

1. Go to `/quote-payment?id=1` (if you have a quote with ID 1)
2. Click "Pay Now"
3. Use Stripe test card: `4242 4242 4242 4242`
4. Check webhook logs in Stripe dashboard

### Analytics Testing
1. Open browser DevTools → Network tab
2. Make a payment or submit a form
3. Look for requests to `google-analytics.com`
4. Check GA4 dashboard for real-time events

### Webhook Testing
Stripe provides a CLI for testing webhooks locally:
```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Log in
stripe login

# Forward events to local server
stripe listen --forward-to localhost:3000/api/stripe-webhook

# Trigger test events
stripe trigger payment_intent.succeeded
```

## Quote Payment Flow

1. **Quote Submitted** - Dealer gets email with quote details
2. **Quote Confirmed** - Admin approves quote, dealer gets email with payment link
3. **Payment Page** - Dealer views quote summary and clicks "Pay Now"
4. **Stripe Checkout** - Dealer enters payment details securely via Stripe
5. **Payment Success** - Webhook updates quote status to `payment_received`
6. **Confirmation** - Dealer gets payment confirmation email, order enters fulfillment

## Quote Statuses

- `pending` - Initial submission, awaiting admin review
- `confirmed` - Admin approved, ready for payment
- `payment_received` - Payment completed, order in fulfillment
- `processing` - Quote under review (admin status)
- `declined` - Admin declined the quote

## Troubleshooting

### Webhook not triggering
- Check webhook endpoint URL is publicly accessible
- Verify webhook secret in code matches Stripe dashboard
- Check Stripe webhook logs for errors
- Ensure handler accepts raw request body

### Payment not redirecting to Stripe
- Verify `VITE_STRIPE_PUBLIC_KEY` is set correctly
- Check browser console for errors
- Ensure quote exists and has status "confirmed"

### GA4 events not showing
- Verify `VITE_GA4_ID` is set in environment
- Check Google Analytics real-time dashboard
- Ensure privacy/ad blockers aren't blocking analytics
- Wait 24-48 hours for full reports to populate

### Test transactions not appearing
- Ensure you're in test mode (using `sk_test_` keys)
- Check you're on test data view in Stripe dashboard, not live
- Verify webhook is listening for correct events
