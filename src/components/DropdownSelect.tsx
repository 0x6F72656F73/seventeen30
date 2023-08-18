import { motion } from "framer-motion";

import { useState } from "react";

import getColorClassNames from "@/utils/getColorClassNames";

interface DropdownSelectProps {
  title: string;
  color: string;
  fields: string[];
  onFieldValueChange: (title: string, value: string) => void;
}

const DropdownSelect = ({ title, color, fields, onFieldValueChange }: DropdownSelectProps) => {
  const [selectedField, setSelectedField] = useState('');

  const handleFieldValueChange = (value: string) => {
    setSelectedField(value);
    onFieldValueChange(title, value);
  };

  return (
    <div className='text-center text-white font-bold mb-20'>
      <div className={`flex items-center justify-center rounded-[4rem] w-[42rem] h-[8rem] p-4 ${getColorClassNames(color)[1]} text-4xl`}>
        {title}
      </div>
      <div className="my-[2rem] text-3xl">
        {fields.map((field) => (
          <motion.div
            key={field}
            onClick={() => handleFieldValueChange(field)}
            className={`cursor-pointer mb-5 border-8 rounded-[3rem] ${getColorClassNames(color)[2]}`}
            whileHover={{ scale: 1.2, backgroundColor: getColorClassNames(color)[0], transition: { duration: .5 } }}
          >
            <div className={`p-5 ${selectedField === field ? `${getColorClassNames(color)[1]} rounded-[1rem]` : ''}`}>
              {field}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DropdownSelect;
