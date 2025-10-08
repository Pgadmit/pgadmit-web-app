import { NextRequest, NextResponse } from 'next/server';
import { createOrUpdateContact, HubSpotContact } from '@/lib/hubspot';
import { serverRateLimit, getClientIdentifier } from '@/lib/rate-limit-server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const clientId = getClientIdentifier(request);

    // Check rate limit (5 requests per 5 minutes per IP)
    const rateLimitCheck = serverRateLimit.checkRateLimit(
      clientId,
      'openai',
      5 * 60 * 1000, // 5 minutes
      5 // max 5 requests
    );

    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded. Please try again later.',
          remainingTime: rateLimitCheck.remainingTime,
          resetTime: rateLimitCheck.resetTime,
        },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil(
              rateLimitCheck.remainingTime / 1000
            ).toString(),
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitCheck.resetTime.toString(),
          },
        }
      );
    }

    // Validate required fields
    if (!body.email || !body.name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      );
    }

    // Prepare contact data
    const contactData: HubSpotContact = {
      email: body.email,
      name: body.name,
      firstname: body.firstname || body.name?.split(' ')[0] || '',
      lastname: body.lastname || body.name?.split(' ').slice(1).join(' ') || '',
      country: body.country || '',
      preferred_regions: body.preferred_regions || '',
      intended_major: body.intended_major || '',
      test_scores: body.test_scores || '',
      budget_range: body.budget_range || '',
      newsletter: body.newsletter || false,
    };

    // Create or update contact in HubSpot
    const result = await createOrUpdateContact(contactData);

    if (result.success) {
      return NextResponse.json({
        success: true,
        contactId: result.contactId,
        message: 'Contact saved to HubSpot successfully',
      });
    } else {
      return NextResponse.json(
        { error: result.error || 'Failed to save contact to HubSpot' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('HubSpot API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
