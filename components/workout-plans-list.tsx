"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Edit, Play } from "lucide-react";

// Mock data for workout plans
const MOCK_PLANS = [
  {
    id: "1",
    name: "5-Day Split",
    days: [
      { id: "1", name: "Day 1: Biceps & Chest" },
      { id: "2", name: "Day 2: Back & Triceps" },
      { id: "3", name: "Day 3: Shoulders" },
      { id: "4", name: "Day 4: Legs" },
      { id: "5", name: "Day 5: Core & Cardio" },
    ],
    progress: 2, // Completed days this week
  },
  {
    id: "2",
    name: "3-Day Full Body",
    days: [
      { id: "1", name: "Day 1: Upper Body" },
      { id: "2", name: "Day 2: Lower Body" },
      { id: "3", name: "Day 3: Full Body" },
    ],
    progress: 1, // Completed days this week
  },
];

export function WorkoutPlansList() {
  const [plans, setPlans] = useState(MOCK_PLANS);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
      {plans.map((plan) => (
        <Card key={plan.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>{plan.name}</CardTitle>
              <Badge
                variant="outline"
                className="bg-orange-500/10 text-orange-500 border-orange-500/20"
              >
                {plan.days.length} days
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="grid gap-2">
              {plan.days.map((day) => (
                <div
                  key={day.id}
                  className="flex justify-between items-center py-2 border-b border-gray-800"
                >
                  <span className="text-sm">{day.name}</span>
                  <Link href={`/workout/start/${plan.id}/${day.id}`}>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Play className="h-4 w-4 text-orange-500" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-2">
            <div className="text-xs text-muted-foreground">
              {plan.progress}/{plan.days.length} completed this week
            </div>
            <div className="flex gap-2">
              <Link href={`/plans/edit/${plan.id}`}>
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
