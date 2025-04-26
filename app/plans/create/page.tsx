"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CreatePlanPage() {
  const router = useRouter()
  const [planName, setPlanName] = useState("")
  const [days, setDays] = useState([{ id: "1", name: "Day 1" }])

  const addDay = () => {
    const newDay = {
      id: String(days.length + 1),
      name: `Day ${days.length + 1}`,
    }
    setDays([...days, newDay])
  }

  const updateDayName = (id: string, name: string) => {
    setDays(days.map((day) => (day.id === id ? { ...day, name } : day)))
  }

  const removeDay = (id: string) => {
    if (days.length > 1) {
      setDays(days.filter((day) => day.id !== id))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would save the plan to your state management or API
    // For now, we'll just navigate back to the plans page
    router.push("/plans")
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/plans">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Create Plan</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Plan Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="plan-name">Plan Name</Label>
                <Input
                  id="plan-name"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  placeholder="e.g., 5-Day Split"
                  required
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Workout Days</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addDay} className="h-8">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Day
                  </Button>
                </div>

                {days.map((day) => (
                  <div key={day.id} className="flex items-center gap-2">
                    <Input
                      value={day.name}
                      onChange={(e) => updateDayName(day.id, e.target.value)}
                      placeholder="Day name"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeDay(day.id)}
                      disabled={days.length <= 1}
                      className="h-10 w-10 text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                Create Plan
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </main>
  )
}
