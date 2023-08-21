import Image from 'next/image'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion';

import { getColorClassNames } from '@/components/WorkoutForm'

import { anton, libreBaskerville } from '@/utils/fonts'
import { checkValid } from '@/utils'

interface TextSelectProps {
    title: string;
    color: string;
    type: string;

    onValueChange: (title: string, value: string) => void;
}


const TextSelect = ({ title, color, onValueChange, type }: TextSelectProps) => {
    const [selectedValue, setSelectedValue] = useState('');
  
    const handleValueChange = (value: string) => {
      const result = type === "text" ? value.replace(/[^a-z]/gi, '') : value; // no numbers in text
      setSelectedValue(result);
      onValueChange(title, result);
    };
  
  
    return (
      <div className='text-center text-white font-bold'>
        <div className={`flex items-center justify-center rounded-[4rem] w-[42rem] h-[8rem] p-4 ${getColorClassNames(color)[1]} text-4xl`}>
          {title}
        </div>
        <div>
          <motion.input type={type} placeholder='Type here' className={`bg-transparent rounded-[4rem] w-[42rem] h-[5rem] border-4 ${getColorClassNames(color)[2]} mt-8 text-4xl text-center`}
            value={selectedValue} onChange={(event) => handleValueChange(event.target.value)}
            whileHover={{ scale: 1.2, transition: { duration: .5 } }}/>
        </div>
      </div>
    );
};

const customTheme = {
  default: {
    colors: {
      brand: '#10e62c',
      brandAccent: '#d90368',
      brandButtonText: '#fff',
      inputLabelText: '#004AAD',
      inputPlaceholder: '#5CE1E6',
      messageText: '#5CE1E6',
      inputText: '#5CE1E6',
    },
    fontSizes: {
      baseBodySize: '1.5rem',
      baseInputSize: '1.7rem',
      baseLabelSize: '1.7rem',
      baseButtonSize: '1.7rem',
    },
    fonts: {
      bodyFontFamily: `${anton.className}`,
    buttonFontFamily: `${anton.className}`,
    inputFontFamily: `${anton.className}`,
    labelFontFamily: `${anton.className}`,
    }
  },
}
  
const Register = () => {
  const supabaseClient = useSupabaseClient()
  const user = useUser()

  const [onError, setOnError] = useState("");

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    age: '',
    weight: '',
    height: '',
  });

  const handleFieldValueChange = (title: string, value: string) => {
    title = title.replace(' ', '_')
    setFormData((prevFormData) => ({
      ...prevFormData,
      [title.toLowerCase()]: value,
    }));
  };


  const handleSubmit = async () => {
    if (!checkValid(formData)) {
      setOnError("Please fill out all fields");
      return;
    }

    try {
      const resp = await fetch("/api/registerUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({formData}),
        });

      const data = await resp.json();
      console.log(data);
    } catch (error) {
      console.error(error);
      // const { code } = error;
      // console.log(code);
      setOnError("Rate limit reached. Retrying automatically, please wait...");
    }
  }

  if (!user)
    return (
      <div className={`flex justify-center items-center mx-20 ${anton.className}`}>
        <Auth
          redirectTo="http://localhost:3000/register"
          appearance={{ theme: customTheme }}
          supabaseClient={supabaseClient}
          providers={['discord']}
          socialLayout="horizontal"
        />
      </div>
    )

  
  return (
    <div className='flex flex-col'>
        <div className={`text-center text-8xl ${anton.className} text-bright-pink`}>
            Register
        </div>
        <button onClick={() => supabaseClient.auth.signOut()}>Sign Out</button>

        <div className={`grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 justify-items-center gap-y-40 mt-40 ${libreBaskerville.className}`}>
          <TextSelect
              title="FIRST NAME"
              color="bright-pink"
              type='text'
              onValueChange={handleFieldValueChange}
          />
          <TextSelect
              title="LAST NAME"
              color="bright-green"
              type='text'
              onValueChange={handleFieldValueChange}
          />
          <TextSelect
              title="AGE"
              color="bright-orange"
              type='number'
              onValueChange={handleFieldValueChange}
          />
          <TextSelect
              title="WEIGHT"
              color="bright-blue"
              type='number'
              onValueChange={handleFieldValueChange}
          />
          <TextSelect
              title="HEIGHT"
              color="bright-yellow"
              type='number'
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

        {onError && <div className={`flex flex-col justify-center items-center mt-20 ${libreBaskerville.className} text-red-500`}>{onError}</div>}
    </div>
    )
}

export default Register