import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// GET /api/universities/[id] - Get university by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const universityId = parseInt(id);

    if (isNaN(universityId)) {
      return NextResponse.json(
        { error: 'Invalid university ID' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('universities')
      .select('*')
      .eq('id', universityId)
      .single();

    if (error) {
      console.error('Error fetching university:', error);
      return NextResponse.json(
        { error: 'University not found', details: error.message },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Unexpected error in GET /api/universities/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

