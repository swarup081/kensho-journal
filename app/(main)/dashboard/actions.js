'use server';

import { revalidatePath } from 'next/cache';

// This is a simple wrapper action that calls your existing AI API route.
export async function triggerAnalysis(entryId) {
  // We need to construct the absolute URL for the API route when calling it from a Server Action.
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  try {
    const response = await fetch(`${baseUrl}/api/analyze-entry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entryId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to trigger analysis:', errorData);
      return { error: 'Failed to trigger analysis.' };
    }
    
    // Revalidate the dashboard path to show the new data.
    revalidatePath('/dashboard');
    return { success: true };

  } catch (error) {
    console.error('Error in triggerAnalysis action:', error);
    return { error: 'An unexpected error occurred.' };
  }
}