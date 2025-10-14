import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// POST /api/saved-universities/toggle - Toggle saved university
export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { universityId } = body;

    if (!universityId || typeof universityId !== 'number') {
      return NextResponse.json(
        { error: 'University ID is required and must be a number' },
        { status: 400 }
      );
    }

    // Call RPC function
    const { data, error } = await supabase.rpc('toggle_saved_university', {
      university_id_param: universityId,
    });

    if (error) {
      console.error('Error toggling saved university:', error);
      return NextResponse.json(
        {
          success: false,
          action: 'added',
          is_saved: false,
          data: {
            success: false,
            error: error.message,
            code: 'SUPABASE_ERROR',
          },
        },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(
      'Unexpected error in POST /api/saved-universities/toggle:',
      error
    );
    return NextResponse.json(
      {
        success: false,
        action: 'added',
        is_saved: false,
        data: {
          success: false,
          error: 'Internal server error',
          code: 'UNEXPECTED_ERROR',
        },
      },
      { status: 500 }
    );
  }
}
