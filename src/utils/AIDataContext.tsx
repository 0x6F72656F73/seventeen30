import { createContext } from 'react';

import { IExerciseList } from '@/types/common'

interface IAIDataContext {
    AIData: IExerciseList | undefined;
    setAIData: (AIData: IExerciseList) => void;
    }

const AIDataContext = createContext<IAIDataContext>({
    AIData: {},
    setAIData: () => {},
});

export default AIDataContext;