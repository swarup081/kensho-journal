import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  const next = searchParams.get('next') ?? '/';
  const email = searchParams.get('email');

  if (token_hash && type && email) {
    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
      email,
    });
    if (!error) {
      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(new URL('/auth/auth-code-error', request.url));
}
