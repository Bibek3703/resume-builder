import { json, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: text('id').primaryKey(),
    stripeCustomerId: text('stripe_customer_id').unique(),
    stripeSubscriptionId: text('stripe_subscription_id').unique(),
    stripePriceId: text('stripe_price_id'),
    stripeCurrentPeriodEnd: timestamp('stripe_current_period_end'),
});

export const resumes = pgTable('resumes', {
    id: serial('id').primaryKey(),
    userId: text('user_id').references(() => users.id),
    content: json('content'),
    createdAt: timestamp('created_at').defaultNow(),
});

export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type SelectResume = typeof resumes.$inferSelect;
export type InsertResume = typeof resumes.$inferInsert;