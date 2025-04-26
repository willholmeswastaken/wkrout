import {
  pgTable,
  serial,
  varchar,
  integer,
  boolean,
  timestamp,
  text,
  date,
  index,
  unique,
  numeric,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    name: varchar("name", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    isSubscribed: boolean("is_subscribed").default(false).notNull(),
  },
  (table) => [index("email_idx").on(table.email)]
);

// Exercises table
export const exercises = pgTable(
  "exercises",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull().unique(),
    muscleGroup: varchar("muscle_group", { length: 100 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("muscle_group_idx").on(table.muscleGroup)]
);

// Workout plans table
export const workoutPlans = pgTable("workout_plans", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  isPredefined: boolean("is_predefined").default(false).notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Workout plan days table (named days for plans)
export const workoutPlanDays = pgTable(
  "workout_plan_days",
  {
    id: serial("id").primaryKey(),
    workoutPlanId: integer("workout_plan_id")
      .notNull()
      .references(() => workoutPlans.id),
    name: varchar("name", { length: 100 }).notNull(), // e.g. "Push Strength"
    dayOrder: integer("day_order").notNull(), // 1 = first day, 2 = second day, etc.
  },
  (table) => [
    index("workout_plan_days_plan_id_idx").on(table.workoutPlanId),
    unique("workout_plan_days_unique_idx").on(table.workoutPlanId, table.dayOrder),
  ]
);

// Workout plan exercises (many-to-many, with named day and order)
export const workoutPlanExercises = pgTable(
  "workout_plan_exercises",
  {
    id: serial("id").primaryKey(),
    workoutPlanId: integer("workout_plan_id")
      .notNull()
      .references(() => workoutPlans.id),
    exerciseId: integer("exercise_id")
      .notNull()
      .references(() => exercises.id),
    workoutPlanDayId: integer("workout_plan_day_id")
      .notNull()
      .references(() => workoutPlanDays.id),
    orderInDay: integer("order_in_day").notNull(),
  },
  (table) => [
    index("workout_plan_id_idx").on(table.workoutPlanId),
    index("exercise_id_idx").on(table.exerciseId),
    index("workout_plan_day_id_idx").on(table.workoutPlanDayId),
    unique("workout_plan_exercises_unique_idx").on(
      table.workoutPlanId,
      table.exerciseId,
      table.workoutPlanDayId,
      table.orderInDay
    ),
  ]
);

// User workout plans (user's configured plans)
export const userWorkoutPlans = pgTable(
  "user_workout_plans",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    workoutPlanId: integer("workout_plan_id")
      .notNull()
      .references(() => workoutPlans.id),
    customName: varchar("custom_name", { length: 255 }),
    daysPerWeek: integer("days_per_week").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("user_workout_plans_user_id_idx").on(table.userId),
    index("user_workout_plans_workout_plan_id_idx").on(table.workoutPlanId),
    unique("user_workout_plans_unique_idx").on(
      table.userId,
      table.workoutPlanId
    ),
  ]
);

// User workouts (tracks completed workouts)
export const userWorkouts = pgTable(
  "user_workouts",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    userWorkoutPlanId: integer("user_workout_plan_id")
      .notNull()
      .references(() => userWorkoutPlans.id),
    startedAt: date("started_at").notNull(),
    completedAt: date("completed_at"),
    notes: text("notes"),
    rating: integer("rating").notNull().default(0),
  },
  (table) => [
    index("user_workouts_user_id_idx").on(table.userId),
    index("user_workouts_user_workout_plan_id_idx").on(table.userWorkoutPlanId),
    index("user_workouts_user_id_started_at_idx").on(
      table.userId,
      table.startedAt
    ),
  ]
);

// User workout sets (records reps and weight per set per exercise in a workout)
export const userWorkoutSets = pgTable(
  "user_workout_sets",
  {
    id: serial("id").primaryKey(),
    userWorkoutId: integer("user_workout_id")
      .notNull()
      .references(() => userWorkouts.id, { onDelete: "cascade" }),
    exerciseId: integer("exercise_id")
      .notNull()
      .references(() => exercises.id, { onDelete: "cascade" }),
    setNumber: integer("set_number").notNull(),
    reps: integer("reps").notNull(),
    weight: numeric("weight", { precision: 6, scale: 2 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("user_workout_sets_user_workout_id_idx").on(table.userWorkoutId),
    index("user_workout_sets_exercise_id_idx").on(table.exerciseId),
    unique("user_workout_sets_unique_idx").on(
      table.userWorkoutId,
      table.exerciseId,
      table.setNumber
    ),
  ]
);
