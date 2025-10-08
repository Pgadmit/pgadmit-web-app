'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { useUniversityTypes } from '../lib';

interface UniversitySearchProps {
  onSearch: (params: { query: string; type: string }) => void;
  className?: string;
}

export function UniversitySearch({ onSearch, className }: UniversitySearchProps) {
  const { universityTypes, isLoadingTypes } = useUniversityTypes();
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const handleSearch = () => {
    onSearch({ query, type: selectedType });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Card className={`bg-card shadow-sm ${className}`}>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search universities..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearch} className="px-6">
              Search
            </Button>
          </div>

          {/* University Type Filter */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-foreground mb-2 block">
                University Type
              </label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {isLoadingTypes ? (
                    <SelectItem value="loading" disabled>Loading...</SelectItem>
                  ) : (
                    universityTypes.map((type) => (
                      <SelectItem key={type.university_type} value={type.university_type}>
                        {type.university_type} ({type.universities_count})
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