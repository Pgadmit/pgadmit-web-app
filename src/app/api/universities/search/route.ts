import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// GET /api/universities/search - Search universities with pagination
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const searchParams = request.nextUrl.searchParams;

    // Pagination params
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const offset = (page - 1) * limit;

    // Search params
    const query = searchParams.get('query') || '';
    const type = searchParams.get('type') || 'all';
    const country = searchParams.get('country') || '';

    // Build query
    let dbQuery = supabase.from('universities').select('*', { count: 'exact' });

    // Apply filters
    if (query) {
      // Search in name and description
      dbQuery = dbQuery.or(
        `name.ilike.%${query}%,description.ilike.%${query}%`
      );
    }

    if (type && type !== 'all') {
      dbQuery = dbQuery.eq('university_type', type);
    }

    if (country) {
      dbQuery = dbQuery.eq('country', country);
    }

    // Apply pagination
    const { data, error, count } = await dbQuery
      .order('name', { ascending: true })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error searching universities:', error);
      return NextResponse.json(
        { error: 'Failed to search universities', details: error.message },
        { status: 500 }
      );
    }

    const totalPages = count ? Math.ceil(count / limit) : 0;

    return NextResponse.json({
      success: true,
      data: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error('Unexpected error in GET /api/universities/search:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
