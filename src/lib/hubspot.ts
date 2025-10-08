import { Client } from '@hubspot/api-client';

const hubspotClient = new Client({
  accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
});

export interface HubSpotContact {
  email: string;
  name?: string;
  phone?: string;
  country?: string;
  preferred_regions?: string;
  intended_major?: string;
  test_scores?: string;
  budget_range?: string;
  newsletter?: boolean;
  firstname?: string;
  lastname?: string;
}

export interface CreateContactResponse {
  success: boolean;
  contactId?: string;
  error?: string;
}

export async function createOrUpdateContact(
  contactData: HubSpotContact
): Promise<CreateContactResponse> {
  try {
    if (!process.env.HUBSPOT_ACCESS_TOKEN) {
      throw new Error('HubSpot access token is not configured');
    }

    // Prepare properties for HubSpot (only standard properties for now)
    const properties: Record<string, any> = {
      email: contactData.email,
      firstname: contactData.firstname || '',
      lastname: contactData.lastname || '',
      phone: contactData.phone || '',
      country: contactData.country || '',
      // Custom properties
      preferred_regions: Array.isArray(contactData.preferred_regions)
        ? contactData.preferred_regions.join(', ')
        : contactData.preferred_regions || '',
      intended_major: contactData.intended_major || '',
      test_scores: contactData.test_scores || '',
      budget_range: contactData.budget_range || '',
      newsletter: contactData.newsletter || false,
    };

    // Try to create contact first
    try {
      const response = await hubspotClient.crm.contacts.basicApi.create({
        properties,
        associations: [],
      });

      return {
        success: true,
        contactId: response.id,
      };
    } catch (createError: any) {
      // If contact already exists (409 error), try to update
      if (createError.statusCode === 409) {
        // Search for existing contact by email
        const searchResponse =
          await hubspotClient.crm.contacts.searchApi.doSearch({
            filterGroups: [
              {
                filters: [
                  {
                    propertyName: 'email',
                    operator: 'EQ' as any,
                    value: contactData.email,
                  },
                ],
              },
            ],
            properties: ['email', 'firstname', 'lastname'],
            limit: 1,
          });

        if (searchResponse.results && searchResponse.results.length > 0) {
          const existingContact = searchResponse.results[0];

          // Update existing contact
          const updateResponse =
            await hubspotClient.crm.contacts.basicApi.update(
              existingContact.id,
              {
                properties,
              }
            );

          return {
            success: true,
            contactId: updateResponse.id,
          };
        }
      }

      throw createError;
    }
  } catch (error: any) {
    console.error('HubSpot contact creation/update error:', error);

    return {
      success: false,
      error: error.message || 'Failed to create/update contact in HubSpot',
    };
  }
}

export async function trackFormSubmission(
  contactData: HubSpotContact
): Promise<boolean> {
  try {
    if (!process.env.HUBSPOT_ACCESS_TOKEN) {
      console.warn(
        'HubSpot access token not configured, skipping event tracking'
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error('HubSpot event tracking error:', error);
    return false;
  }
}
