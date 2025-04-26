CREATE INDEX "user_workouts_user_id_started_at_idx" ON "user_workouts" USING btree ("user_id","started_at");--> statement-breakpoint
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "user_workout_plans" ADD CONSTRAINT "user_workout_plans_unique_idx" UNIQUE("user_id","workout_plan_id");--> statement-breakpoint
ALTER TABLE "workout_plan_exercises" ADD CONSTRAINT "workout_plan_exercises_unique_idx" UNIQUE("workout_plan_id","exercise_id","day","order_in_day");

-- Explicitly cast completed_at to date to fix migration error
ALTER TABLE "user_workouts"
ALTER COLUMN "completed_at" TYPE date USING "completed_at"::date;