import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Dumbbell,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/0 overflow-x-clip">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Full-width Hero Gradient, only in hero section */}
        <div className="absolute left-0 top-0 w-full h-full -z-10 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-tr from-orange-500 to-orange-600 opacity-20 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-6 pt-8 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:py-32">
            <div className="text-center">
              <div className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-orange-500/10 text-orange-500 ring-1 ring-inset ring-orange-500/20 mb-8">
                <Sparkles className="h-4 w-4 mr-2" />
                Transform Your Fitness Journey
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-600">
                Your Personal Fitness
                <br />
                Success Story
              </h1>
              <p className="mt-6 md:text-lg leading-8 text-muted-foreground">
                Track your workouts, follow expert-designed plans, and achieve
                your fitness goals with our comprehensive workout tracking
                platform.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link href="/app">
                  <Button
                    size="lg"
                    className="bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/25"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-orange-500/5 border border-orange-500/10">
              <Trophy className="h-8 w-8 text-orange-500 mb-4" />
              <div className="text-3xl font-bold text-orange-500">10k+</div>
              <div className="text-sm text-muted-foreground mt-1">
                Workouts Completed
              </div>
            </div>
            <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-orange-500/5 border border-orange-500/10">
              <Users className="h-8 w-8 text-orange-500 mb-4" />
              <div className="text-3xl font-bold text-orange-500">5k+</div>
              <div className="text-sm text-muted-foreground mt-1">
                Active Users
              </div>
            </div>
            <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-orange-500/5 border border-orange-500/10">
              <Dumbbell className="h-8 w-8 text-orange-500 mb-4" />
              <div className="text-3xl font-bold text-orange-500">100+</div>
              <div className="text-sm text-muted-foreground mt-1">
                Workout Plans
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <div className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-orange-500/10 text-orange-500 ring-1 ring-inset ring-orange-500/20 mb-8">
              <Sparkles className="h-4 w-4 mr-2" />
              Everything you need
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-600">
              Features that help you succeed
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our platform provides all the tools you need to track, plan, and
              achieve your fitness goals.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col p-8 rounded-2xl bg-orange-500/5 border border-orange-500/10">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                    <Dumbbell className="h-6 w-6 text-orange-500" />
                  </div>
                  Expert Workout Plans
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Access professionally designed workout plans tailored to
                    your goals and fitness level.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col p-8 rounded-2xl bg-orange-500/5 border border-orange-500/10">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                    <CheckCircle className="h-6 w-6 text-orange-500" />
                  </div>
                  Progress Tracking
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Monitor your progress with detailed analytics and streak
                    tracking to stay motivated.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col p-8 rounded-2xl bg-orange-500/5 border border-orange-500/10">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                    <ArrowRight className="h-6 w-6 text-orange-500" />
                  </div>
                  Custom Workouts
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Create and customize your own workout routines to match your
                    specific needs.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative isolate">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16 bg-orange-500/5 border border-orange-500/10">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-600">
              Ready to start your fitness journey?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Join thousands of users who have transformed their fitness with
              our platform.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/app">
                <Button
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/25"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
