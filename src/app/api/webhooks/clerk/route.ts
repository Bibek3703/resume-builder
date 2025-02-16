import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { resumes, users } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const payload = await req.json();
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);

    console.log({payload})

    try {
        const evt = wh.verify(JSON.stringify(payload), {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as any;

        if (evt.type === 'user.deleted') {
            await db.delete(users)
                .where(eq(users.id, evt.data.id));

            // Optional: Delete user's resumes
            await db.delete(resumes)
                .where(eq(resumes.userId, evt.data.id));
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        return new NextResponse("Invalid webhook", { status: 400 });
    }
}