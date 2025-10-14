import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// GET /api/saved-universities/count - Get count of saved universities
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check auth
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Call RPC function
    const { data, error } = await supabase.rpc('get_saved_universities_count');

    if (error) {
      console.error('Error fetching saved universities count:', error);
      return NextResponse.json(
        {
          success: false,
          count: 0,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(data || { success: false, count: 0 });
  } catch (error) {
    console.error('Unexpected error in GET /api/saved-universities/count:', error);
    return NextResponse.json(
      {
        success: false,
        count: 0,
      },
      { status: 500 }
    );
  }
}

