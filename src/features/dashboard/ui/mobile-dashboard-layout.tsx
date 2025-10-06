"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Search,
    MapPin,
    DollarSign,
    Calendar,
    TrendingUp,
    BookOpen,
    Target,
    Award,
    Clock,
    CheckCircle,
    AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileSearchBar } from "./mobile-search-bar";
import { MobileFiltersDrawer } from "./mobile-filters-drawer";

interface FilterState {
    search: string;
    country: string;
    tuitionRange: string;
    ranking: string;
    program: string;
    deadline: string;
    applicationStatus: string[];
}

interface MobileDashboardLayoutProps {
    className?: string;
}

export function MobileDashboardLayout({ className }: MobileDashboardLayoutProps) {
    const [showSearch, setShowSearch] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
        search: "",
        country: "",
        tuitionRange: "",
        ranking: "",
        program: "",
        deadline: "",
        applicationStatus: [],
    });

    // Prevent horizontal scroll
    useEffect(() => {
        document.body.style.overflowX = "hidden";
        return () => {
            document.body.style.overflowX = "auto";
        };
    }, []);

    const handleSearch = (query: string) => {
        setFilters(prev => ({ ...prev, search: query }));
        setShowSearch(false);
    };

    const handleFiltersChange = (newFilters: FilterState) => {
        setFilters(newFilters);
    };

    const mockData = {
        stats: [
            { label: "Applications", value: "12", change: "+2", trend: "up" },
            { label: "Accepted", value: "3", change: "+1", trend: "up" },
            { label: "Pending", value: "7", change: "-1", trend: "down" },
            { label: "Deadlines", value: "5", change: "0", trend: "neutral" },
        ],
        applications: [
            {
                id: 1,
                university: "Stanford University",
                program: "Computer Science",
                status: "under-review",
                deadline: "2024-02-15",
                progress: 85,
                country: "USA",
                tuition: "$56,169",
            },
            {
                id: 2,
                university: "MIT",
                program: "Engineering",
                status: "accepted",
                deadline: "2024-01-30",
                progress: 100,
                country: "USA",
                tuition: "$57,986",
            },
            {
                id: 3,
                university: "University of Cambridge",
                program: "Mathematics",
                status: "in-progress",
                deadline: "2024-03-01",
                progress: 60,
                country: "UK",
                tuition: "£33,825",
            },
        ],
        deadlines: [
            { university: "Harvard", deadline: "2024-02-01", status: "urgent" },
            { university: "Oxford", deadline: "2024-02-15", status: "upcoming" },
            { university: "Yale", deadline: "2024-03-01", status: "upcoming" },
        ],
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "accepted": return "bg-green-100 text-green-800";
            case "rejected": return "bg-red-100 text-red-800";
            case "under-review": return "bg-blue-100 text-blue-800";
            case "in-progress": return "bg-yellow-100 text-yellow-800";
            case "waitlisted": return "bg-orange-100 text-orange-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "accepted": return <CheckCircle className="h-4 w-4" />;
            case "rejected": return <AlertCircle className="h-4 w-4" />;
            case "under-review": return <Clock className="h-4 w-4" />;
            case "in-progress": return <Target className="h-4 w-4" />;
            case "waitlisted": return <Clock className="h-4 w-4" />;
            default: return <Clock className="h-4 w-4" />;
        }
    };

    return (
        <div className={cn("min-h-screen bg-background w-full overflow-x-hidden mobile-no-scroll", className)} style={{ maxWidth: '100vw' }}>
            {/* Search Bar */}
            {showSearch && (
                <div className="p-4 border-b bg-background w-full">
                    <MobileSearchBar
                        onSearch={handleSearch}
                        onFiltersClick={() => { }} // Will be handled by MobileFiltersDrawer
                        placeholder="Search universities, programs..."
                    />
                </div>
            )}

            {/* Main Content */}
            <main className="p-4 space-y-6 w-full overflow-x-hidden mobile-no-scroll" style={{ maxWidth: '100vw' }}>
                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4">
                    {mockData.stats.map((stat, index) => (
                        <Card key={index} className="p-4 min-w-0">
                            <div className="flex items-center justify-between">
                                <div className="min-w-0 flex-1">
                                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                                    <p className="text-sm text-muted-foreground truncate">{stat.label}</p>
                                </div>
                                <div className={cn(
                                    "flex items-center gap-1 text-xs font-medium flex-shrink-0",
                                    stat.trend === "up" ? "text-green-600" :
                                        stat.trend === "down" ? "text-red-600" : "text-gray-600"
                                )}>
                                    <TrendingUp className={cn(
                                        "h-3 w-3",
                                        stat.trend === "down" && "rotate-180"
                                    )} />
                                    {stat.change}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex gap-2">
                            <Button
                                className="flex-1 min-w-0"
                                size="sm"
                                onClick={() => setShowSearch(!showSearch)}
                            >
                                <Search className="h-4 w-4 mr-2" />
                                <span className="truncate">{showSearch ? "Hide Search" : "Search"}</span>
                            </Button>
                            <MobileFiltersDrawer
                                onFiltersChange={handleFiltersChange}
                                initialFilters={filters}
                                className="flex-1 min-w-0"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" size="sm" className="min-w-0">
                                <BookOpen className="h-4 w-4 mr-2" />
                                <span className="truncate">Browse Programs</span>
                            </Button>
                            <Button variant="outline" size="sm" className="min-w-0">
                                <Award className="h-4 w-4 mr-2" />
                                <span className="truncate">Scholarships</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Applications */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Recent Applications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {mockData.applications.map((app) => (
                            <div key={app.id} className="border rounded-lg p-4 space-y-3">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1 min-w-0 flex-1">
                                        <h4 className="font-semibold text-foreground truncate">{app.university}</h4>
                                        <p className="text-sm text-muted-foreground truncate">{app.program}</p>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <MapPin className="h-3 w-3 flex-shrink-0" />
                                            <span className="truncate">{app.country}</span>
                                            <DollarSign className="h-3 w-3 ml-2 flex-shrink-0" />
                                            <span className="truncate">{app.tuition}</span>
                                        </div>
                                    </div>
                                    <Badge className={cn("text-xs flex-shrink-0", getStatusColor(app.status))}>
                                        <div className="flex items-center gap-1">
                                            {getStatusIcon(app.status)}
                                            <span className="truncate">{app.status.replace("-", " ")}</span>
                                        </div>
                                    </Badge>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-muted-foreground">Progress</span>
                                        <span className="font-medium">{app.progress}%</span>
                                    </div>
                                    <Progress value={app.progress} className="h-2" />
                                </div>

                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1 min-w-0 flex-1">
                                        <Calendar className="h-3 w-3 flex-shrink-0" />
                                        <span className="truncate">Deadline: {app.deadline}</span>
                                    </div>
                                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs flex-shrink-0">
                                        View Details
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Upcoming Deadlines */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {mockData.deadlines.map((deadline, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="min-w-0 flex-1">
                                    <p className="font-medium text-foreground truncate">{deadline.university}</p>
                                    <p className="text-sm text-muted-foreground truncate">{deadline.deadline}</p>
                                </div>
                                <Badge
                                    variant={deadline.status === "urgent" ? "destructive" : "secondary"}
                                    className="text-xs flex-shrink-0"
                                >
                                    {deadline.status === "urgent" ? "Urgent" : "Upcoming"}
                                </Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}