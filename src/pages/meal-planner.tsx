import { useState } from 'react';
import { useSchedule } from '@/hooks/useSchedule';

import TypeIt from 'typeit-react';

import MealForm from '@/components/meal/MealForm';
import MealSchedule from '@/components/meal/MealSchedule';
import { MealDataContext } from '@/utils/AIDataContext';

import { IMealList } from '@/types/common';
import { anton } from '@/utils/fonts';

const MealPlanner = () => {
    const [AIData, setAIData] = useState<IMealList>();
    const { scheduleRef, triggerScroll } = useSchedule();

    return (
        <>
            <div className="flex flex-col items-center justify-center mt-20 sm:min-h-screen">
                {/* <Image src="images/seventeen30.svg" alt="Hero" priority={true} width="250" height="0" className="h-auto" placeholder="blur" blurDataURL="images/seventeen30.svg"/> */}

                <div className='flex items-center justify-center w-full h-[8rem] bg-bright-pink py-5 mt-10'>
                    <div className={`hollow-text-mobile text-center text-4xl sm:text-6xl ${anton.className}`}>
                        <TypeIt
                            options={{
                                strings: ["CREATE A PERSONALIZED MEAL PLAN WITH AI BELOW... "],
                                speed: 50,
                                waitUntilVisible: true,
                            }}
                        />
                    </div>
                </div>
            </div>

            <MealDataContext.Provider value={{ AIData, setAIData }}>
                <MealForm triggerScroll={triggerScroll} />

                <div ref={scheduleRef}>
                    <MealSchedule />
                </div>
            </MealDataContext.Provider>
        </>
    );
}

export default MealPlanner;