'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, MapPin, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UniversityCardProps {
    name: string;
    index: number;
    isBlurred?: boolean;
    onViewDetails?: (university: string) => void;
    onSave?: (university: string) => void;
}

export function UniversityCard({
    name,
    index,
    isBlurred = false,
    onSave
}: UniversityCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    // Extract university name and country from the format "University Name (Country)"
    const parseUniversityName = (fullName: string) => {
        const match = fullName.match(/^(.+?)\s*\(([^)]+)\)$/);
        if (match) {
            return {
                name: match[1].trim(),
                country: match[2].trim()
            };
        }
        return {
            name: fullName,
            country: ''
        };
    };

    const { name: universityName, country } = parseUniversityName(name);

    const handleSave = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsSaved(!isSaved);
        onSave?.(name);
    };

    return (
        <Card
            className={cn(
                "p-2",
                "group relative overflow-hidden transition-all duration-300 ease-out",
                "hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1",
                "border border-border/50 hover:border-primary/30",
                "bg-gradient-to-br from-card to-card/80",
                isBlurred && "blur-sm opacity-60 pointer-events-none",
                "animate-in fade-in-0 slide-in-from-bottom-4",
                "hover:scale-[1.02]"
            )}
            style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'both'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Gradient overlay on hover */}
            <div
                className={cn(
                    "absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5",
                    "opacity-0 transition-opacity duration-300",
                    isHovered && "opacity-100"
                )}
            />

            {/* Save button */}
            <button
                onClick={handleSave}
                className={cn(
                    "absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-200",
                    "bg-background/80 backdrop-blur-sm border border-border/50",
                    "hover:bg-background hover:border-primary/50",
                    "opacity-0 group-hover:opacity-100 cursor-pointer",
                    isSaved && "opacity-100 text-red-500"
                )}
                aria-label={isSaved ? "Remove from saved" : "Save university"}
            >
                <Heart
                    className={cn(
                        "w-4 h-4 transition-all duration-200",
                        isSaved && "fill-current scale-110"
                    )}
                />
            </button>

            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                            <Building2 className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200 break-words leading-tight">
                                {universityName}
                            </CardTitle>
                            {country && (
                                <div className="flex items-center gap-2 mt-1">
                                    <MapPin className="w-3 h-3 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">{country}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </CardHeader>


            {/* Subtle border animation */}
            <div
                className={cn(
                    "absolute inset-0 rounded-xl border-2 border-transparent",
                    "bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20",
                    "opacity-0 transition-opacity duration-300",
                    isHovered && "opacity-100"
                )}
                style={{
                    background: 'linear-gradient(45deg, transparent, transparent)',
                    backgroundClip: 'padding-box',
                    WebkitBackgroundClip: 'padding-box'
                }}
            />
        </Card>
    );
}
