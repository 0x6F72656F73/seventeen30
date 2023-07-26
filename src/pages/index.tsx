import { useState } from 'react'

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
        <h1 className='text-9xl text-bright-green'>S E V E N T E E N</h1>
        <h1 className='text-9xl md:-mt-[8vh] lg:-mt-[4vh] text-bright-pink'>3 0</h1>

        <div className='min-w-[85%] min-h-[10vh] bg-bright-pink mt-[8%]'>
          <div className='py-[5vh] text-center text-5xl hollow-text'>
            CREATE A PERSONALIZED WORKOUT PLAN WITH AI
          </div>
        </div>
      </div>

      <div className='mt-10'>
        <div className='text-center text-9xl hollow-text-2'> {/*make text larger*/}
          6 STEPS
        </div>
      </div>

      <AIDataContext.Provider value={{ AIData, setAIData }}>
        <WorkoutForm  />

        {AIData && <Calendar />}
      </AIDataContext.Provider>

      <div className="py-10 px-24 bg-gold">
        <Footer />
      </div>
    </main>
  )
}
