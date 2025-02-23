import { geminiResumeCraftAssistant, generationConfig } from '@/lib/gemini';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { prompt } = await req.json();

    console.log({prompt})
    
    try {
        const chat = await geminiResumeCraftAssistant.startChat({
            generationConfig,
            history: []
        })

        const data = await chat.sendMessage(prompt)
        const { candidates } = await data.response;
        if (!candidates) throw new Error("Error generating content")
        return NextResponse.json({ message: 'Content generated', content: candidates[0].content.parts[0].text })

    } catch (error) {
        console.error('[GENERATING_ERROR]', error);
        return new NextResponse("AI Generation Failed", { status: 500 });
    }
}