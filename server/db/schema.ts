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
import { relations } from "drizzle-orm";

export const user = pgTable(
  "user",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").notNull(),
    image: text("image"),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
  },
  (table) => [index("email_idx").on(table.email)]
);

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

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
  days: integer("days").notNull().default(0),
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
    unique("workout_plan_days_unique_idx").on(
      table.workoutPlanId,
      table.dayOrder
    ),
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
  ]
);

// Sets for each workout plan exercise (template-level)
export const workoutPlanExerciseSets = pgTable(
  "workout_plan_exercise_sets",
  {
    id: serial("id").primaryKey(),
    workoutPlanExerciseId: integer("workout_plan_exercise_id")
      .notNull()
      .references(() => workoutPlanExercises.id, { onDelete: "cascade" }),
    set: integer("set_number").notNull(), // 1, 2, 3, ...
    reps: integer("reps").notNull(),
  },
  (table) => [
    index("workout_plan_exercise_sets_exercise_id_idx").on(
      table.workoutPlanExerciseId
    ),
    unique("workout_plan_exercise_sets_unique_idx").on(
      table.workoutPlanExerciseId,
      table.set
    ),
  ]
);

// User workout plans (user's configured plans)
export const userWorkoutPlans = pgTable(
  "user_workout_plans",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
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
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
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

// User workout exercises (tracks exercises performed in a user workout)
export const userWorkoutExercises = pgTable(
  "user_workout_exercises",
  {
    id: serial("id").primaryKey(),
    userWorkoutId: integer("user_workout_id")
      .notNull()
      .references(() => userWorkouts.id, { onDelete: "cascade" }),
    workoutPlanExerciseId: integer("workout_plan_exercise_id").references(
      () => workoutPlanExercises.id
    ),
    exerciseId: integer("exercise_id")
      .notNull()
      .references(() => exercises.id),
  },
  (table) => [
    index("user_workout_exercises_user_workout_id_idx").on(table.userWorkoutId),
    index("user_workout_exercises_workout_plan_exercise_id_idx").on(
      table.workoutPlanExerciseId
    ),
  ]
);

// User workout sets (records reps and weight per set per exercise in a workout)
export const userWorkoutSets = pgTable(
  "user_workout_sets",
  {
    id: serial("id").primaryKey(),
    userWorkoutExerciseId: integer("user_workout_exercise_id")
      .notNull()
      .references(() => userWorkoutExercises.id, { onDelete: "cascade" }),
    setNumber: integer("set_number").notNull(),
    reps: integer("reps").notNull(),
    weight: numeric("weight", { precision: 6, scale: 2 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("user_workout_sets_user_workout_exercise_id_idx").on(
      table.userWorkoutExerciseId
    ),
    unique("user_workout_sets_unique_idx").on(
      table.userWorkoutExerciseId,
      table.setNumber
    ),
  ]
);

export const usersRelations = relations(user, (rel) => ({
  userWorkoutPlans: rel.many(userWorkoutPlans),
  userWorkouts: rel.many(userWorkouts),
}));

export const exercisesRelations = relations(exercises, (rel) => ({
  workoutPlanExercises: rel.many(workoutPlanExercises),
}));

export const workoutPlansRelations = relations(workoutPlans, (rel) => ({
  workoutPlanDays: rel.many(workoutPlanDays),
  workoutPlanExercises: rel.many(workoutPlanExercises),
  userWorkoutPlans: rel.many(userWorkoutPlans),
}));

export const workoutPlanDaysRelations = relations(workoutPlanDays, (rel) => ({
  workoutPlan: rel.one(workoutPlans, {
    fields: [workoutPlanDays.workoutPlanId],
    references: [workoutPlans.id],
  }),
  workoutPlanExercises: rel.many(workoutPlanExercises),
}));

export const workoutPlanExercisesRelations = relations(
  workoutPlanExercises,
  (rel) => ({
    workoutPlan: rel.one(workoutPlans, {
      fields: [workoutPlanExercises.workoutPlanId],
      references: [workoutPlans.id],
    }),
    exercise: rel.one(exercises, {
      fields: [workoutPlanExercises.exerciseId],
      references: [exercises.id],
    }),
    workoutPlanDay: rel.one(workoutPlanDays, {
      fields: [workoutPlanExercises.workoutPlanDayId],
      references: [workoutPlanDays.id],
    }),
    sets: rel.many(workoutPlanExerciseSets),
  })
);

export const workoutPlanExerciseSetsRelations = relations(
  workoutPlanExerciseSets,
  (rel) => ({
    workoutPlanExercise: rel.one(workoutPlanExercises, {
      fields: [workoutPlanExerciseSets.workoutPlanExerciseId],
      references: [workoutPlanExercises.id],
    }),
  })
);

export const userWorkoutPlansRelations = relations(userWorkoutPlans, (rel) => ({
  user: rel.one(user, {
    fields: [userWorkoutPlans.userId],
    references: [user.id],
  }),
  workoutPlan: rel.one(workoutPlans, {
    fields: [userWorkoutPlans.workoutPlanId],
    references: [workoutPlans.id],
  }),
  userWorkouts: rel.many(userWorkouts),
}));

export const userWorkoutsRelations = relations(userWorkouts, (rel) => ({
  user: rel.one(user, {
    fields: [userWorkouts.userId],
    references: [user.id],
  }),
  userWorkoutPlan: rel.one(userWorkoutPlans, {
    fields: [userWorkouts.userWorkoutPlanId],
    references: [userWorkoutPlans.id],
  }),
  userWorkoutExercises: rel.many(userWorkoutExercises),
}));

export const userWorkoutExercisesRelations = relations(
  userWorkoutExercises,
  (rel) => ({
    userWorkout: rel.one(userWorkouts, {
      fields: [userWorkoutExercises.userWorkoutId],
      references: [userWorkouts.id],
    }),
    workoutPlanExercise: rel.one(workoutPlanExercises, {
      fields: [userWorkoutExercises.workoutPlanExerciseId],
      references: [workoutPlanExercises.id],
    }),
    exercise: rel.one(exercises, {
      fields: [userWorkoutExercises.exerciseId],
      references: [exercises.id],
    }),
  })
);

export const userWorkoutSetsRelations = relations(userWorkoutSets, (rel) => ({
  userWorkoutExercise: rel.one(userWorkoutExercises, {
    fields: [userWorkoutSets.userWorkoutExerciseId],
    references: [userWorkoutExercises.id],
  }),
}));
