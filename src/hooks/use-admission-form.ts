import { useState, useTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { getCollegeSuggestions, sendToN8nWebhook } from '@/actions/ai-workflow';
import {
  AdmissionFormSchema,
  AdmissionFormSchemaValues,
} from '@/lib/validations';
import { useSuggestUniversities } from '@/lib/stores/suggest-universities-store';
import { useRateLimitStore } from '@/lib/stores/rate-limit-store';

export function useAdmissionForm() {
  const { setUniversities, setLoading, setError, universities, loading } =
    useSuggestUniversities();
  const {
    isOpenAILimited,
    canMakeOpenAIRequest,
    setLastOpenAIRequest,
    checkRateLimits,
  } = useRateLimitStore();

  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<AdmissionFormSchemaValues>({
    resolver: zodResolver(AdmissionFormSchema),
    defaultValues: {
      preferredRegions: [],
      newsletter: false,
    },
  });

  // Check rate limits on component mount only
  useEffect(() => {
    checkRateLimits();
  }, [checkRateLimits]);

  const onSubmit = (values: AdmissionFormSchemaValues) => {
    // --- 1. Function Entry ---
    console.log('[onSubmit] Function triggered.');
    console.log('[onSubmit] Initial form values:', values);

    // --- 2. Rate Limit Check ---
    console.log('[onSubmit] Checking OpenAI request capability...');
    if (!canMakeOpenAIRequest()) {
      console.warn('[onSubmit] Rate limit is active. Aborting submission.');
      setErrorMessage('Searching For Your Matches');
      return;
    }
    console.log('[onSubmit] Rate limit check passed.');

    // --- 3. State Reset ---
    console.log('[onSubmit] Resetting component state (clearing errors, emptying universities, setting loading to true).');
    setErrorMessage(null);
    setUniversities([]);
    setLoading(true);
    setError(null);

    // --- 4. Starting Async Transition ---
    console.log('[onSubmit] Starting async transition...');
    startTransition(async () => {
      try {
        // --- 5. HubSpot Integration ---
        const hubspotContact = createHubSpotContact(values);
        console.log('[HubSpot] Attempting to save contact. Data:', hubspotContact);

        try {
          const hubspotResponse = await fetch('/api/hubspot/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(hubspotContact),
          });

          console.log(`[HubSpot] Response received with status: ${hubspotResponse.status}`);

          if (hubspotResponse.status === 429) {
            const errorData = await hubspotResponse.json();
            console.error('[HubSpot] Rate limit exceeded (429). Details:', errorData);
            throw new Error(
              `Rate limit exceeded. Please wait ${Math.ceil(errorData.remainingTime / 1000)} seconds.`
            );
          } else if (!hubspotResponse.ok) {
            console.error(`[HubSpot] Request failed with status: ${hubspotResponse.status}`);
            throw new Error('HubSpot save failed');
          }

          console.log('[HubSpot] Contact saved successfully.');

        } catch (error: any) {
          // This catches errors specifically from the HubSpot fetch block
          if (error.message.includes('Rate limit exceeded')) {
            throw error; // Re-throw to be caught by the main catch block
          }
          // Log other HubSpot-specific errors but continue the process
          console.warn('[HubSpot] Non-critical API error:', error);
        }

        // --- 6. AI Suggestions ---
        console.log('[AI] Updating last request timestamp and fetching college suggestions...');
        setLastOpenAIRequest(Date.now());
        const suggestions = await getCollegeSuggestions(values);
        console.log('[AI] Suggestions received:', suggestions);

        if (!Array.isArray(suggestions) || suggestions.length === 0) {
          console.error('[AI] Validation failed: Suggestions are not a valid array or are empty.');
          throw new Error('No valid suggestions returned');
        }
        console.log('[AI] Suggestions validated successfully.');

        // --- 7. Successful State Update ---
        console.log('[onSubmit] AI suggestions successful. Updating state with universities and setting loading to false.');
        setUniversities(suggestions);
        setLoading(false);
        setError(null);

        // --- 8. N8N Webhook ---
        console.log('[N8N] Attempting to send data to N8N webhook...');
        try {
          await sendToN8nWebhook({
            formData: values,
            suggestions,
          });
          console.log('[N8N] Webhook call successful.');
        } catch (error) {
          console.warn('[N8N] Non-critical webhook error:', error);
        }

      } catch (error: any) {
        // --- 9. Main Error Handling ---
        console.error('[onSubmit] An error occurred in the main try block:', error);
        setLoading(false);

        if (error?.response?.data?.error?.code === 'insufficient_quota') {
          const finalErrorMessage = 'Monthly usage limit reached. Please try again next month.';
          console.error(`[onSubmit] Setting error message: "${finalErrorMessage}"`);
          setErrorMessage(finalErrorMessage);
        } else {
          const finalErrorMessage = error.message || 'Something went wrong while fetching suggestions.';
          console.error(`[onSubmit] Setting error message: "${finalErrorMessage}"`);
          setErrorMessage(finalErrorMessage);
        }
      }
    });
  };

  return {
    form,
    onSubmit,
    isPending,
    errorMessage,
    loading,
    universities,
    isOpenAILimited,
  };
}

function createHubSpotContact(values: AdmissionFormSchemaValues) {
  return {
    email: values.email,
    name: values.name,
    firstname: values.name.split(' ')[0] || '',
    lastname: values.name.split(' ').slice(1).join(' ') || '',
    country: values.homeCountry,
    preferred_regions: Array.isArray(values.preferredRegions)
      ? values.preferredRegions.join(', ')
      : values.preferredRegions,
    intended_major: values.major,
    test_scores: `${values.standardizedTest}: ${values.testScore}`,
    budget_range: values.budget,
    newsletter: values.newsletter,
  };
}
