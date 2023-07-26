import { useState } from 'react'
import Image from 'next/image'

import WorkoutForm from '@/components/WorkoutForm'
import Schedule from '@/components/Schedule'
import Footer from '@/components/Footer'
import AIDataContext from '@/utils/AIDataContext';

import { IExerciseList } from '@/types/common'
import { anton } from '@/utils/fonts';

export default function Home() {
  const [AIData, setAIData] = useState<IExerciseList>();

  return (
    <main>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Image src="/images/Hero.png" alt="Hero" priority={true} width="0" height="0" sizes="100vw" className="w-full h-auto"  placeholder="blur" blurDataURL="images/Hero.png"/>

        <div className='min-w-[85%] min-h-[10vh] bg-bright-pink mt-[6%]'>
          <div className={`py-[5vh] hollow-text text-center text-6xl ${anton.className}`}>
            CREATE A PERSONALIZED WORKOUT PLAN WITH AI
          </div>
        </div>
      </div>

      <div className='mt-48'>
        <div className={`text-center text-9xl hollow-text-2  ${anton.className}`}> {/*make text larger*/}
          7 STEPS
        </div>
      </div>

      <AIDataContext.Provider value={{ AIData, setAIData }}>
        <WorkoutForm  />

         <Schedule />
      </AIDataContext.Provider>

    </main>
  )
}
