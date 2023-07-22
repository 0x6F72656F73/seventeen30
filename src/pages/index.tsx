import Image from 'next/image'

import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className='text-9xl text-bright-green'>S E V E N T E E N</h1>
        <h1 className='text-9xl -mt-[4%] text-bright-pink'>3 0</h1>

        <div className='min-w-[85%] min-h-[10vh] bg-bright-pink mt-[8%]'>
          <div className='py-[5vh] text-center text-5xl hollow-text'>
            CREATE A PERSONALIZED WORKOUT PLAN WITH AI
          </div>
        </div>
      </div>

      <div className='mt-10'>
        <div className='text-center text-9xl hollow-text-2'>
          6 STEPS
        </div>
      </div>


      <div className="py-10 px-24 bg-gold">
        <Footer />
      </div>
    </main>
  )
}
