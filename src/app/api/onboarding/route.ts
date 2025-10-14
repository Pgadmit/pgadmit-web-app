import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// GET /api/onboarding - Get user onboarding data
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check auth
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('user_onboarding')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      // Not found case - return null data instead of error
      if (error.code === 'PGRST116') {
        return NextResponse.json({ success: true, data: null });
      }

      console.error('Error fetching onboarding data:', error);
      return NextResponse.json(
        { error: 'Failed to fetch onboarding data', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Unexpected error in GET /api/onboarding:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
