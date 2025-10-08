'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import {
  Search,
  Filter,
  MapPin,
  DollarSign,
  GraduationCap,
} from 'lucide-react';

export function UniversitySearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    country: '',
    tuitionRange: '',
    ranking: '',
    program: '',
  });

  const handleSearch = () => {};

  return (
    <Card className='bg-card shadow-sm'>
      <CardContent className='p-6'>
        <div className='space-y-4'>
          {/* Search Bar */}
          <div className='flex gap-2'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search universities, programs, or locations...'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className='pl-10'
              />
            </div>
            <Button onClick={handleSearch} className='px-6'>
              Search
            </Button>
          </div>

          {/* Filters */}
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            <Select
              value={filters.country}
              onValueChange={value =>
                setFilters({ ...filters, country: value })
              }
            >
              <SelectTrigger>
                <div className='flex items-center gap-2'>
                  <MapPin className='h-4 w-4' />
                  <SelectValue placeholder='Country' />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='us'>United States</SelectItem>
                <SelectItem value='uk'>United Kingdom</SelectItem>
                <SelectItem value='canada'>Canada</SelectItem>
                <SelectItem value='australia'>Australia</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.tuitionRange}
              onValueChange={value =>
                setFilters({ ...filters, tuitionRange: value })
              }
            >
              <SelectTrigger>
                <div className='flex items-center gap-2'>
                  <DollarSign className='h-4 w-4' />
                  <SelectValue placeholder='Tuition Range' />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='under-20k'>Under $20,000</SelectItem>
                <SelectItem value='20k-40k'>$20,000 - $40,000</SelectItem>
                <SelectItem value='40k-60k'>$40,000 - $60,000</SelectItem>
                <SelectItem value='over-60k'>Over $60,000</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.program}
              onValueChange={value =>
                setFilters({ ...filters, program: value })
              }
            >
              <SelectTrigger>
                <div className='flex items-center gap-2'>
                  <GraduationCap className='h-4 w-4' />
                  <SelectValue placeholder='Program' />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='engineering'>Engineering</SelectItem>
                <SelectItem value='business'>Business</SelectItem>
                <SelectItem value='computer-science'>
                  Computer Science
                </SelectItem>
                <SelectItem value='medicine'>Medicine</SelectItem>
                <SelectItem value='arts'>Arts & Humanities</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant='outline'
              className='flex items-center gap-2 bg-transparent'
            >
              <Filter className='h-4 w-4' />
              More Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
