import { useState, useRef } from 'react'

import TypeIt from "typeit-react";

import WorkoutForm from '@/components/WorkoutForm'
import Schedule from '@/components/Schedule'
import RegisterNow from "@/components/RegisterNow";

import { IExerciseList } from '@/types/common'
import { anton } from '@/utils/fonts';
import AIDataContext from '@/utils/AIDataContext';

export default function Home() {
  const [AIData, setAIData] = useState<IExerciseList>();
  const scheduleRef = useRef<HTMLDivElement>(null);

  const triggerScroll = () => {
    setTimeout(() => {
      if (scheduleRef.current) {
      scheduleRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1);
  };

  return (
    <main>
      <div className="flex flex-col items-center justify-center mt-20 sm:min-h-screen">

        <div className='flex items-center justify-center w-full h-[8rem] bg-bright-pink py-5 mt-10'>
          <div className={`hollow-text-mobile text-center text-4xl sm:text-6xl ${anton.className}`}>
          <TypeIt
            options={{
              strings: ["CREATE A PERSONALIZED WORKOUT PLAN WITH AI BELOW... "],
              speed: 50,
              waitUntilVisible: true,
            }}
          />
          </div>
        </div>
      </div>

      <div className='mt-10 sm:mt-36'>
        <div className={`text-center text-10xl hollow-text-2  ${anton.className}`}> {/*make text larger*/}
          8 STEPS
        </div>
      </div>

      <AIDataContext.Provider value={{ AIData, setAIData }}>
        <WorkoutForm triggerScroll={triggerScroll} />

        <div ref={scheduleRef}>
          <Schedule />
        </div>

        <RegisterNow />
      </AIDataContext.Provider>

    

    </main>
  )
}