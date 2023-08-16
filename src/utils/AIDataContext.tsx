import { createContext } from 'react';

import { IExerciseList, IMealList } from '@/types/common'

interface IAIDataContext {
    AIData: IExerciseList | IMealList | undefined;
    setAIData: (AIData: IExerciseList | IMealList) => void;
}

const AIDataContext = createContext<IAIDataContext>({
    AIData: {},
    setAIData: () => {},
});

export default AIDataContext;