import { useContext } from "react";
import { motion, Transition } from "framer-motion";

import AIDataContext from "@/utils/AIDataContext";

import { IWorkout } from "@/types/common";
import { anton } from "@/utils/fonts";

const Workout = ({name, reps, sets, rest}: IWorkout) => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">
                {name}
                </h1>

            <h2>Sets x Reps: {sets}x{reps}</h2>
            
            <h3>Rest time: {rest}s</h3>
        </div>
    )
}


const dotTransition: Transition = { duration: 0.75, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" };

export const LoadingAnimation = () => {
  console.log("LoadingAnimation");
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
        <div className={`border-4 border-bright-pink py-6 ${conditionalMargin} min-w-[30vh] text-center`}>
            <h1 className="text-5xl text-white mb-5">Day {parseInt(dayNumber) + 1 }</h1>
            {workouts && workouts.length > 0 ? (workouts.map((workout) => (
                <Workout key={workout.name} name={workout.name} reps={workout.reps} sets={workout.sets} rest={workout.rest} />
            ))) : ( 
                <LoadingAnimation />
            )}
        </div>
    )
}

const Schedule = () => {
    const { AIData } = useContext(AIDataContext);

    if (AIData === undefined || Object.keys(AIData).length === 0) {
        return;
    } 

    return (
        <div>
            <div className="flex flex-col items-center mt-[50vh]">
                <div className={`text-9xl hollow-text-2 ${anton.className}`}>
                    SCHEDULE
                </div>
                {Object.keys(AIData).length === 1 && (
                    <div className="w-[40vh] mt-[20vh]">
                        <Day key={'0'} dayNumber={'0'} workouts={AIData['0']} conditionalMargin={''}/>
                    </div>
                    )}
                {Object.keys(AIData).length > 1 && (
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 justify-items-center gap-0 mt-[20vh]">
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
            </div>
    );
};

export default Schedule;