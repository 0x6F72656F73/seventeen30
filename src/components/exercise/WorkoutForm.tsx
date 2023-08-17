import { useState, useContext, useEffect } from 'react';
import {IColorVariants} from '@/types/common'
import { motion } from 'framer-motion';

import DropdownSelect from '@/components/DropdownSelect';
import SliderSelect from '@/components/SliderSelect';
import TextSelect from '@/components/TextSelect';

import retry from '@/utils/retry';
import parseStreamedJSON from '@/utils/parseStreamedJson';
import { ExerciseDataContext } from '@/utils/AIDataContext';
import { libreBaskerville, anton } from '@/utils/fonts';


const HEIGHT_WEIGHT_MIN_MAX = {
  'HEIGHT': [48, 84],
  'WEIGHT': [100, 300],
};

interface WorkoutFormProps {
  triggerScroll: () => void;
}

const WorkoutForm = ({triggerScroll}: WorkoutFormProps) => {
  const [formData, setFormData] = useState({
    span: '7 Day Plan',
    level: 'Intermediate',
    duration: '30 minutes',
    type: 'Weight Training',
    height: ((HEIGHT_WEIGHT_MIN_MAX['HEIGHT'][0] + HEIGHT_WEIGHT_MIN_MAX['HEIGHT'][1]) / 2).toString(),
    weight: ((HEIGHT_WEIGHT_MIN_MAX['WEIGHT'][0] + HEIGHT_WEIGHT_MIN_MAX['WEIGHT'][1]) / 2).toString(),
    sport: '',
  });

  const handleFieldValueChange = (title: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [title.toLowerCase()]: value,
    }));
  };

  const [onError, setOnError] = useState(false);

  const { setAIData, } = useContext(ExerciseDataContext);
  const [days, setDays] = useState<any[]>([]);

  useEffect(() => {
    setAIData(days as any);
  }, [days, setAIData]);

  const handleSubmit = async () => {

    try {
      const generateApiCall: () => Promise<Response> = async () => {
        return await fetch("/api/createWorkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({formData}),
        });
      };

        const [reader, value1] = await retry(
          generateApiCall,
          (retryAttempt: number, timeToWait: number) => {
            // console.log("on retry called...");
            console.log(`Waiting for ${timeToWait}ms before next attempt`);
          },
          4,
          setOnError
        );

        const spanLength = parseInt(formData.span); 
        const initialDays = Array(spanLength).fill([]);
        setDays(initialDays); 
    
        triggerScroll();
      
        let allData = value1;

        let counter = -1;

        while (true) {
            const {value, done} = await reader.read();
            if (done) break;
            // console.log(value)
            allData += value;
            if (value.includes(']')) {  
              allData = allData.replace('|', '');

              const [parsed, extraData] = parseStreamedJSON(allData);
              setDays((prevDays) => {
                const updatedDays = [...prevDays];
                updatedDays[counter] = parsed;
                return updatedDays;
              });
              
              allData = extraData;
              counter++;

            }
        }
    } catch (error) {
        console.error(error);
        setOnError(true);
    };
  };

  return (
    <div className="flex flex-col mt-32">
      <div className={`grid grid-cols-1 md:grid-cols-2 justify-items-center ${libreBaskerville.className}`}>
        <DropdownSelect
          title="SPAN"
          color="bright-pink"
          fields={['1 Day Plan', '7 Day Plan', '30 Day Plan']}
          onFieldValueChange={handleFieldValueChange}
        />
        <DropdownSelect
          title="LEVEL"
          color="bright-green"
          fields={['Beginner', 'Intermediate','Advanced']}
          onFieldValueChange={handleFieldValueChange}
        />
        <DropdownSelect
          title="TYPE"
          color="bright-orange"
          fields={['Cardio', 'Weight Training', 'Calisthenics']}
          onFieldValueChange={handleFieldValueChange}
        />
        <DropdownSelect
          title="DURATION"
          color="bright-blue"
          fields={['15 Minutes', '30 Minutes', '60 Minutes']}
          onFieldValueChange={handleFieldValueChange}
        />
        <SliderSelect
          title="HEIGHT"
          color="bright-yellow"
          min={HEIGHT_WEIGHT_MIN_MAX['HEIGHT'][0].toString()}
          max={HEIGHT_WEIGHT_MIN_MAX['HEIGHT'][1].toString()}
          onValueChange={handleFieldValueChange}
        />
        <SliderSelect
          title="WEIGHT"
          color="bright-blue-2"
          min={HEIGHT_WEIGHT_MIN_MAX['WEIGHT'][0].toString()}
          max={HEIGHT_WEIGHT_MIN_MAX['WEIGHT'][1].toString()}
          onValueChange={handleFieldValueChange}
        />
      </div>
      <div className={`flex flex-col justify-center items-center mt-36 ${libreBaskerville.className}`}>
      <TextSelect
          title="SPORT"
          color="bright-purple"
          onValueChange={handleFieldValueChange}
        />
      </div>
      <motion.button
            className={`flex items-center mt-64 mx-auto cursor-pointer mb-2 p-2`} //  ${getColorClassNames(color)[1]}
            onClick={() => handleSubmit()}
            whileHover={{ scale: 1.2, backgroundColor: "#5E1474", transition: { duration: .5 } }}
          >
            <div className={`text-9xl hollow-text-3 text-center ${anton.className}`}> 
              DONE
            </div>
          </motion.button>

      {onError && <div className={`flex flex-col justify-center items-center mt-20 ${libreBaskerville.className} text-red-500`}>Rate limit reached. Retrying automatically, please wait...</div>}
    </div>
  );
};

export default WorkoutForm;
