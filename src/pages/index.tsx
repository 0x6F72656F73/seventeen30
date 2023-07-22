import Image from 'next/image'

import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/images/Muscle-Grid.png')" }}>
        <div className="w-2/3">
          <div className="relative w-full h-0" style={{ paddingTop: '50%' }}>
            <Image src="/images/Text.png" alt="Text" fill priority={true} style={{objectFit:"contain"}} />
          </div>
        </div>
      </div>

      <div className="py-10 px-24 bg-white">
        <h2 className="text-4xl font-bold text-black">Welcome to the Seventeen30 Workout Revolution!</h2>
        <div className="flex flex-row mt-4 text-lg text-navy-green">
          <p className='mr-10'>
            At Seventeen 30, we&apos;re rejuvenating the vibrant essence of the 70s, merged with cutting-edge AI technology, to create personalized workout plans adapted to your fitness level, goals, and preferences. Get ready to groove in sync with your well-being journey alongside us!
          </p>
          <p className='ml-10'>
          Our customized workout plans adapt to your needs, making every session a unique and exciting experience. Say goodbye to dull routines and hello to the funky world of Seventeen 30 workouts!
          </p>
        </div>
      </div>

      <div className="py-10 px-24 bg-gold">
        hi

        <Footer />
      </div>
    </main>
  )
}
