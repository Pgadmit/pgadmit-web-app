'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Calendar, ExternalLink, Heart, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import type { University } from '@/entities/universities';

interface UniversityDetailProps {
    university: University;
    className?: string;
}

export function UniversityDetail({ university, className }: UniversityDetailProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [isBookmarked, setIsBookmarked] = useState(false);

    const toggleBookmark = () => {
        setIsBookmarked(!isBookmarked);
        toast({
            title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
            description: isBookmarked
                ? "University removed from your saved universities"
                : "University added to your saved universities",
        });
    };

    const formatLocation = () => {
        const parts = [university.city, university.state_province, university.country].filter(Boolean);
        return parts.join(', ');
    };

    const formatStudents = () => {
        if (!university.students_total) return 'N/A';

        const totalStudents = parseInt(university.students_total.replace(/[^\d]/g, ''), 10);
        if (isNaN(totalStudents)) return university.students_total;

        const international = university.international_students_percent
            ? Math.round(totalStudents * university.international_students_percent / 100)
            : 0;
        return `${totalStudents.toLocaleString()} (${international.toLocaleString()} international)`;
    };

    return (
        <div className={`min-h-screen bg-background ${className}`}>
            <div className="container mx-auto px-4 py-6 max-w-4xl">
                {/* Header */}
                <div className="mb-6">
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        className="mb-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                    </Button>

                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-foreground mb-2">
                                {university.name}
                            </h1>
                            <div className="flex items-center text-muted-foreground mb-4">
                                <MapPin className="h-4 w-4 mr-1" />
                                {formatLocation()}
                            </div>
                            <div className="flex gap-2">
                                <Badge variant="secondary">
                                    {university.university_type || 'University'}
                                </Badge>
                                {university.qs_world_ranking && (
                                    <Badge variant="outline">
                                        QS #{university.qs_world_ranking}
                                    </Badge>
                                )}
                                {university.us_news_ranking && (
                                    <Badge variant="outline">
                                        US News #{university.us_news_ranking}
                                    </Badge>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-2 ml-4">
                            <Button
                                variant="outline"
                                onClick={toggleBookmark}
                                className="flex items-center gap-2"
                            >
                                <Heart className={`h-4 w-4 ${isBookmarked ? 'fill-red-500 text-red-500' : ''}`} />
                                {isBookmarked ? 'Saved' : 'Save'}
                            </Button>
                            {university.website_url && (
                                <Button
                                    onClick={() => window.open(university.website_url, '_blank')}
                                    className="flex items-center gap-2"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                    Website
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Description */}
                        <Card>
                            <CardHeader>
                                <CardTitle>About</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    {university.description || 'No description available.'}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Programs */}
                        {university.programs && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Programs</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {university.programs.split(',').map((program, index) => (
                                            <Badge key={index} variant="outline">
                                                {program.trim()}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Requirements */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Requirements</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-medium mb-2">Minimum GPA</h4>
                                        <p className="text-muted-foreground">
                                            {university.minimum_gpa || 'N/A'}
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium mb-2">Average GPA (Admitted)</h4>
                                        <p className="text-muted-foreground">
                                            {university.average_gpa_admitted || 'N/A'}
                                        </p>
                                    </div>
                                </div>

                                {university.required_tests_undergrad && (
                                    <div>
                                        <h4 className="font-medium mb-2">Required Tests</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {university.required_tests_undergrad
                                                .split(',')
                                                .map((test, index) => (
                                                    <Badge key={index} variant="secondary">
                                                        {test.trim()}
                                                    </Badge>
                                                ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Stats */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Statistics</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Total Students</span>
                                    <div className="flex items-center">
                                        <Users className="h-4 w-4 mr-1" />
                                        <span className="font-medium">{formatStudents()}</span>
                                    </div>
                                </div>

                                {university.application_fee && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Application Fee</span>
                                        <span className="font-medium">${university.application_fee}</span>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Deadlines */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Application Deadlines</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {university.application_deadline_early && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Early Action</span>
                                        <div className="flex items-center">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            <span className="font-medium">{university.application_deadline_early}</span>
                                        </div>
                                    </div>
                                )}

                                {university.application_deadline_international && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">International</span>
                                        <div className="flex items-center">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            <span className="font-medium">{university.application_deadline_international}</span>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Campus Life */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Campus Life</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {university.accommodation_options && (
                                    <div>
                                        <h4 className="font-medium mb-1">Housing</h4>
                                        <p className="text-sm text-muted-foreground">
                                            {university.accommodation_options}
                                        </p>
                                    </div>
                                )}

                                {university.campus_size_setting && (
                                    <div>
                                        <h4 className="font-medium mb-1">Campus Setting</h4>
                                        <p className="text-sm text-muted-foreground">
                                            {university.campus_size_setting}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
