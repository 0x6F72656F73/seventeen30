import { useState } from 'react';
import { Anton, Libre_Baskerville } from 'next/font/google'
import {IColorVariants} from '@/types/common'
import { motion } from 'framer-motion';

const libreBaskerville = Libre_Baskerville({ weight: '400', subsets: ['latin'] })




interface SectionProps {
  title: string;
  color: string;
  fields: string[];
  onFieldValueChange: (title: string, value: string) => void;
}


const Section = ({ title, color, fields, onFieldValueChange }: SectionProps) => {
  const [selectedField, setSelectedField] = useState('');

  const handleFieldValueChange = (value: string) => {
    setSelectedField(value);
    onFieldValueChange(title, value);
  };

  const colorVariants: IColorVariants = {
    'bright-pink': ['bg-bright-pink', 'border-bright-pink'],
    'bright-green': ['bg-bright-green', 'border-bright-green'],
    'bright-orange': ['bg-bright-orange', 'border-bright-orange'],
    'bright-blue': ['bg-bright-blue', 'border-bright-blue'],
    'bright-yellow': ['bg-bright-yellow', 'border-bright-yellow'],
    'bright-blue-2': ['bg-bright-blue-2', 'border-bright-blue-2'],
  };

  function getColorClassNames(color: string): string[] {
    if (colorVariants.hasOwnProperty(color)) {
      return colorVariants[color];
    } else {
      return ['bg-bright-pink', 'border-bright-pink'];
    }
  };


  return (
      <div className='text-center text-white font-bold'>
        <div className={`flex items-center justify-center w-[50vh] h-[10vh] p-4 ${getColorClassNames(color)[0]} text-3xl`}>
          {title}
        </div>
        <div className="w-[50vh] h-[10vh] my-4 text-xl">
          {fields.map((field) => (
             <motion.div
            key={field}
            onClick={() => handleFieldValueChange(field)}
            className={`cursor-pointer p-2 mb-2 border-8 ${getColorClassNames(color)[1]}`}
            whileHover={{ scale: 1.1 }} // Animation when hovering over the field
            whileTap={{ scale: 0.9 }} // Animation when the field is clicked
            // animate={selectedField === field ? { x:100 } : {}} // Animation when a field is selected
            transition={selectedField === field ? { ease: "linear",
            duration: 2,
            x: { duration: 1 }} : {}}
           >
             {field}
           </motion.div>
            // <div
            //   key={field}
            //   onClick={() => handleFieldValueChange(field)}
            //   className={`cursor-pointer p-2 mb-2 border-8 ${getColorClassNames(color)[1]}`}
            // >
            //   {field}
            // </div>
          ))}
        </div>
      </div>
  );
};

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

  const handleSubmit = () => {
    // Here, you can use the formData to send the data to your server or API endpoint.
    // Replace 'your-api-endpoint' with the actual endpoint where you want to send the data.
    console.log(formData); // Example: { time: '7 day plan', level: 'beginner' }
  };

  return (
    <div className="flex flex-col">
      <div className={`grid md:grid-cols-2 sm:grid-cols-1 justify-items-center gap-y-[20vh] mt-[30vh] ${libreBaskerville.className}`}>
        <Section
          title="SPAN"
          color="bright-pink"
          fields={['1 Day Plan', '7 Day Plan', '30 Day Plan']}
          onFieldValueChange={handleFieldValueChange}
        />
        <Section
          title="AMOUNT"
          color="bright-green"
          fields={['3 Workouts', '4 Workouts', '5 Workouts']}
          onFieldValueChange={handleFieldValueChange}
        />
        <Section
          title="LEVEL"
          color="bright-orange"
          fields={['Beginner', 'Intermediate','Advanced']}
          onFieldValueChange={handleFieldValueChange}
        />
        <Section
          title="DURATION"
          color="bright-blue"
          fields={['15 Minutes', '30 Minutes', '60 Minutes']}
          onFieldValueChange={handleFieldValueChange}
        />
        <Section
          title="TYPE"
          color="bright-yellow"
          fields={['Cardio', 'Weight Training', 'Calisthenics']}
          onFieldValueChange={handleFieldValueChange}
        />
        <Section
          title="SPORT"
          color="bright-blue-2"
          fields={['Basketball', 'Soccer', 'Football']}
          onFieldValueChange={handleFieldValueChange}
        />
      </div>
      <button onClick={handleSubmit} className="flex items-center mt-[30vh] mx-auto">
      <motion.div whileTap={{ scale: 0.9 }}>
        <div className="text-9xl hollow-text-3 text-center"> 
          DONE
        </div>
      </motion.div>
      </button>
    </div>
  );
};

export default WorkoutForm;
