"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, DollarSign, Target, TrendingUp } from "lucide-react";

export function ScholarshipsSection() {
  const scholarships = [
    {
      name: "Merit Scholarship",
      amount: "$25,000",
      university: "Stanford",
      match: "95%",
      matchColor: "bg-green-100 text-green-800",
      icon: Target,
    },
    {
      name: "International Student Aid",
      amount: "$15,000",
      university: "MIT",
      match: "87%",
      matchColor: "bg-blue-100 text-blue-800",
      icon: TrendingUp,
    },
  ];

  return (
    <Card className="mb-6 md:mb-8">
      <CardHeader className="flex flex-row items-center justify-between p-4 md:p-6">
        <CardTitle className="text-base md:text-lg font-semibold">
          My Scholarships
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-600 hover:text-blue-700 text-xs md:text-sm"
        >
          Find More
          <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0">
        <p className="text-xs md:text-sm text-gray-600 mb-4">
          Financial aid opportunities
        </p>
        <div className="space-y-3 md:space-y-4">
          {scholarships.map((scholarship, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 md:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-2 md:space-x-3 flex-1 min-w-0">
                <div className="p-1.5 md:p-2 bg-green-100 rounded-lg flex-shrink-0">
                  <DollarSign className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm md:text-base truncate">
                    {scholarship.name}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-600 truncate">
                    {scholarship.amount} - {scholarship.university}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <Badge className={`${scholarship.matchColor} text-xs`}>
                  <scholarship.icon className="w-2.5 h-2.5 md:w-3 md:h-3 mr-1" />
                  {scholarship.match} Match
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
