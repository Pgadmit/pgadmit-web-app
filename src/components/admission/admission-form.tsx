import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
// --- MODIFIED: Re-import 'world-countries' to get the country list ---
import countries from 'world-countries';

import { UseFormReturn } from 'react-hook-form';

// --- NEW: Import Combobox components ---
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

/* eslint-disable @typescript-eslint/no-explicit-any */

type AdmissionFormProps = {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  isPending: boolean;
  isRateLimited?: boolean;
};

// --- MODIFIED: Re-create the country options list and sort it alphabetically ---
const countryOptions = countries
  .map(c => ({
    label: c.name.common,
    value: c.name.common.toLowerCase(), // Use a consistent value for keys
  }))
  .sort((a, b) => a.label.localeCompare(b.label));
const onValidationErrors = (errors: any) => {
    console.error("FORM VALIDATION ERRORS:", errors);
    // You can add a toast or alert here if you want to be more explicit
    // alert('Please fix the errors before submitting.');
  };
export default function AdmissionForm({
  form,
  onSubmit,
  isPending,
  isRateLimited = false,
}: AdmissionFormProps) {
  const allGradingScales = [
    'GPA (4.0)',
    'GPA (5.0)',
    'Percentage',
    'Letter Grade',
    '1.0 - 5.0',
    '1 - 5 Scale',
    '1 - 10 Scale',
    '1 - 20 Scale',
  ];

  const regionOptions = [
    'North America',
    'Europe',
    'Asia',
    'Australia',
    'Africa',
  ];

  const testOptions = ['SAT', 'ACT', 'TOEFL', 'IELTS', 'None'];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onValidationErrors)}
        className='max-w-3xl space-y-6'
      >
        {/* Country + Grading Scale */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* --- MODIFIED: Replaced the Input with a searchable Combobox --- */}
          <FormField
            control={form.control}
            name='homeCountry'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Home Country</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        role='combobox'
                        className={cn(
                          'w-full justify-between',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value
                          ? countryOptions.find(
                            country => country.label === field.value
                          )?.label
                          : 'Select country'}
                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0'>
                    <Command>
                      <CommandInput placeholder='Search country...' />
                      <CommandList>
                        <CommandEmpty>No country found.</CommandEmpty>
                        <CommandGroup>
                          {countryOptions.map(country => (
                            <CommandItem
                              value={country.label}
                              key={country.value}
                              onSelect={() => {
                                form.setValue('homeCountry', country.label);
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  country.label === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {country.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='gradingScale'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grading Scale</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Scale' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {allGradingScales.map(scale => (
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
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='gradeAverage'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grade Average</FormLabel>
                <FormControl>
                  <Input
                    placeholder='e.g. 3.5'
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='major'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Major</FormLabel>
                <FormControl>
                  <Input
                    placeholder='e.g. Computer Science'
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Test + Score */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='testsTaken'
            render={() => (
              <FormItem>
                <FormLabel>Test Taken</FormLabel>
                <div className='grid grid-cols-2 gap-2'>
                  {testOptions.map(test => (
                    <div key={test} className='flex items-center space-x-2'>
                      <Checkbox
                        checked={form.getValues('testsTaken')?.includes(test)}
                        onCheckedChange={checked => {
                          const current = form.getValues('testsTaken') || [];
                          form.setValue(
                            'testsTaken',
                            checked
                              ? [...current, test]
                              : current.filter((t: string) => t !== test)
                          );
                        }}
                      />
                      <span>{test}</span>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='testScore'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Test Score</FormLabel>
                <FormControl>
                  <Input
                    placeholder='e.g. 1200'
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Preferred Regions */}
        <FormField
          control={form.control}
          name='preferredRegions'
          render={() => (
            <FormItem>
              <FormLabel>Region you would like to study in?</FormLabel>
              <div className='grid grid-cols-2 gap-2'>
                {regionOptions.map(region => (
                  <div key={region} className='flex items-center space-x-2'>
                    <Checkbox
                      checked={form
                        .getValues('preferredRegions')
                        ?.includes(region)}
                      onCheckedChange={checked => {
                        const current =
                          form.getValues('preferredRegions') || [];
                        form.setValue(
                          'preferredRegions',
                          checked
                            ? [...current, region]
                            : current.filter((r: string) => r !== region)
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
              <FormLabel>
                Annual Budget for Tuition: ${Number(field.value || 0).toLocaleString()}
              </FormLabel>
              <FormControl>
                <Slider
                  onValueChange={(value) => field.onChange(value[0])}
                  defaultValue={[100]} // Set a default starting value
                  max={100000}
                  step={1000}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Name + Email */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='John Doe'
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='doe@example.com'
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
          name='newsletter'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center space-x-2'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className='!mt-0'>
                Subscribe to our newsletter
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className='bg-primary-blue hover:bg-primary-blue/80'
          type='submit'
          size='lg'

        >
          {isPending ? 'Submitting...' : 'See My Free Matches'}
        </Button>
        <FormLabel className='text-xs text-muted-foreground mb-2'>
          By submitting this form, you agree that your data will be stored and
          processed.
        </FormLabel>
      </form>
    </Form>
  );
}