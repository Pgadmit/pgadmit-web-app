import { useState, useTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { getCollegeSuggestions, sendToN8nWebhook } from '@/actions/ai-workflow';
import { AdmissionFormSchema, AdmissionFormSchemaValues } from '@/lib/validations';
import { useSuggestUniversities } from '@/lib/stores/suggest-universities-store';
import { useRateLimitStore } from '@/lib/stores/rate-limit-store';

export function useAdmissionForm() {
    const { setUniversities, setLoading, setError, universities, loading } = useSuggestUniversities();
    const {
        isOpenAILimited,
        canMakeOpenAIRequest,
        setLastOpenAIRequest,
        checkRateLimits
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
        if (!canMakeOpenAIRequest()) {
            setErrorMessage('Rate limit active. Please wait and try again..');
            return;
        }

        setErrorMessage(null);
        setUniversities([]);
        setLoading(true);
        setError(null);

        startTransition(async () => {
            try {
                // Save to HubSpot
                const hubspotContact = createHubSpotContact(values);

                try {
                    const hubspotResponse = await fetch('/api/hubspot/contact', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(hubspotContact),
                    });

                    if (hubspotResponse.status === 429) {
                        const errorData = await hubspotResponse.json();
                        throw new Error(`Rate limit exceeded. Please wait ${Math.ceil(errorData.remainingTime / 1000)} seconds.`);
                    } else if (!hubspotResponse.ok) {
                        throw new Error('HubSpot save failed');
                    }
                } catch (error: any) {
                    if (error.message.includes('Rate limit exceeded')) {
                        throw error;
                    }
                    console.warn('HubSpot API error:', error);
                }

                // Get AI suggestions
                setLastOpenAIRequest(Date.now());
                const suggestions = await getCollegeSuggestions(values);

                if (!Array.isArray(suggestions) || suggestions.length === 0) {
                    throw new Error('No valid suggestions returned');
                }

                setUniversities(suggestions);
                setLoading(false);
                setError(null);

                // Send to N8N
                try {
                    await sendToN8nWebhook({
                        formData: values,
                        suggestions,
                    });
                } catch (error) {
                    console.warn('N8N webhook error:', error);
                }

            } catch (error: any) {
                setLoading(false);

                if (error?.response?.data?.error?.code === 'insufficient_quota') {
                    setErrorMessage('Monthly usage limit reached. Please try again next month.');
                } else {
                    setErrorMessage(error.message || 'Something went wrong while fetching suggestions.');
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