import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  reviews: defineTable({
    name: v.string(),
    comment: v.string(),
    rating: v.number(),
    avatar: v.optional(v.string()),
    timestamp: v.number(),
  })
    .index("by_timestamp", ["timestamp"])
});
