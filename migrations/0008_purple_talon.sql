CREATE TABLE "workout_plan_exercise_sets" (
	"id" serial PRIMARY KEY NOT NULL,
	"workout_plan_exercise_id" integer NOT NULL,
	"set_number" integer NOT NULL,
	"reps" integer NOT NULL,
	"weight" numeric(6, 2),
	CONSTRAINT "workout_plan_exercise_sets_unique_idx" UNIQUE("workout_plan_exercise_id","set_number")
);
--> statement-breakpoint
ALTER TABLE "workout_plan_exercises" DROP CONSTRAINT "workout_plan_exercises_unique_idx";--> statement-breakpoint
DROP INDEX "workout_plan_day_id_idx";--> statement-breakpoint
ALTER TABLE "workout_plan_exercise_sets" ADD CONSTRAINT "workout_plan_exercise_sets_workout_plan_exercise_id_workout_plan_exercises_id_fk" FOREIGN KEY ("workout_plan_exercise_id") REFERENCES "public"."workout_plan_exercises"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "workout_plan_exercise_sets_exercise_id_idx" ON "workout_plan_exercise_sets" USING btree ("workout_plan_exercise_id");