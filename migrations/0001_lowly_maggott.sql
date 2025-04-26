ALTER TABLE "user_workouts" RENAME COLUMN "created_at" TO "completed_at";--> statement-breakpoint
ALTER TABLE "user_workouts" ADD COLUMN "started_at" date NOT NULL;--> statement-breakpoint
CREATE INDEX "muscle_group_idx" ON "exercises" USING btree ("muscle_group");--> statement-breakpoint
CREATE INDEX "user_workout_plans_user_id_idx" ON "user_workout_plans" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_workout_plans_workout_plan_id_idx" ON "user_workout_plans" USING btree ("workout_plan_id");--> statement-breakpoint
CREATE INDEX "user_workouts_user_id_idx" ON "user_workouts" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_workouts_user_workout_plan_id_idx" ON "user_workouts" USING btree ("user_workout_plan_id");--> statement-breakpoint
CREATE INDEX "email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "workout_plan_id_idx" ON "workout_plan_exercises" USING btree ("workout_plan_id");--> statement-breakpoint
CREATE INDEX "exercise_id_idx" ON "workout_plan_exercises" USING btree ("exercise_id");--> statement-breakpoint
ALTER TABLE "exercises" DROP COLUMN "description";--> statement-breakpoint
ALTER TABLE "user_workouts" DROP COLUMN "date";--> statement-breakpoint
ALTER TABLE "user_workouts" DROP COLUMN "completed";