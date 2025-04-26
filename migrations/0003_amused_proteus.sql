CREATE TABLE "user_workout_sets" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_workout_id" integer NOT NULL,
	"exercise_id" integer NOT NULL,
	"set_number" integer NOT NULL,
	"reps" integer NOT NULL,
	"weight" numeric(6, 2),
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_workout_sets_unique_idx" UNIQUE("user_workout_id","exercise_id","set_number")
);
--> statement-breakpoint
ALTER TABLE "user_workout_sets" ADD CONSTRAINT "user_workout_sets_user_workout_id_user_workouts_id_fk" FOREIGN KEY ("user_workout_id") REFERENCES "public"."user_workouts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_workout_sets" ADD CONSTRAINT "user_workout_sets_exercise_id_exercises_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercises"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_workout_sets_user_workout_id_idx" ON "user_workout_sets" USING btree ("user_workout_id");--> statement-breakpoint
CREATE INDEX "user_workout_sets_exercise_id_idx" ON "user_workout_sets" USING btree ("exercise_id");