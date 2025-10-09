'use client';

import { useState, useEffect } from 'react';
import { UniversitySearch, UniversityGrid } from '@/features/universities';
import { SavedUniversitiesGrid } from '@/features/saved-universities';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface UniversityDiscoveryProps {
  className?: string;
}

export function UniversityDiscovery({ className }: UniversityDiscoveryProps) {
  const [searchParams, setSearchParams] = useState<
    { query: string; type: string } | undefined
  >();
  const [activeTab, setActiveTab] = useState<string>('search');

  // Load active tab from localStorage on mount
  useEffect(() => {
    const savedTab = localStorage.getItem('university-discovery-tab');
    if (savedTab && (savedTab === 'search' || savedTab === 'saved')) {
      setActiveTab(savedTab);
    }
  }, []);

  // Save active tab to localStorage when it changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem('university-discovery-tab', value);
  };

  const handleSearch = (params: { query: string; type: string }) => {
    setSearchParams(params);
  };

  return (
    <div className={`min-h-screen bg-background ${className}`}>
      <div className='container mx-auto px-4 py-6 max-w-7xl'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-foreground mb-2'>
            University Discovery
          </h1>
          <p className='text-muted-foreground'>
            Find and explore universities by type
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className='space-y-6'
        >
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='search'>Search & Discover</TabsTrigger>
            <TabsTrigger value='saved'>Saved Universities</TabsTrigger>
          </TabsList>

          <TabsContent value='search' className='space-y-6'>
            <UniversitySearch onSearch={handleSearch} />
            <UniversityGrid searchParams={searchParams} />
          </TabsContent>

          <TabsContent value='saved' className='space-y-6'>
            <SavedUniversitiesGrid limit={20} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
