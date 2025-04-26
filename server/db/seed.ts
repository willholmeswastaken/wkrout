import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

async function main() {
  // Seed exercises
  const exercises = [
    { name: "Bench Press", muscleGroup: "Chest" },
    { name: "Squat", muscleGroup: "Legs" },
    { name: "Deadlift", muscleGroup: "Back" },
    { name: "Overhead Press", muscleGroup: "Shoulders" },
    { name: "Barbell Row", muscleGroup: "Back" },
    { name: "Pull Up", muscleGroup: "Back" },
    { name: "Tricep Pushdown", muscleGroup: "Arms" },
    { name: "Bicep Curl", muscleGroup: "Arms" },
    { name: "Lunge", muscleGroup: "Legs" },
    { name: "Leg Curl", muscleGroup: "Legs" },
  ];

  // Insert exercises and get their IDs
  const insertedExercises = await db
    .insert(schema.exercises as any)
    .values(exercises)
    .onConflictDoNothing()
    .returning() as { id: number; name: string }[];

  // Seed workout plan
  const [plan] = await db
    .insert(schema.workoutPlans as any)
    .values({
      name: "Push Pull Legs",
      description: "Classic PPL split",
      isPredefined: true,
      days: 3,
    })
    .onConflictDoNothing()
    .returning() as { id: number }[];

  // Seed workout plan days
  const days = await db
    .insert(schema.workoutPlanDays as any)
    .values([
      { workoutPlanId: plan.id, name: "Push Strength", dayOrder: 1 },
      { workoutPlanId: plan.id, name: "Pull Strength", dayOrder: 2 },
      { workoutPlanId: plan.id, name: "Legs", dayOrder: 3 },
    ])
    .onConflictDoNothing()
    .returning() as { id: number; dayOrder: number }[];

  // Helper to get exercise ID by name
  const getExerciseId = (name: string) => {
    const ex = insertedExercises.find((e) => e.name === name);
    if (!ex) throw new Error(`Exercise not found: ${name}`);
    return ex.id;
  };

  // Seed workout plan exercises
  await db.insert(schema.workoutPlanExercises as any).values([
    // Push Day
    {
      workoutPlanId: plan.id,
      exerciseId: getExerciseId("Bench Press"),
      workoutPlanDayId: days.find((d) => d.dayOrder === 1)!.id,
      orderInDay: 1,
    },
    {
      workoutPlanId: plan.id,
      exerciseId: getExerciseId("Overhead Press"),
      workoutPlanDayId: days.find((d) => d.dayOrder === 1)!.id,
      orderInDay: 2,
    },
    {
      workoutPlanId: plan.id,
      exerciseId: getExerciseId("Tricep Pushdown"),
      workoutPlanDayId: days.find((d) => d.dayOrder === 1)!.id,
      orderInDay: 3,
    },
    // Pull Day
    {
      workoutPlanId: plan.id,
      exerciseId: getExerciseId("Barbell Row"),
      workoutPlanDayId: days.find((d) => d.dayOrder === 2)!.id,
      orderInDay: 1,
    },
    {
      workoutPlanId: plan.id,
      exerciseId: getExerciseId("Pull Up"),
      workoutPlanDayId: days.find((d) => d.dayOrder === 2)!.id,
      orderInDay: 2,
    },
    {
      workoutPlanId: plan.id,
      exerciseId: getExerciseId("Bicep Curl"),
      workoutPlanDayId: days.find((d) => d.dayOrder === 2)!.id,
      orderInDay: 3,
    },
    // Legs Day
    {
      workoutPlanId: plan.id,
      exerciseId: getExerciseId("Squat"),
      workoutPlanDayId: days.find((d) => d.dayOrder === 3)!.id,
      orderInDay: 1,
    },
    {
      workoutPlanId: plan.id,
      exerciseId: getExerciseId("Lunge"),
      workoutPlanDayId: days.find((d) => d.dayOrder === 3)!.id,
      orderInDay: 2,
    },
    {
      workoutPlanId: plan.id,
      exerciseId: getExerciseId("Leg Curl"),
      workoutPlanDayId: days.find((d) => d.dayOrder === 3)!.id,
      orderInDay: 3,
    },
    {
      workoutPlanId: plan.id,
      exerciseId: getExerciseId("Deadlift"),
      workoutPlanDayId: days.find((d) => d.dayOrder === 3)!.id,
      orderInDay: 4,
    },
  ]);

  await pool.end();
  console.log("Seeding complete!");
}

main().catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
