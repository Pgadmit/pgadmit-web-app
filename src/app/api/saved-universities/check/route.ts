import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// GET /api/saved-universities/check?universityId=123 - Check if university is saved
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

    const searchParams = request.nextUrl.searchParams;
    const universityId = parseInt(searchParams.get('universityId') || '0');

    if (!universityId) {
      return NextResponse.json(
        { error: 'University ID is required' },
        { status: 400 }
      );
    }

    // Call RPC function
    const { data, error } = await supabase.rpc('is_university_saved', {
      university_id_param: universityId,
    });

    if (error) {
      console.error('Error checking if university is saved:', error);
      return NextResponse.json(
        {
          success: false,
          is_saved: false,
          university_id: universityId,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      data || {
        success: false,
        is_saved: false,
        university_id: universityId,
      }
    );
  } catch (error) {
    console.error(
      'Unexpected error in GET /api/saved-universities/check:',
      error
    );
    return NextResponse.json(
      {
        success: false,
        is_saved: false,
        university_id: 0,
      },
      { status: 500 }
    );
  }
}
