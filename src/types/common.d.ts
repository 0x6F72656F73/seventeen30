export interface IColorVariants {
    [color: string]: string[];
}

export interface IWorkout {
    name: string;
    sets: number;
    reps: number;
    duration: number;
    rest: number;
}
  
export interface IExerciseList {
  [dayNumber: string]: IWorkout[];
}