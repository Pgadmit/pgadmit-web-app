import { createServerClient } from '@/shared/lib/supabase/server-only';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = await createServerClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.session) {
      await supabase.auth.refreshSession();

      const redirectUrl = new URL(`${origin}${next}`);
      redirectUrl.searchParams.set('auth', 'success');
      return NextResponse.redirect(redirectUrl.toString());
    } else {
      console.error('OAuth exchange error:', error);
      const errorUrl = new URL(`${origin}/(auth)/auth-code-error`);
      if (error) {
        errorUrl.searchParams.set('error', error.message);
      }
      return NextResponse.redirect(errorUrl.toString());
    }
  }

  return NextResponse.redirect(`${origin}/(auth)/auth-code-error`);
}
