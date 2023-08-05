import Image from 'next/image'

import TypeIt from 'typeit-react';

import { anton, libreBaskerville } from '@/utils/fonts';

const MISSION_STATEMENT= [
"In the past, individuals have required an expensive personal trainer to receive personalized workouts.",
" However, <span style='color: #10e62c;'>Seventeen</span><span style='color: #d90368;'>30</span> aims to change that:",
" our mission is to democratize fitness, giving users custom, professional-quality workout plans with the click of a button.",
" By leveraging the power of generative AI, Seventeen 30 offers an unprecedented new approach to your exercise routine..."]

interface MemberBioProps {
    name: string;
    sections: string[];
    img: string;
    borderColor: string;
};

const headers = ['ROLE', 'AREA', 'MORE']
const MemberBio = ({ name, sections, img, borderColor }: MemberBioProps) => {
    const firstName = name.split(' ')[0];
    const lastName = name.split(' ')[1];
    
    return (
    <div className='flex flex-col md:flex-row place-items-center max-w-full'> 
        <Image src={img} alt={name} width={300} height={0} className='h-auto' style={{ borderRadius: '50%', border: `4px solid ${borderColor}`}} />

        <div className='flex flex-col place-items-center'>
            <div className={`flex flex-wrap gap-4 text-7xl mt-12 ${anton.className}`}>
                <div className='text-bright-green'>
                    {firstName}
                </div>
                <div className='text-bright-pink'>
                    {lastName}
                </div>
            </div>
            <div className={`flex flex-col place-items-center min-w-[43rem] md:min-w-[55rem] mt-4 text-3xl  whitespace-break-spaces ${libreBaskerville.className}`}>
                {sections.map((section, index) => (
                    <div key={index} className='mb-10'>
                        {headers[index]}: {section}
                    </div>
                ))}
            </div>
        </div>
        
    </div>
)};

const About = () => (
    <div className="flex flex-col mt-[10rem]">
        <div className='flex flex-col items-center'>
            <div className={`flex flex-wrap gap-8 text-8xl md:text-10xl ${anton.className}`}>
                <div className='text-bright-green'>
                    OUR
                </div>
                <div className='text-bright-pink'>
                    MISSION
                </div>
            </div>

            <div className={`text-center text-3xl sm:text-4xl mt-6 mx-8 ${libreBaskerville.className}`}>
            <TypeIt
                getBeforeInit={(instance) => {
                    instance.type(MISSION_STATEMENT[0]).pause(2000).type(MISSION_STATEMENT[1]).pause(2000).type(MISSION_STATEMENT[2]).pause(2000).type(MISSION_STATEMENT[3]);
                    return instance;
                }}
                options={{
                    speed: 25,
                    waitUntilVisible: true,
                }}
            />
            </div>

            <div className={`flex flex-wrap gap-8 mt-32 text-8xl md:text-10xl ${anton.className}`}>
                <div className='text-bright-green'>
                    THE
                </div>
                <div className='text-bright-pink'>
                    TEAM
                </div>
            </div>
        </div>

        <div className='grid grid-cols-1 gap-y-20 justify-items-center mt-20 '>
            <MemberBio 
                name='Rahul Datta'
                sections={['Head Web Developer', 'Pleasanton, California', 'President of Tri-Valley Hacks']}
                img='/images/Rahul4.png'
                borderColor="#10E62C"
            />
            <MemberBio 
                name='Sana Khan'
                sections={['Product Designer','Vestal, New York', 'Stem-e YDCP Team Leader']}
                img='/images/Sana.png'
                borderColor="#D90368"
            />
            <MemberBio 
                name='Jack Deutsch'
                sections={['Prompt Engineer', 'McLean, Virginia', 'CASPCA Website UI Designer']}
                img='/images/Jack.png'
                borderColor="#10E62C"
            />
            <MemberBio 
                name='Gina Kaiser'
                sections={['UI & UX designer', 'Burke, Virginia', 'Dancer at Buffas Dance Studio']}
                img='/images/Gina.png'
                borderColor="#D90368"
            />
        </div>
    </div>
);

export default About;
