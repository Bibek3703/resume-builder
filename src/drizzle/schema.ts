import { integer, json, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: text('id').primaryKey(),
    stripeCustomerId: text('stripe_customer_id').unique(),
    stripeSubscriptionId: text('stripe_subscription_id').unique(),
    email: text('email'),
    stripePriceId: text('stripe_price_id'),
    stripeCurrentPeriodEnd: timestamp('stripe_current_period_end'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const resumes = pgTable('resumes', {
    id: uuid('id').defaultRandom(),
    userId: text('user_id').references(() => users.id),
    content: json('content'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const invoices = pgTable('invoices', {
    id: text('id').primaryKey(),
    userId: text('user_id').references(() => users.id),
    amount: integer('amount').notNull(),
    currency: text('currency').notNull(),
    status: text('status').notNull(),
    pdfUrl: text('pdf_url'),
    date: timestamp('date').notNull(),
});

export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type SelectResume = typeof resumes.$inferSelect;
export type InsertResume = typeof resumes.$inferInsert;

export type SelectInvoice = typeof invoices.$inferSelect;
export type InsertInvoice = typeof invoices.$inferInsert;