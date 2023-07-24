import { IWorkout, IExerciseList } from "@/types/common";


const Workout = ({name, reps, sets, rest}: IWorkout) => {
    return (
        <div className="my-2">
            <h1 className="text-3xl font-bold mb-2">
                {name}
                </h1>

            <h2>Reps X Sets: {reps}x{sets}</h2>
            
            <h3>Rest time: {rest}s</h3>
        </div>
    )
}

interface DayProps {
    dayNumber: string;
    workouts: IWorkout[];
}
const Day = ({dayNumber, workouts}: DayProps) => {
    return (
        <div className="border-2 border-white p-10 text-center">
            <h1 className="text-5xl text-bright-pink mb-5">Day {parseInt(dayNumber) + 1 }</h1>
            {workouts.map((workout) => (
                <Workout key={workout.name} name={workout.name} reps={workout.reps} sets={workout.sets} rest={workout.rest} />
            ))}
        </div>
    )
}


interface CalendarProps {
    AIData: IExerciseList | undefined;
  }
const Calendar = ({AIData}: CalendarProps) => {


    if (!AIData) {
        return (
            <div className="flex flex-col">
                Loading...
            </div>
        )
    }

    return (
        <div>
            <div className="flex flex-col mt-[50vh]">
                <div className='text-center text-9xl hollow-text-2'>
                    Calendar
                </div>
                <div className="grid md:grid-cols-2 sm:grid-cols-1 justify-items-center gap-y-[20vh]  mt-[20vh]">
                    {
                        Object.keys(AIData).map((dayNumber) => (
                            <Day key={dayNumber} dayNumber={dayNumber} workouts={AIData[dayNumber]} />
                        ))
                        
                    }
                </div>
            </div>
        </div>
    );
};

export default Calendar;