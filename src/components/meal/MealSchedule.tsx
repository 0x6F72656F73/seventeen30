import { useContext } from "react";

import LoadingAnimation from "@/components/LoadingAnimation";
import { MealDataContext } from "@/utils/AIDataContext";

import { IMeal } from "@/types/common";
import { anton } from "@/utils/fonts";

interface IMealProps extends IMeal {
  index: number;
}

const Meal = ({ name, calories, index }: IMealProps) => {
  let label = '';
  switch (index) {
    case 0:
      label = 'Breakfast';
      break;

    case 1:
      label = 'Lunch';
      break;

    case 2:
      label = 'Dinner';
      break;

    default:
      label = 'Error';
  }

  return (
    <div className="text-center">
      <div>
        <h1 className="my-2 font-bold truncate text-2xl"> {label} </h1>
        <h2>{name}</h2>
        <h3>Calories: {calories}</h3>
        {/* {reps !== 0 ? <h2 className="text-xl">Sets x Reps:{sets}x{reps}</h2> : <h2 className="text-xl">Sets x Time:{sets}x{duration}</h2>}
            <h3>Rest time: {rest}s</h3> */}
      </div>
    </div>
  )
}

interface DayProps {
  dayNumber: string;
  meals: IMeal[];
  conditionalMargin: string;
}

const Day = ({ dayNumber, meals, conditionalMargin }: DayProps) => {
  return (
    <div className={`border-4 border-bright-pink py-6 ${conditionalMargin} min-w-[25rem] text-center`}>
      <h1 className="text-5xl text-white mb-5">Day {parseInt(dayNumber) + 1}</h1>
      {meals && meals.length > 0 ? (meals.map((meal, index) => (
        <Meal key={meal.name} name={meal.name} calories={meal.calories} index={index} />
      ))) : (
        <LoadingAnimation />
      )}
    </div>
  )
}

const MealSchedule = () => {
  const { AIData } = useContext(MealDataContext);

  if (AIData === undefined || Object.keys(AIData).length === 0) {
    return;
  }

  return (
    <div>
      <div className="flex flex-col items-center mt-44 text-center">
        <div className={`hollow-text-2-mobile text-7xl md:text-9xl ${anton.className}`}>
          MEAL PLAN
        </div>
        <div className={`mt-4 mb-32 text-2xl`}>
          (If you don&apos;t like this meal plan click the submit button again to generate a new one!)
        </div>
        {Object.keys(AIData).length === 1 && (
          <div>
            <Day key={'0'} dayNumber={'0'} meals={AIData['0']} conditionalMargin={''} />
          </div>
        )}
        {Object.keys(AIData).length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
            {
              Object.keys(AIData).map((dayNumber) => (
                <Day key={dayNumber} dayNumber={dayNumber} meals={AIData[dayNumber]}
                  conditionalMargin={`${(parseInt(dayNumber) + 1) % 3 !== 3 ? 'mr-[-4px]' : '' // Add negative margin to the right for all except the last item in each row
                    } ${(parseInt(dayNumber)) < Object.keys(AIData).length - 1 ? 'mb-[-4px]' : ''}`} />
              ))
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default MealSchedule;