import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// GET /api/saved-universities - Get all saved universities
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

    // Get query params
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Call RPC function
    const { data, error } = await supabase.rpc('get_saved_universities', {
      limit_count: limit,
      offset_count: offset,
    });

    if (error) {
      console.error('Error fetching saved universities:', error);
      return NextResponse.json(
        { error: 'Failed to fetch saved universities' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: data || [] });
  } catch (error) {
    console.error('Unexpected error in GET /api/saved-universities:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/saved-universities - Add a saved university
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
    const { data, error } = await supabase.rpc('add_saved_university', {
      university_id_param: universityId,
    });

    if (error) {
      console.error('Error adding saved university:', error);
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          code: 'SUPABASE_ERROR',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error in POST /api/saved-universities:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        code: 'UNEXPECTED_ERROR',
      },
      { status: 500 }
    );
  }
}

// DELETE /api/saved-universities - Remove a saved university
export async function DELETE(request: NextRequest) {
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
    const { data, error } = await supabase.rpc('remove_saved_university', {
      university_id_param: universityId,
    });

    if (error) {
      console.error('Error removing saved university:', error);
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          code: 'SUPABASE_ERROR',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error in DELETE /api/saved-universities:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        code: 'UNEXPECTED_ERROR',
      },
      { status: 500 }
    );
  }
}
