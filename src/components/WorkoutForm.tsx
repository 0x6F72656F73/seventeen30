import { useState } from 'react';
import { Anton, Libre_Baskerville } from 'next/font/google'
 
const libreBaskerville = Libre_Baskerville({ weight: '400', subsets: ['latin'] })

import {IColorVariants} from '@/types/common'


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
    <div className='text-center text-white font-bold '>
      <div className={`flex items-center justify-center w-[50vh] h-[10vh] p-4 ${getColorClassNames(color)[0]} text-3xl`}>
        {title}
      </div>
      <div className="w-[50vh] my-4">
        {fields.map((field) => (
          <div
            key={field}
            onClick={() => handleFieldValueChange(field)}
            className={`cursor-pointer p-2 mb-2 border-2 ${getColorClassNames(color)[1]}`}
          >
            {field}
          </div>
        ))}
      </div>
    </div>
  );
};

const WorkoutForm = () => {
  const [formData, setFormData] = useState({
    totalTime: '',
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
    <div className={`grid grid-cols-2 justify-items-center gap-y-[5vh] mt-[5vh] ${libreBaskerville.className}`}>
      <Section
        title="TIME"
        color="bright-pink"
        fields={['1 day plan', '7 day plan', '30 day plan']}
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
        title="TIME"
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
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        Submit
      </button>
    </div>
  );
};

export default WorkoutForm;
