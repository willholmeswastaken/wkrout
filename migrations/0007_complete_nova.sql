CREATE TABLE "user_workout_exercises" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_workout_id" integer NOT NULL,
	"workout_plan_exercise_id" integer,
	"exercise_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_workout_sets" DROP CONSTRAINT "user_workout_sets_unique_idx";--> statement-breakpoint
ALTER TABLE "user_workout_sets" DROP CONSTRAINT "user_workout_sets_user_workout_id_user_workouts_id_fk";
--> statement-breakpoint
ALTER TABLE "user_workout_sets" DROP CONSTRAINT "user_workout_sets_exercise_id_exercises_id_fk";
--> statement-breakpoint
DROP INDEX "user_workout_sets_user_workout_id_idx";--> statement-breakpoint
DROP INDEX "user_workout_sets_exercise_id_idx";--> statement-breakpoint
ALTER TABLE "user_workout_sets" ADD COLUMN "user_workout_exercise_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "user_workout_exercises" ADD CONSTRAINT "user_workout_exercises_user_workout_id_user_workouts_id_fk" FOREIGN KEY ("user_workout_id") REFERENCES "public"."user_workouts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_workout_exercises" ADD CONSTRAINT "user_workout_exercises_workout_plan_exercise_id_workout_plan_exercises_id_fk" FOREIGN KEY ("workout_plan_exercise_id") REFERENCES "public"."workout_plan_exercises"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_workout_exercises" ADD CONSTRAINT "user_workout_exercises_exercise_id_exercises_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercises"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_workout_exercises_user_workout_id_idx" ON "user_workout_exercises" USING btree ("user_workout_id");--> statement-breakpoint
CREATE INDEX "user_workout_exercises_workout_plan_exercise_id_idx" ON "user_workout_exercises" USING btree ("workout_plan_exercise_id");--> statement-breakpoint
ALTER TABLE "user_workout_sets" ADD CONSTRAINT "user_workout_sets_user_workout_exercise_id_user_workout_exercises_id_fk" FOREIGN KEY ("user_workout_exercise_id") REFERENCES "public"."user_workout_exercises"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_workout_sets_user_workout_exercise_id_idx" ON "user_workout_sets" USING btree ("user_workout_exercise_id");--> statement-breakpoint
ALTER TABLE "user_workout_sets" DROP COLUMN "user_workout_id";--> statement-breakpoint
ALTER TABLE "user_workout_sets" DROP COLUMN "exercise_id";--> statement-breakpoint
ALTER TABLE "user_workout_sets" ADD CONSTRAINT "user_workout_sets_unique_idx" UNIQUE("user_workout_exercise_id","set_number");