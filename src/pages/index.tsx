import { useState, useRef } from 'react'
import Image from 'next/image'

import WorkoutForm from '@/components/WorkoutForm'
import Schedule from '@/components/Schedule'
import AIDataContext from '@/utils/AIDataContext';

import { IExerciseList } from '@/types/common'
import { anton } from '@/utils/fonts';

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
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Image src="images/seventeen30.svg" alt="Hero" priority={true} width="0" height="0" className="w-[70%] h-auto" placeholder="blur" blurDataURL="images/seventeen30.svg"/>

        <div className='min-w-[85%] min-h-[10vh] bg-bright-pink mt-[6%]'>
          <div className={`py-[5vh] hollow-text text-center text-6xl ${anton.className}`}>
            CREATE A PERSONALIZED WORKOUT PLAN WITH AI
          </div>
        </div>
      </div>

      <div className='mt-36'>
        <div className={`text-center text-10xl hollow-text-2  ${anton.className}`}> {/*make text larger*/}
          8 STEPS
        </div>
      </div>

      <AIDataContext.Provider value={{ AIData, setAIData }}>
        <WorkoutForm triggerScroll={triggerScroll} />

        <div ref={scheduleRef}>
          <Schedule />
        </div>
      </AIDataContext.Provider>

    </main>
  )
}
