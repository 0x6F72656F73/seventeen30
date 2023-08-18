import { createContext } from 'react';

import { IExerciseList, IMealList } from '@/types/common'

interface IExerciseDataContext {
    AIData: IExerciseList | undefined;
    setAIData: (AIData: IExerciseList) => void;
}

const ExerciseDataContext = createContext<IExerciseDataContext>({
    AIData: {},
    setAIData: () => {},
});

interface IMealDataContext {
    AIData: IMealList | undefined;
    setAIData: (AIData: IMealList) => void;
}

const MealDataContext = createContext<IMealDataContext>({
    AIData: {},
    setAIData: () => {},
});

export { ExerciseDataContext, MealDataContext };