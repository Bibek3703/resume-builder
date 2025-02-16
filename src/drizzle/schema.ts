import { json, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: text('id').primaryKey(),
    stripeCustomerId: text('stripe_customer_id'),
});

export const resumes = pgTable('resumes', {
    id: serial('id').primaryKey(),
    userId: text('user_id').references(() => users.id),
    content: json('content'),
    createdAt: timestamp('created_at').defaultNow(),
});