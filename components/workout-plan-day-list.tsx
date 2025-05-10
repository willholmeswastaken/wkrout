import { WorkoutPlanDay } from "@/types/plans";
import { Dumbbell } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";

interface WorkoutSet {
  reps: number;
  weight?: number;
}

interface WorkoutPlanDayListProps {
  days: WorkoutPlanDay[];
  onSelectDay?: (dayId: string | number) => void;
}

export function WorkoutPlanDayList({
  days,
  onSelectDay,
}: WorkoutPlanDayListProps) {
  const [open, setOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<WorkoutPlanDay | null>(null);

  const handleDayClick = (day: WorkoutPlanDay) => {
    setSelectedDay(day);
    setOpen(true);
    if (onSelectDay) onSelectDay(day.id);
  };

  return (
    <>
      <div className="flex flex-col gap-4 pt-2">
        {days.map((day) => (
          <button
            key={day.id}
            className="w-full bg-[#23262a] hover:bg-[#2c2f34] rounded-2xl px-6 py-4 text-left flex items-center justify-between group transition-colors"
            onClick={() => handleDayClick(day)}
            type="button"
          >
            <div>
              <div className="text-lg font-semibold mb-1">{day.name}</div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Dumbbell className="w-4 h-4 opacity-70" />
                  {day.workoutPlanExercises.length} Exercise
                  {day.workoutPlanExercises.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
            <span className="text-orange-500 group-hover:translate-x-1 transition-transform">
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-right"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </span>
          </button>
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedDay?.name || "Day Preview"}</DialogTitle>
            <DialogDescription>
              {selectedDay?.workoutPlanExercises.length
                ? `${selectedDay.workoutPlanExercises.length} Exercise${
                    selectedDay.workoutPlanExercises.length !== 1 ? "s" : ""
                  }`
                : "No exercises for this day."}
            </DialogDescription>
          </DialogHeader>
          {selectedDay && selectedDay.workoutPlanExercises.length > 0 && (
            <div className="space-y-4 mt-4">
              {selectedDay.workoutPlanExercises.map((ex, i) => (
                <div key={ex.id || i} className="bg-[#181a1d] rounded-xl p-4">
                  <div className="font-semibold text-base mb-1">
                    {ex.exercise?.name || "Exercise"}
                  </div>
                  {ex.sets && ex.sets.length > 0 ? (
                    <ul className="text-sm text-gray-300 pl-4 list-disc">
                      {ex.sets.map((set: WorkoutSet, idx: number) => (
                        <li key={idx}>
                          Set {idx + 1}: {set.reps} reps
                          {set.weight ? ` @ ${set.weight}kg` : ""}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-xs text-gray-500">
                      No set data available.
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          <DialogClose asChild>
            <button className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-2 transition-colors">
              Close
            </button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}
