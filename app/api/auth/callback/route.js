import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const type = searchParams.get('type');
  const next = '/journal';

  // The confirmation link from Supabase contains `token_hash` and `type`
  const token_hash = searchParams.get('token_hash');

  if (token_hash && type) {
    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  // Fallback for older email templates that might use `token`
  if (token && type) {
    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      type,
      token,
    });
    if (!error) {
      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  // If verification fails, redirect to the home page.
  // TODO: Redirect to a dedicated error page with instructions.
  return NextResponse.redirect(new URL('/', request.url));
}
