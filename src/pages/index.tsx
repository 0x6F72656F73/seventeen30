import { useState } from 'react'
import Image from 'next/image'

import WorkoutForm from '@/components/WorkoutForm'
import Calendar from '@/components/Calendar'
import Footer from '@/components/Footer'
import AIDataContext from '@/utils/AIDataContext';

import { IExerciseList } from '@/types/common'

export default function Home() {
  const [AIData, setAIData] = useState<IExerciseList>();

  return (
    <main>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Image src="/images/Hero.png" alt="Logo" width="0" height="0" sizes="100vw" className="w-full h-auto" priority={true} />

        <div className='min-w-[85%] min-h-[10vh] bg-bright-pink mt-[6%]'>
          <div className='py-[5vh] text-center text-5xl hollow-text'>
            CREATE A PERSONALIZED WORKOUT PLAN WITH AI
          </div>
        </div>
      </div>

      <div className='mt-48'>
        <div className='text-center text-9xl hollow-text-2'> {/*make text larger*/}
          7 STEPS
        </div>
      </div>

      <AIDataContext.Provider value={{ AIData, setAIData }}>
        <WorkoutForm  />

        {AIData && <Calendar />}
      </AIDataContext.Provider>

    </main>
  )
}
