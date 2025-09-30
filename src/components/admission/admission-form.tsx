'use client';

import countries from 'world-countries';

import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/* eslint-disable @typescript-eslint/no-explicit-any */

type AdmissionFormProps = {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  isPending: boolean;
  isRateLimited?: boolean;
};

const countryOptions = countries.map((c) => ({
  value: c.cca2,
  label: c.name.common,
}));

export default function AdmissionForm({ form, onSubmit, isPending, isRateLimited = false }: AdmissionFormProps) {
  const [selectedCountry, setSelectedCountry] = useState('');

  const allGradingScales = [
    'GPA (4.0)',
    'GPA (5.0)',
    'Percentage',
    'Letter Grade',
    '1.0 - 5.0',
    '1 - 5 Scale',
  ];

  const regionOptions = ['North America', 'Europe', 'Asia', 'Australia', 'Africa'];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-3xl space-y-6">
        {/* Country + Grading Scale */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="homeCountry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Home Country</FormLabel>
                <Select
                  onValueChange={(val) => {
                    const country = countryOptions.find((c) => c.value === val);
                    field.onChange(country?.label); // store full name
                    setSelectedCountry(country?.label || '');
                  }}
                  value={countryOptions.find((c) => c.label === field.value)?.value || ''}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {countryOptions.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gradingScale"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grading Scale</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={!selectedCountry}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Scale" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {allGradingScales.map((scale) => (
                      <SelectItem key={scale} value={scale}>
                        {scale}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Grade Average + Major */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="gradeAverage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grade Average</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 3.5" {...field} value={field.value ?? ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="major"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Major</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Computer Science" {...field} value={field.value ?? ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Test + Score */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="standardizedTest"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Test Taken</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Test" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="SAT">SAT</SelectItem>
                    <SelectItem value="ACT">ACT</SelectItem>
                    <SelectItem value="TOEFL">TOEFL</SelectItem>
                    <SelectItem value="IELTS">IELTS</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="testScore"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Test Score</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 1200" {...field} value={field.value ?? ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Preferred Regions */}
        <FormField
          control={form.control}
          name="preferredRegions"
          render={() => (
            <FormItem>
              <FormLabel>Preferred Regions</FormLabel>
              <div className="grid grid-cols-2 gap-2">
                {regionOptions.map((region) => (
                  <div key={region} className="flex items-center space-x-2">
                    <Checkbox
                      checked={form.getValues('preferredRegions').includes(region)}
                      onCheckedChange={(checked) => {
                        const current = form.getValues('preferredRegions');
                        form.setValue(
                          'preferredRegions',
                          checked
                            ? [...current, region]
                            : current.filter((r: string) => r !== region),
                        );
                      }}
                    />
                    <span>{region}</span>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Budget */}
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Annual Budget for Tuition</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 20000" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Name + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} value={field.value ?? ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="doe@example.com"
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Newsletter */}
        <FormField
          control={form.control}
          name="newsletter"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-2">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="!mt-0">Subscribe to our newsletter</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="bg-primary-blue hover:bg-primary-blue/80"
          type="submit"
          size="lg"
          disabled={isPending || isRateLimited}
        >
          {isPending ? 'Submitting...' : 'Get AI Suggestions'}
        </Button>
        <FormLabel className="text-xs text-muted-foreground mb-2">
          By submitting this form, you agree that your data will be stored and processed.
        </FormLabel>
      </form>
    </Form>
  );
}
