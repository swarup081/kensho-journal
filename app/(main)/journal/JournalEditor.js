'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function JournalEditor() {
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSave = async () => {
        setIsLoading(true);
        setError(null);

        // This is the key part: it inserts the data into your Supabase table
        const { error } = await supabase
            .from('journal_entries') // The table name must be exact
            .insert([{ content: content }]); // The column name must be exact

        if (error) {
            console.error('Error saving journal:', error);
            setError('Could not save your journal entry. Please try again.');
        } else {
            // Success! Clear the editor and maybe redirect or show a success message.
            setContent('');
            // Optional: Redirect to dashboard after saving
            router.push('/dashboard');
            router.refresh(); // Important to show new data
        }

        setIsLoading(false);
    };

    return (
        <div className="p-4 bg-gray-900/50 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">New Entry</h2>
            <textarea
                className="w-full h-60 p-3 bg-gray-800 text-gray-200 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Let your thoughts flow..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="mt-4 flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={isLoading || !content}
                    className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Saving...' : 'Save'}
                </button>
            </div>
        </div>
    );
}