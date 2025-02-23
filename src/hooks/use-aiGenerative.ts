'use client';

import { useState } from 'react';

export type GeneratedType = {
    message: string;
    content: string
}

export function useAIGenerative() {
    const [isLoading, setIsLoading] = useState(false);

    const generateSection = async (prompt: string): Promise<GeneratedType | null> => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/ai/generate', {
                method: 'POST',
                body: JSON.stringify({ prompt })
            });
            const data = await await response.json()
            if(data){
                return data
            }
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return { generateSection, isLoading };
}