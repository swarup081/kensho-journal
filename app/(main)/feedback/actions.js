'use server';

export async function submitFeedback(formData) {
  const feedbackData = {
    type: formData.get('feedbackType'),
    rating: formData.get('rating'),
    comment: formData.get('comment'),
    // Parse the JSON string back into an array
    categories: JSON.parse(formData.get('categories')), 
    canContact: formData.get('canContact') === 'true', // Convert string to boolean
    submittedAt: new Date().toISOString(),
  };
  
  console.log('--- New Feedback Submitted ---');
  console.log(JSON.stringify(feedbackData, null, 2));
  console.log('----------------------------');
  
  return { success: true, message: 'Feedback received!' };
}