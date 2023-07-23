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
    'bright-pink': ['bg-bright-pink', 'border-bright-pink', 'from-bright-pink'],
    'bright-green': ['bg-bright-green', 'border-bright-green', 'from-bright-green'],
    'bright-orange': ['bg-bright-orange', 'border-bright-orange', 'from-bright-orange'],
    'bright-blue': ['bg-bright-blue', 'border-bright-blue', 'from-bright-blue'],
    'bright-yellow': ['bg-bright-yellow', 'border-bright-yellow', 'from-bright-yellow'],
    'bright-blue-2': ['bg-bright-blue-2', 'border-bright-blue-2', 'from-bright-blue-2'],
  };

  function getColorClassNames(color: string): string[] {
    if (colorVariants.hasOwnProperty(color)) {
      return colorVariants[color];
    } else {
      return ['bg-bright-pink', 'border-bright-pink'];
    }
  };
  
  // const getClassName = (isSelected, field, color) => {
  //   if (isSelected) {
  //     console.log(isSelected, field, color);
  //     return `p-4 bg-gradient-to-r`;
  //   } else {
  //     return `p-2`;
  //   }
  // };


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
            className={`cursor-pointer mb-2 border-8 ${getColorClassNames(color)[1]}`}
            whileHover={{ scale: 1.2, backgroundColor: "rgb(234 179 8)", transition: { duration: .5 } }}
          >
            <div className={`p-2 ${selectedField === field ? 'p-2' : ''} ${selectedField === field ? `bg-gradient-to-r ${getColorClassNames(color)[2]}` : ''}`}>

              {field}
            </div>
          </motion.div>
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

  const handleSubmit = async () => {
    console.log(formData);
      try {
          // Submit form data to API
          const response = await fetch("/api/createWorkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({formData}),
          });
  
          // Handle API response
          const data = await response.json();
          console.log(data);
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
          fields={['Cardio', 'Strength', 'Stretching']}
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
