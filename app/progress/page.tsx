"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { ArrowLeft, Calendar, TrendingUp } from "lucide-react"
import { WorkoutProgressChart } from "@/components/workout-progress-chart"
import { WorkoutCalendar } from "@/components/workout-calendar"

export default function ProgressPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Progress</h1>
        </div>

        <Tabs defaultValue="charts">
          <TabsList className="w-full mb-4 max-w-md">
            <TabsTrigger value="charts" className="flex-1">
              <TrendingUp className="h-4 w-4 mr-2" />
              Charts
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex-1">
              <Calendar className="h-4 w-4 mr-2" />
              Calendar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="charts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Workout Volume</CardTitle>
                </CardHeader>
                <CardContent>
                  <WorkoutProgressChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Exercise Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Bench Press (Max Weight)</h3>
                      <div className="h-2 bg-gray-800 rounded-full">
                        <div className="h-full bg-orange-500 rounded-full" style={{ width: "65%" }} />
                      </div>
                      <div className="flex justify-between mt-1 text-xs">
                        <span>60kg</span>
                        <span className="text-orange-500">+10kg in 30 days</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Squat (Max Weight)</h3>
                      <div className="h-2 bg-gray-800 rounded-full">
                        <div className="h-full bg-orange-500 rounded-full" style={{ width: "75%" }} />
                      </div>
                      <div className="flex justify-between mt-1 text-xs">
                        <span>100kg</span>
                        <span className="text-orange-500">+15kg in 30 days</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Shoulder Press (Max Weight)</h3>
                      <div className="h-2 bg-gray-800 rounded-full">
                        <div className="h-full bg-orange-500 rounded-full" style={{ width: "45%" }} />
                      </div>
                      <div className="flex justify-between mt-1 text-xs">
                        <span>40kg</span>
                        <span className="text-orange-500">+5kg in 30 days</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="calendar">
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle>Workout Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <WorkoutCalendar />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
