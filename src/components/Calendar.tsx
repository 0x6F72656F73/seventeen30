import { IWorkout, IExerciseList } from "@/types/common";


const Workout = ({name, reps, sets, rest}: IWorkout) => {
    return (
        <div>
            <h1 className="text-3xl">{name}</h1>

            <h2>{reps}x{sets}</h2>
            
            <h3>{rest}</h3>
        </div>
    )
}

interface DayProps {
    dayNumber: string;
    workouts: IWorkout[];
}
const Day = ({dayNumber, workouts}: DayProps) => {
    return (
        <div>
            <h1 className="text-5xl">{dayNumber}</h1>
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
            <h1>Calendar</h1>
            <div className="flex flex-col">
                <div className="grid md:grid-cols-2 sm:grid-cols-1 justify-items-center gap-y-[20vh]  mt-[30vh]">
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