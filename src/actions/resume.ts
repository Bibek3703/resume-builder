'use server';

import { resumes } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { geminiResumeReader, generationConfig } from '@/lib/gemini';
import { auth } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';
import {promises as fs} from 'fs'

export async function saveResume(id: string, data: any) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    await db.update(resumes)
        .set({
            title: data.title,
            content: data.content,
            updatedAt: new Date()
        })
        .where(and(
            eq(resumes.id, id),
            eq(resumes.userId, userId)
        ));
}

export async function createResume() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    // const [resume] = await db.insert(resumes).values({
    //     title: 'New Resume',
    //     content: {},
    //     userId
    // }).returning();

    // return resume;
}