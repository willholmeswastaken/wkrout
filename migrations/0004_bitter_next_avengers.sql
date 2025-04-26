CREATE TABLE "workout_plan_days" (
	"id" serial PRIMARY KEY NOT NULL,
	"workout_plan_id" integer NOT NULL,
	"name" varchar(100) NOT NULL,
	"day_order" integer NOT NULL,
	CONSTRAINT "workout_plan_days_unique_idx" UNIQUE("workout_plan_id","day_order")
);
--> statement-breakpoint
ALTER TABLE "workout_plan_exercises" RENAME COLUMN "day" TO "workout_plan_day_id";--> statement-breakpoint
ALTER TABLE "workout_plan_exercises" DROP CONSTRAINT "workout_plan_exercises_unique_idx";--> statement-breakpoint
ALTER TABLE "workout_plan_days" ADD CONSTRAINT "workout_plan_days_workout_plan_id_workout_plans_id_fk" FOREIGN KEY ("workout_plan_id") REFERENCES "public"."workout_plans"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "workout_plan_days_plan_id_idx" ON "workout_plan_days" USING btree ("workout_plan_id");--> statement-breakpoint
ALTER TABLE "workout_plan_exercises" ADD CONSTRAINT "workout_plan_exercises_workout_plan_day_id_workout_plan_days_id_fk" FOREIGN KEY ("workout_plan_day_id") REFERENCES "public"."workout_plan_days"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "workout_plan_day_id_idx" ON "workout_plan_exercises" USING btree ("workout_plan_day_id");--> statement-breakpoint
ALTER TABLE "workout_plan_exercises" ADD CONSTRAINT "workout_plan_exercises_unique_idx" UNIQUE("workout_plan_id","exercise_id","workout_plan_day_id","order_in_day");