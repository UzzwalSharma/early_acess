# Convex Setup Instructions

## Step 1: Deploy Convex Backend

From your project root, run:

```bash
npx convex deploy
```

This will:
- Create a Convex project
- Deploy your schema and functions
- Provide you with a `VITE_CONVEX_URL`

## Step 2: Update .env.local

Replace the placeholder URL in `.env.local` with your actual Convex URL:

```
VITE_CONVEX_URL=https://your-deployment-url.convex.cloud
```

Get this URL from the Convex dashboard when you deploy.

## Step 3: Run Development Server

```bash
npm run dev
```

Your app is now connected to Convex! Reviews will be stored in the database.

## File Structure

- **convex.json** - Convex project configuration
- **convex/schema.js** - Database schema
- **convex/reviews.js** - Mutation and query functions
- **.env.local** - Contains VITE_CONVEX_URL (created for you)

## Features

- **addReview**: Mutation to add a new review with name, comment, and rating
- **getReviews**: Query to fetch all reviews sorted by newest first
- **getAverageRating**: Query to calculate average rating across all reviews

The Final.jsx component now uses:
- `useQuery(api.reviews.getReviews)` to fetch reviews
- `useQuery(api.reviews.getAverageRating)` to get the average rating
- `useMutation(api.reviews.addReview)` to submit new reviews

Real data will be stored in Convex database and displayed in your app! 🎉
