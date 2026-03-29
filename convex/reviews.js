import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addReview = mutation({
  args: {
    name: v.string(),
    comment: v.string(),
    rating: v.number(),
  },
  handler: async (ctx, args) => {
    // Basic validation
    if (!args.name.trim() || !args.comment.trim() || args.rating < 1 || args.rating > 5) {
      throw new Error("Invalid review data");
    }

    const reviewId = await ctx.db.insert("reviews", {
      name: args.name,
      comment: args.comment,
      rating: args.rating,
      timestamp: Date.now(),
    });

    return reviewId;
  },
});

export const getReviews = query({
  handler: async (ctx) => {
    const reviews = await ctx.db
      .query("reviews")
      .order("desc")
      .collect();

    return reviews;
  },
});

export const getAverageRating = query({
  handler: async (ctx) => {
    const reviews = await ctx.db
      .query("reviews")
      .collect();

    if (reviews.length === 0) return 0;

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  },
});
