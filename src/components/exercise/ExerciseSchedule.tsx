import { useContext } from "react";

import LoadingAnimation from "@/components/LoadingAnimation";
import { ExerciseDataContext } from "@/utils/AIDataContext";

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

const ExerciseSchedule = () => {
    const { AIData } = useContext(ExerciseDataContext);

    if (AIData === undefined || Object.keys(AIData).length === 0) {
        return;
    } 

    return (
        <div>
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
            </div>
    );
};

export default ExerciseSchedule;