import { useState } from "react";
import { motion } from "framer-motion";

import getColorClassNames from "@/utils/getColorClassNames";

interface TextSelectProps {
  title: string;
  color: string;
  placeholder: string;

  onValueChange: (title: string, value: string) => void;
}

const TextSelect = ({ title, color, placeholder, onValueChange }: TextSelectProps) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    onValueChange(title, value);
  };


  return (
    <div className='text-center text-white font-bold -mt-36 mb-60'>
      <div className={`flex items-center justify-center rounded-[4rem] w-[42rem] h-[8rem] p-4 ${getColorClassNames(color)[1]} text-4xl`}>
        {title}
      </div>
      <div>
        <motion.input type='text' placeholder={placeholder} className="bg-transparent rounded-[4rem] w-[42rem] h-[5rem] border-4 mt-8 text-4xl text-center"
          value={selectedValue} onChange={(event) => handleValueChange(event.target.value)}
          whileHover={{ scale: 1.2, transition: { duration: .5 } }} />
      </div>
    </div>
  );
};

export default TextSelect;
