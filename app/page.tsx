import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  Dumbbell,
  Plus,
  Calendar,
  BarChart3,
  Settings,
  Flame,
} from "lucide-react";
import { CurrentPlanOverview } from "@/components/current-plan-overview";

export default function Home() {
  // Mock data for weekly streak
  const weeklyStreak = {
    current: 8, // Current streak in weeks
    best: 12, // Best streak ever achieved
    weeks: [
      // Last 10 weeks, true = at least one workout logged that week
      { active: true, date: "Apr 19-25" },
      { active: true, date: "Apr 12-18" },
      { active: true, date: "Apr 5-11" },
      { active: true, date: "Mar 29-Apr 4" },
      { active: true, date: "Mar 22-28" },
      { active: true, date: "Mar 15-21" },
      { active: true, date: "Mar 8-14" },
      { active: true, date: "Mar 1-7" },
      { active: false, date: "Feb 23-29" },
      { active: false, date: "Feb 16-22" },
    ],
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Dumbbell className="h-6 w-6 text-orange-500 mr-2" />
            <h1 className="text-2xl font-bold">Wrkout</h1>
          </div>
          <Link href="/settings">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Plan Overview - Takes 2/3 of the screen on desktop */}
          <div className="lg:col-span-2">
            <CurrentPlanOverview />
          </div>

          {/* Quick Actions - Takes 1/3 of the screen on desktop */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">My Plans</CardTitle>
                </CardHeader>
                <CardContent>
                  <Link href="/plans">
                    <Button
                      variant="outline"
                      className="w-full border-orange-500/20 hover:bg-orange-500/10 hover:text-orange-500"
                    >
                      <Calendar className="mr-2 h-4 w-4 text-orange-500" />
                      View Plans
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <Link href="/progress">
                    <Button
                      variant="outline"
                      className="w-full border-orange-500/20 hover:bg-orange-500/10 hover:text-orange-500"
                    >
                      <BarChart3 className="mr-2 h-4 w-4 text-orange-500" />
                      Analytics
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">Weekly Streak</CardTitle>
                  <div className="flex items-center">
                    <Flame className="h-4 w-4 text-orange-500 mr-1" />
                    <span className="text-lg font-bold text-orange-500">
                      {weeklyStreak.current}
                    </span>
                  </div>
                </div>
                <CardDescription>
                  Consecutive weeks with workouts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Streak visualization */}
                  <div className="flex gap-1">
                    {weeklyStreak.weeks.map((week, index) => (
                      <div
                        key={index}
                        className={`h-2 flex-1 rounded-full ${
                          week.active ? "bg-orange-500" : "bg-gray-700"
                        }`}
                        title={week.date}
                      />
                    ))}
                  </div>

                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>10 weeks ago</span>
                    <span>Current</span>
                  </div>

                  <div className="pt-2 flex justify-between items-center">
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Best streak
                      </div>
                      <div className="font-semibold">
                        {weeklyStreak.best} weeks
                      </div>
                    </div>

                    <Link href="/plans/create">
                      <Button
                        size="sm"
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        New Plan
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
