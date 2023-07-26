import { useState, useContext, useEffect } from 'react';
import {IColorVariants} from '@/types/common'
import { motion } from 'framer-motion';

import AIDataContext from '@/utils/AIDataContext';
import { HeightConverter, WeightConverter } from '@/utils';
import { libreBaskerville, anton } from '@/utils/fonts';



interface DropdownSectionProps {
  title: string;
  color: string;
  fields: string[];
  onFieldValueChange: (title: string, value: string) => void;
}


const DropdownSection = ({ title, color, fields, onFieldValueChange }: DropdownSectionProps) => {
  const [selectedField, setSelectedField] = useState('');

  const handleFieldValueChange = (value: string) => {
    setSelectedField(value);
    onFieldValueChange(title, value);
  };

  const colorVariants: IColorVariants = {
    'bright-pink': ['#D90368', 'bg-bright-pink', 'border-bright-pink', 'from-bright-pink'],
    'bright-green': ['#10E62C','bg-bright-green', 'border-bright-green', 'from-bright-green'],
    'bright-orange': ['#FF4D00','bg-bright-orange', 'border-bright-orange', 'from-bright-orange'],
    'bright-blue': ['#5CE1E6','bg-bright-blue', 'border-bright-blue', 'from-bright-blue'],
    'bright-yellow': ['#FFE347','bg-bright-yellow', 'border-bright-yellow', 'from-bright-yellow'],
    'bright-blue-2': ['#004AAD','bg-bright-blue-2', 'border-bright-blue-2', 'from-bright-blue-2'],
  };

  function getColorClassNames(color: string): string[] {
    if (colorVariants.hasOwnProperty(color)) {
      return colorVariants[color];
    } else {
      throw new Error(`Color ${color} is not defined in colorVariants`);
    }
  };

  return (
      <div className='text-center text-white font-bold'>
        <div className={`flex items-center justify-center w-[50vh] h-[10vh] p-4 ${getColorClassNames(color)[1]} text-3xl`}>
          {title}
        </div>
        <div className="w-[50vh] h-[10vh] my-4 text-xl">
        {fields.map((field) => (
          <motion.div
            key={field}
            onClick={() => handleFieldValueChange(field)}
            className={`cursor-pointer mb-2 border-8 ${getColorClassNames(color)[2]}`}
            whileHover={{ scale: 1.2, backgroundColor: getColorClassNames(color)[0], transition: { duration: .5 } }}
          >
            <div className={`p-2 ${selectedField === field ? 'p-2' : ''} ${selectedField === field ? `bg-gradient-to-r ${getColorClassNames(color)[3]}` : ''}`}>

              {field}
            </div>
          </motion.div>
        ))}
      </div>
      </div>
  );
};


interface SliderSectionProps {
  title: string;
  color: string;
  min: string;
  max: string;
  onValueChange: (title: string, value: string) => void;
}

const SliderSection = ({ title, color, min, max, onValueChange }: SliderSectionProps) => {
  const [selectedValue, setSelectedValue] = useState(((parseInt(min) + parseInt(max)) / 2).toString());

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    onValueChange(title, value);
  };

  const colorVariants: Record<string, string[]> = {
    'bright-pink': ['#D90368', 'bg-bright-pink', 'border-bright-pink', 'from-bright-pink'],
    'bright-green': ['#10E62C','bg-bright-green', 'border-bright-green', 'from-bright-green'],
    'bright-orange': ['#FF4D00','bg-bright-orange', 'border-bright-orange', 'from-bright-orange'],
    'bright-blue': ['#5CE1E6','bg-bright-blue', 'border-bright-blue', 'from-bright-blue'],
    'bright-yellow': ['#FFE347','bg-bright-yellow', 'border-bright-yellow', 'from-bright-yellow'],
    'bright-blue-2': ['#004AAD','bg-bright-blue-2', 'border-bright-blue-2', 'from-bright-blue-2'],
  };

  function getColorClassNames(color: string): string[] {
    if (colorVariants.hasOwnProperty(color)) {
      return colorVariants[color];
    } else {
      throw new Error(`Color ${color} is not defined in colorVariants`);
    }
  };

  return (
    <div className='text-center text-white font-bold'>
      <div className={`flex items-center justify-center w-[50vh] h-[10vh] p-4 ${getColorClassNames(color)[1]} text-3xl`}>
        {title}
      </div>
      <div className="w-[50vh] h-[10vh] my-4 text-xl">
        <input
          type="range"
          min={min}
          max={max}
          step="1"
          value={selectedValue}
          onChange={(event) => handleValueChange(event.target.value)}
          className={`w-full h-4 ${getColorClassNames(color)[2]}`}
          style={{ background: `linear-gradient(to right, ${colorVariants[color][0]}, ${colorVariants[color][3]})` }}
        />
        <div className="flex justify-center">
          <div className="w-20 text-center font-bold">
            {title === "HEIGHT" ? HeightConverter(selectedValue) : WeightConverter(selectedValue)}
          </div>
        </div>
      </div>
    </div>
  );
};


function parseStreamedJSON(streamedData: string) {
  let parsedData = null;
  try {
    // Try to parse the JSON data as a whole
    parsedData = JSON.parse(streamedData);
  } catch (error) {
    // If the JSON parsing fails, handle partial parsing
    const lastBracketIndex = streamedData.lastIndexOf("]");
    if (lastBracketIndex !== -1) {
      const partialJSON = streamedData.slice(0, lastBracketIndex + 1);
      parsedData = JSON.parse(partialJSON);
    }
  }
  return parsedData;
}

// const parseStreamedJSON = (jsonString: string) => {
//   const json = jsonString.replace(/\|/g, '');
//   return JSON.parse(json);
// };


const WorkoutForm = () => {
  const [formData, setFormData] = useState({
    span: '',
    amount: '',
    level: '',
    duration: '',
    type: '',
    sport: '',
  });

  const handleFieldValueChange = (title: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [title.toLowerCase()]: value,
    }));
  };

  const { setAIData, } = useContext(AIDataContext);
  const [days, setDays] = useState<any[]>([]);

  useEffect(() => {
    setAIData(days as any);
  }, [days, setAIData]);

  const handleSubmit = async () => {
    const spanLength = parseInt(formData.span); 
      const initialDays = Array(spanLength).fill([]);
      setDays(initialDays); 
      
    try {
        const response = await fetch("/api/createWorkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({formData}),
        });

        const reader = response.body!.pipeThrough(new TextDecoderStream()).getReader();
        let allData = '';

        let counter = -1;

        while (true) {
            const {value, done} = await reader.read();
            if (done) break;
            allData += value;
            if (value.includes(']')) {  
              allData = allData.replace('|', '');

              const parsed = parseStreamedJSON(allData);
              setDays((prevDays) => {
                const updatedDays = [...prevDays];
                updatedDays[counter] = parsed;
                return updatedDays;
              });

              allData = '';
              counter++;

            }
        }

        setFormData({ 
          span: '',
          amount: '',
          level: '',
          duration: '',
          type: '',
          sport: '',
        });
    } catch (error) {
        console.error(error);
    };
  };

  return (
    <div className="flex flex-col mt-[20vh]">
      <div className={`grid md:grid-cols-2 sm:grid-cols-1 justify-items-center gap-y-[20vh] ${libreBaskerville.className}`}>
        <DropdownSection
          title="SPAN"
          color="bright-pink"
          fields={['1 Day Plan', '3 Day Plan', '30 Day Plan']}
          onFieldValueChange={handleFieldValueChange}
        />
        <DropdownSection
          title="LEVEL"
          color="bright-green"
          fields={['Beginner', 'Intermediate','Advanced']}
          onFieldValueChange={handleFieldValueChange}
        />
        <DropdownSection
          title="DURATION"
          color="bright-blue"
          fields={['15 Minutes', '30 Minutes', '60 Minutes']}
          onFieldValueChange={handleFieldValueChange}
        />
        <DropdownSection
          title="TYPE"
          color="bright-orange"
          fields={['Cardio', 'Weight Training', 'Calisthenics']}
          onFieldValueChange={handleFieldValueChange}
        />
        <SliderSection
          title="HEIGHT"
          color="bright-yellow"
          min={'48'}
          max={'84'}
          onValueChange={handleFieldValueChange}
        />
        <SliderSection
          title="WEIGHT"
          color="bright-blue-2"
          min={'100'}
          max={'300'}
          onValueChange={handleFieldValueChange}
        />
      </div>
      <motion.button
            className={`flex items-center mt-[30vh] mx-auto cursor-pointer mb-2 p-2`} //  ${getColorClassNames(color)[1]}
            onClick={() => handleSubmit()}
            whileHover={{ scale: 1.2, backgroundColor: "rgb(120, 81, 169)", transition: { duration: .5 } }}
          >
            <div className={`text-9xl hollow-text-3 text-center ${anton.className}`}> 
              DONE
            </div>
          </motion.button>
    </div>
  );
};

export default WorkoutForm;
