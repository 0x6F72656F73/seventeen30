import { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';

import DropdownSelect from '@/components/DropdownSelect';
import SliderSelect from '@/components/SliderSelect';
import TextSelect from '@/components/TextSelect';

import retry from '@/utils/retry';
import parseStreamedJSON from '@/utils/parseStreamedJson';
import { MealDataContext } from '@/utils/AIDataContext';
import { libreBaskerville, anton } from '@/utils/fonts';

const colorVariants = {
  'bright-pink': ['#D90368', 'bg-bright-pink', 'border-bright-pink', 'from-bright-pink', 'text-bright-pink'],
  'bright-green': ['#10E62C', 'bg-bright-green', 'border-bright-green', 'from-bright-green', 'text-bright-green'],
  'bright-orange': ['#FF4D00', 'bg-bright-orange', 'border-bright-orange', 'from-bright-orange'],
  'bright-blue': ['#5CE1E6', 'bg-bright-blue', 'border-bright-blue', 'from-bright-blue'],
  'bright-yellow': ['#FFE347', 'bg-bright-yellow', 'border-bright-yellow', 'from-bright-yellow', '[&::-webkit-slider-runnable-track]:bg-bright-yellow'],
  'bright-blue-2': ['#004AAD', 'bg-bright-blue-2', 'border-bright-blue-2', 'from-bright-blue-2', '[&::-webkit-slider-runnable-track]:bg-bright-blue-2'],
  'bright-purple': ['#CB6CE6', 'bg-bright-purple', 'border-bright-purple', 'from-bright-purple'],
  'bright-purple-2': ['#5E1474', 'bg-bright-purple-2', 'border-bright-purple-2', 'from-bright-purple-2']
};

interface MealFormProps {
  triggerScroll: () => void;
}

const MealForm = ({ triggerScroll }: MealFormProps) => {
  const [formData, setFormData] = useState({
    span: '7 Day Plan',
    goal: 'Lose Weight',
    macros: 'None',
    exercise: '3',
    ingredients: '',
    restrictions: ''
    // height: ((HEIGHT_WEIGHT_MIN_MAX['HEIGHT'][0] + HEIGHT_WEIGHT_MIN_MAX['HEIGHT'][1]) / 2).toString(),
    // weight: ((HEIGHT_WEIGHT_MIN_MAX['WEIGHT'][0] + HEIGHT_WEIGHT_MIN_MAX['WEIGHT'][1]) / 2).toString(),
    // sport: '',
  });

  const handleFieldValueChange = (title: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [title.toLowerCase()]: value,
    }));
  };

  const [onError, setOnError] = useState(false);

  const { setAIData, } = useContext(MealDataContext);
  const [days, setDays] = useState<any[]>([]);

  useEffect(() => {
    setAIData(days as any);
  }, [days, setAIData]);

  const handleSubmit = async () => {

    try {
      console.log(formData);
      const generateApiCall: () => Promise<Response> = async () => {
        return await fetch("/api/createMealPlan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ formData }),
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
        const { value, done } = await reader.read();
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
          title="GOAL"
          color="bright-blue"
          fields={['Lose Weight', 'Maintain Weight', 'Gain Weight']}
          onFieldValueChange={handleFieldValueChange}
        />
        <DropdownSelect
          title="MACROS"
          color="bright-green"
          fields={['None', 'High Protein', 'Low Carb', 'Low Fat']}
          onFieldValueChange={handleFieldValueChange}
        />
        <SliderSelect
          title="EXERCISE"
          color="bright-yellow"
          min={'0'}
          max={'7'}
          onValueChange={handleFieldValueChange}
        />
      </div>
      <div className={`flex flex-col justify-center items-center mt-36 ${libreBaskerville.className}`}>
        <TextSelect
          title="INGREDIENTS"
          color="bright-orange"
          placeholder='Enter any ingredients you have'
          onValueChange={handleFieldValueChange}
        />
        <TextSelect
          title="RESTRICTIONS"
          color="bright-purple"
          placeholder='E.g. Vegetarian, gluten-free'
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

export default MealForm;
