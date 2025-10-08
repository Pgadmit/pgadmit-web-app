'use client';

import { useState } from 'react';
import { UniversitySearch, UniversityGrid } from '@/features/universities';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface UniversityDiscoveryProps {
  className?: string;
}

export function UniversityDiscovery({ className }: UniversityDiscoveryProps) {
  const [searchParams, setSearchParams] = useState<{ query: string; type: string } | undefined>();

  const handleSearch = (params: { query: string; type: string }) => {
    setSearchParams(params);
  };

  return (
    <div className={`min-h-screen bg-background ${className}`}>
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">University Discovery</h1>
          <p className="text-muted-foreground">Find and explore universities by type</p>
        </div>

        <Tabs defaultValue="search" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search">Search & Discover</TabsTrigger>
            <TabsTrigger value="saved">Saved Universities</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            <UniversitySearch onSearch={handleSearch} />
            <UniversityGrid searchParams={searchParams} />
          </TabsContent>

          <TabsContent value="saved">
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-4">Saved Universities</h3>
              <p className="text-muted-foreground mb-6">
                Your bookmarked universities will appear here
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

