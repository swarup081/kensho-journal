// app/(main)/feedback/actions.js
'use server';

import { createClient } from '@/lib/supabase/server';

export async function submitFeedback(formData) {
  const supabase = createClient();

  // Get the current user's session to optionally link the feedback
  const { data: { user } } = await supabase.auth.getUser();

  // Prepare the data for insertion into the database
  const feedbackData = {
    user_id: user ? user.id : null,
    feedback_type: formData.get('feedbackType'),
    rating: formData.get('rating'),
    comment: formData.get('comment'),
    // Supabase can handle JSON directly, so we parse the string
    categories: JSON.parse(formData.get('categories')),
    can_contact: formData.get('canContact') === 'true',
  };

  // Insert the prepared data into the 'feedback' table
  const { error } = await supabase.from('feedback').insert([feedbackData]);

  if (error) {
    console.error('Feedback submission error:', error);
    // In a real app, you might return a more detailed error
    return { success: false, message: 'Could not submit feedback.' };
  }

  return { success: true, message: 'Feedback received!' };
}