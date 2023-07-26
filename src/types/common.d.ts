export interface IColorVariants {
    [color: string]: string[];
}

export interface IWorkout {
    name: string;
    reps: number;
    sets: number;
    rest: number;
}
  
  export interface IExerciseList {
    [dayNumber: string]: IWorkout[];
  }