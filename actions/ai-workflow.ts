'use server';

import OpenAI from 'openai';
import { z } from 'zod';

import { AdmissionFormSchema } from '@/lib/validations';

/* eslint-disable @typescript-eslint/no-explicit-any */

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function getCollegeSuggestions(formData: z.infer<typeof AdmissionFormSchema>) {
  const prompt = `
Given the following student profile, suggest 5 universities.
Return the result strictly as a JSON object with a property "universities" that is an array of strings.

Student:
- Country: ${formData.homeCountry}
- Grading scale: ${formData.gradingScale}
- Average grade: ${formData.gradeAverage}
- Standardized test: ${formData.standardizedTest} (score: ${formData.testScore})
- Preferred regions: ${formData.preferredRegions.join(', ')}
- Major of interest: ${formData.major}
- Budget: ${formData.budget}
`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-5-mini',
    messages: [
      { role: 'system', content: 'You are a helpful education advisor.' },
      { role: 'user', content: prompt },
    ],
    response_format: { type: 'json_object' },
  });

  const content = completion.choices[0].message?.content ?? '[]';
  console.log('AI raw response content:', content);

  let suggestions: string[] = [];

  try {
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) {
      suggestions = parsed;
    } else if (parsed?.universities && Array.isArray(parsed.universities)) {
      suggestions = parsed.universities;
      console.warn('Parsed suggestions from "universities" field');
    }
  } catch (e) {
    console.error('Failed to parse AI suggestions', e, content);
  }

  return suggestions;
}

export async function sendToN8nWebhook(payload: any) {
  console.log('=== N8N WEBHOOK DEBUG ===');
  console.log('Webhook URL:', process.env.N8N_WEBHOOK_URL);
  console.log('Payload being sent:', JSON.stringify(payload, null, 2));
  console.log('========================');
  
  try {
    const res = await fetch(process.env.N8N_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error('n8n webhook returned error:', res.status, await res.text());
      return null;
    }

    const data = await res.json().catch(() => null);
    console.log('n8n response:', data ?? 'no JSON response');
    return data;
  } catch (err) {
    console.error('Failed to send data to n8n webhook:', err);
    return null;
  }
}
