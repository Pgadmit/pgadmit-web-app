'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X } from 'lucide-react';
import { useUniversityTypes } from '../lib';

interface UniversitySearchProps {
  query?: string;
  type?: string;
  onQueryChange: (query: string) => void;
  onTypeChange: (type: string) => void;
  onReset: () => void;
  className?: string;
}

export function UniversitySearch({
  query = '',
  type = 'all',
  onQueryChange,
  onTypeChange,
  onReset,
  className,
}: UniversitySearchProps) {
  const { universityTypes, isLoadingTypes } = useUniversityTypes();

  const hasFilters = query || (type && type !== 'all');

  return (
    <Card className={`bg-card shadow-sm ${className}`}>
      <CardContent className='p-6'>
        <div className='space-y-4'>
          {/* Search Bar */}
          <div className='flex gap-2'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search universities... (auto-search as you type)'
                value={query}
                onChange={e => onQueryChange(e.target.value)}
                className='pl-10 pr-10'
              />
              {query && (
                <button
                  onClick={() => onQueryChange('')}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer'
                >
                  <X className='h-4 w-4' />
                </button>
              )}
            </div>
            {hasFilters && (
              <Button
                onClick={onReset}
                variant='outline'
                className='px-6 cursor-pointer'
              >
                Reset
              </Button>
            )}
          </div>

          {/* University Type Filter */}
          <div className='flex gap-4'>
            <div className='flex-1'>
              <label className='text-sm font-medium text-foreground mb-2 block'>
                University Type
              </label>
              <Select value={type} onValueChange={onTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder='Select type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Types</SelectItem>
                  {isLoadingTypes ? (
                    <SelectItem value='loading' disabled>
                      Loading...
                    </SelectItem>
                  ) : (
                    universityTypes.map(typeInfo => (
                      <SelectItem
                        key={typeInfo.university_type}
                        value={typeInfo.university_type}
                      >
                        {typeInfo.university_type} (
                        {typeInfo.universities_count})
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
