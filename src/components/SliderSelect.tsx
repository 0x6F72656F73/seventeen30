import { useState } from 'react';
import { motion } from 'framer-motion';

import { HeightConverter, WeightConverter } from '@/utils';
import getColorClassNames from '@/utils/getColorClassNames';


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
    <div className='text-center text-white font-bold mb-48'>
      <div className={`flex items-center justify-center rounded-[4rem] w-[42rem] h-[8rem] p-4 ${getColorClassNames(color)[1]} text-4xl`}>
        {title}
      </div>
      <div className="w-[42rem] h-[8rem] mt-1 text-xl">
        <motion.input type="range" min={min} max={max} step="1"
          value={selectedValue} onChange={(event) => handleValueChange(event.target.value)}
          className={`w-full mt-7 appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full
          ${getColorClassNames(color)[4]} [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:h-[5rem] [&::-webkit-slider-thumb]:w-[5rem] 
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white`}
          whileHover={{ scale: 1.2, transition: { duration: .5 } }} />


        <div className="flex justify-center">
          <div className="w-30 mt-5 px-5 py-2 border-4 text-center text-4xl font-black">
            {title === "HEIGHT" ? HeightConverter(selectedValue) : WeightConverter(selectedValue)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderSelect;
