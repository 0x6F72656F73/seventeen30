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

export interface IMeal {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}

export interface IMealList {
    [dayNumber: string]: IMeal[];
}