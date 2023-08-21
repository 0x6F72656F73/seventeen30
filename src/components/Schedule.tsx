import { useContext, useEffect } from "react";
import { motion, Transition } from "framer-motion";
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'

import AIDataContext from "@/utils/AIDataContext";
import { IWorkout } from "@/types/common";
import { anton } from "@/utils/fonts";

const Workout = ({name, reps, sets, rest, duration}: IWorkout) => {
    return (
        <div className="text-center">
            <div>
            <h1 className="my-2 font-bold truncate text-2xl"> {name} </h1>
            {reps !== 0 ? <h2 className="text-xl">Sets x Reps:{sets}x{reps}</h2> : <h2 className="text-xl">Sets x Time:{sets}x{duration}</h2>}
            <h3>Rest time: {rest}s</h3>
            </div>
        </div>
    )
}


const dotTransition: Transition = { duration: 0.75, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" };

export const LoadingAnimation = () => {
  return (
      <div className="pt-20 w-full flex items-center justify-center">
      <motion.div
          className="flex w-40 h-20 justify-around"
          variants={{ initial: { transition: { staggerChildren: 0.2 } }, animate: { transition: { staggerChildren: 0.2 } } }}
          initial="initial"
          animate="animate"
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="m-2 block w-8 h-8 bg-white rounded-full"
            variants={{ initial: { y: "0%" }, animate: { y: "100%" } }}
            transition={dotTransition}
          />
      ))}
      </motion.div>
      </div>
  );
};

interface DayProps {
    dayNumber: string;
    workouts: IWorkout[];
    conditionalMargin: string;
}

const Day = ({dayNumber, workouts, conditionalMargin}: DayProps) => {
    return (
        <div className={`border-4 border-bright-pink py-6 ${conditionalMargin} min-w-[25rem] text-center`}>
            <h1 className="text-5xl text-white mb-5">Day {parseInt(dayNumber) + 1 }</h1>
            {workouts && workouts.length > 0 ? (workouts.map((workout) => (
                <Workout key={workout.name} name={workout.name} reps={workout.reps} sets={workout.sets} rest={workout.rest} duration={workout.duration} />
            ))) : ( 
                <LoadingAnimation />
            )}
        </div>
    )
}

const Schedule = () => {
    const { AIData, setAIData } = useContext(AIDataContext);
    const supabaseClient = useSupabaseClient()
    const user = useUser()

    useEffect(() => {
        console.log('check');
    const checkDB = async () => {
        const { data, error } = await supabaseClient.from('workout_plans').select('*').eq('user_id', user?.id)
        if (error) {
            console.log(error)
        } else {
            if (data?.length > 0) {
                setAIData(JSON.parse(data[0].exercises))
            }
        }
    }
    if (user) checkDB();
    }, [user, setAIData, supabaseClient, user?.id])

    if (AIData === undefined || Object.keys(AIData).length === 0) {
        return;
    } 

    const hasContent = Object(AIData)?.some((workout: any) => workout.length > 0);
    if (hasContent) {
        const func = async () => {
            await supabaseClient.from('workout_plans').upsert({user_id: user?.id, exercises: JSON.stringify(AIData)}, {onConflict: 'user_id'})
        }
        func()
    }


    return (
            <div className="flex flex-col items-center mt-44 text-center">
                <div className={`hollow-text-2-mobile text-7xl md:text-9xl ${anton.className}`}>
                    WORKOUT PLAN
                </div>
                <div className={`mt-4 mb-32 text-2xl`}>
                    (If you don&apos;t like this workout plan click the submit button again to generate a new one!)
                </div>
                {Object.keys(AIData).length === 1 && (
                    <div>
                        <Day key={'0'} dayNumber={'0'} workouts={AIData['0']} conditionalMargin={''}/>
                    </div>
                    )}
                {Object.keys(AIData).length > 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
                        {
                            Object.keys(AIData).map((dayNumber) => (
                                <Day key={dayNumber} dayNumber={dayNumber} workouts={AIData[dayNumber]}
                                conditionalMargin={`${
                                (parseInt(dayNumber)+1) % 3 !== 3 ? 'mr-[-4px]' : '' // Add negative margin to the right for all except the last item in each row
                                } ${(parseInt(dayNumber)) < Object.keys(AIData).length - 1 ? 'mb-[-4px]' : ''}`}/>
                            ))
                        }
                    </div>
                )}
            </div>
    );
};

export default Schedule;