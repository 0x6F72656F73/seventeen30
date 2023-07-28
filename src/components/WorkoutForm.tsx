import { useState, useContext, useEffect } from 'react';
import {IColorVariants} from '@/types/common'
import { motion } from 'framer-motion';

import AIDataContext from '@/utils/AIDataContext';
import { HeightConverter, WeightConverter } from '@/utils';
import { libreBaskerville, anton } from '@/utils/fonts';


const HEIGHT_WEIGHT_MIN_MAX = {
  'HEIGHT': [48, 84],
  'WEIGHT': [100, 300],
};

interface DropdownSelectProps {
  title: string;
  color: string;
  fields: string[];
  onFieldValueChange: (title: string, value: string) => void;
}

export const colorVariants: IColorVariants = {
    'bright-pink': ['#D90368', 'bg-bright-pink', 'border-bright-pink', 'from-bright-pink', 'text-bright-pink'],
    'bright-green': ['#10E62C','bg-bright-green', 'border-bright-green', 'from-bright-green', 'text-bright-green'],
    'bright-orange': ['#FF4D00','bg-bright-orange', 'border-bright-orange', 'from-bright-orange'],
    'bright-blue': ['#5CE1E6','bg-bright-blue', 'border-bright-blue', 'from-bright-blue'],
    'bright-yellow': ['#FFE347','bg-bright-yellow', 'border-bright-yellow', 'from-bright-yellow', '[&::-webkit-slider-runnable-track]:bg-bright-yellow'],
    'bright-blue-2': ['#004AAD','bg-bright-blue-2', 'border-bright-blue-2', 'from-bright-blue-2', '[&::-webkit-slider-runnable-track]:bg-bright-blue-2'],
    'bright-purple': ['#CB6CE6','bg-bright-purple', 'border-bright-purple', 'from-bright-purple'],
    'bright-purple-2': ['#5E1474', 'bg-bright-purple-2', 'border-bright-purple-2', 'from-bright-purple-2']
  };

export const getColorClassNames = (color: string): string[] => {
    if (colorVariants.hasOwnProperty(color)) {
      return colorVariants[color];
    } else {
      throw new Error(`Color ${color} is not defined in colorVariants`);
    }
  };


const DropdownSelect = ({ title, color, fields, onFieldValueChange }: DropdownSelectProps) => {
  const [selectedField, setSelectedField] = useState('');

  const handleFieldValueChange = (value: string) => {
    setSelectedField(value);
    onFieldValueChange(title, value);
  };

  return (
      <div className='text-center text-white font-bold'>
        <div className={`flex items-center justify-center rounded-[40px] w-[50vh] h-[10vh] p-4 ${getColorClassNames(color)[1]} text-4xl`}>
          {title}
        </div>
        <div className="w-[50vh] h-[10vh] my-[2vh] text-3xl">
        {fields.map((field) => (
          <motion.div
            key={field}
            onClick={() => handleFieldValueChange(field)}
            className={`cursor-pointer mb-[2vh] border-8 rounded-[30px] ${getColorClassNames(color)[2]}`}
            whileHover={{ scale: 1.2, backgroundColor: getColorClassNames(color)[0], transition: { duration: .5 } }}
          >
            <div className={`p-5 ${selectedField === field ? `${getColorClassNames(color)[1]} rounded-[10px]` : ''}`}>
              {field}
            </div>
          </motion.div>
        ))}
      </div>
      </div>
  );
};



interface SliderSelectProps {
  title: string;
  color: string;
  min: string;
  max: string;
  onValueChange: (title: string, value: string) => void;
}

const SliderSelect = ({ title, color, min, max, onValueChange }: SliderSelectProps) => {
  const [selectedValue, setSelectedValue] = useState(((parseInt(min) + parseInt(max)) / 2).toString());

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    onValueChange(title, value);
  };

  return (
    <div className='text-center text-white font-bold'>
      <div className={`flex items-center justify-center rounded-[40px] w-[50vh] h-[10vh] p-4 ${getColorClassNames(color)[1]} text-4xl`}>
        {title}
      </div>
      <div className="w-[50vh] h-[10vh] my-4 text-xl">
        <motion.input type="range" min={min} max={max} step="1"
          value={selectedValue}  onChange={(event) => handleValueChange(event.target.value)}
          className={`w-full mt-7 appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full
          ${getColorClassNames(color)[4]} [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:h-[50px] [&::-webkit-slider-thumb]:w-[50px] 
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white`}
          whileHover={{ scale: 1.2, transition: { duration: .5 } }}/>


        <div className="flex justify-center">
          <div className="w-30 mt-5 px-5 py-2 border-4 text-center text-4xl font-black">
            {title === "HEIGHT" ? HeightConverter(selectedValue) : WeightConverter(selectedValue)}
          </div>
        </div>
      </div>
    </div>
  );
};


interface TextSelectProps {
  title: string;
  color: string;

  onValueChange: (title: string, value: string) => void;
}

const TextSelect = ({ title, color, onValueChange }: TextSelectProps) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    onValueChange(title, value);
  };


  return (
    <div className='text-center text-white font-bold'>
      <div className={`flex items-center justify-center rounded-[40px]  w-[50vh] h-[10vh] p-4 ${getColorClassNames(color)[1]} text-4xl`}>
        {title}
      </div>
      <div>
        <motion.input type='text' className="bg-transparent rounded-[40px] w-[50vh] h-[50px] border-4 mt-8 text-4xl text-center"
          value={selectedValue} onChange={(event) => handleValueChange(event.target.value)}
          whileHover={{ scale: 1.2, transition: { duration: .5 } }}/>
      </div>
    </div>
  );
};


function parseStreamedJSON(streamedData: string) {
  let parsedData = null;
  let extraData = '';
  try {
    // Try to parse the JSON data as a whole
    parsedData = JSON.parse(streamedData);
  } catch (error) {
    // If the JSON parsing fails, handle partial parsing. This occurs when the JSON is streamed in chunks. also return the extra data that was not parsed
    const lastBracketIndex = streamedData.lastIndexOf("]");
    if (lastBracketIndex !== -1) {
      const partialJSON = streamedData.slice(0, lastBracketIndex + 1);
      parsedData = JSON.parse(partialJSON);

      extraData = streamedData.slice(lastBracketIndex + 1);
    }
  }
  return [parsedData, extraData];
}

// const parseStreamedJSON = (jsonString: string) => {
//   const json = jsonString.replace(/\|/g, '');
//   return JSON.parse(json);
// };

function waitFor(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function retry(promise: () => Promise<Response>, onRetry: (retryNumber: number, timeToWait: number) => void, maxRetries: number,setOnError: (value: boolean) => void) {
  async function retryWithBackoff(retries: number): Promise<any> {
    // wait 15 seconds, 30 seconds, 60 seconds
    const timeToWait = retries * 15000;
    try {
      // Make sure we don't wait on the first attempt
      if (retries > 0) {
        console.log(`waiting for ${timeToWait}ms...`);
        await waitFor(timeToWait);
      }
      const x = await promise();
      const reader = x.body!.pipeThrough(new TextDecoderStream()).getReader();

      const {value} = await reader.read();
      if (value) {
        // console.log(value);
        return [reader, value];
      } else {
        throw new Error('done');
      }

    } catch (e) {
      if (retries < maxRetries) {
        onRetry(retries + 1, timeToWait);
        setOnError(true);
        return retryWithBackoff(retries + 1);
      } else {
        console.warn("Max retries reached. Bubbling the error up");
        throw e;
      }
    }
  }

  return retryWithBackoff(0);
}

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

  const { setAIData, } = useContext(AIDataContext);
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
    <div className="flex flex-col mt-[10vh]">
      <div className={`grid lg:grid-cols-2 md:grid-cols-1 justify-items-center gap-y-[32vh] ${libreBaskerville.className}`}>
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
            className={`flex items-center mt-[20vh] mx-auto cursor-pointer mb-2 p-2`} //  ${getColorClassNames(color)[1]}
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
