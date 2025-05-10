import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Plus, Calendar, BarChart3, Flame, CheckCircle } from "lucide-react";
import { CurrentPlanOverview } from "@/components/current-plan-overview";
import { api } from "@/trpc/server";

export default async function AppPage() {
  const userPlans = await api.user.getUserWorkoutPlans();
  const hasActivePlan = userPlans.length > 0;

  const weeklyStreak = {
    current: 8,
    best: 12,
    weeks: [
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        {hasActivePlan ? (
          <CurrentPlanOverview plan={userPlans[0]} />
        ) : (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">No Active Plan</h2>
                  <p className="text-muted-foreground">
                    Start your fitness journey today
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-orange-500/5 border-orange-500/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      Predefined Plans
                    </CardTitle>
                    <CardDescription>
                      Choose from our curated workout plans
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/app/plans">
                      <Button className="w-full bg-orange-500 hover:bg-orange-600">
                        <Calendar className="mr-2 h-4 w-4" />
                        Browse Plans
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="bg-secondary/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Custom Plan</CardTitle>
                    <CardDescription>
                      Create your own workout routine
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/plans/create">
                      <Button
                        variant="outline"
                        className="w-full border-orange-500/20 hover:bg-orange-500/10 hover:text-orange-500"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Create Custom
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  Why Choose a Predefined Plan?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    Expert-designed workout routines
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    Progressive difficulty levels
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    Balanced exercise selection
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
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
            <CardDescription>Consecutive weeks with workouts</CardDescription>
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
                  <div className="font-semibold">{weeklyStreak.best} weeks</div>
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
  );
}
