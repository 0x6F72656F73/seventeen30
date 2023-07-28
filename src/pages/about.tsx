import Image from 'next/image'

import { anton, libreBaskerville } from '@/utils/fonts';

interface MemberBioProps {
    name: string;
    sections: string[];
    img: string;
    borderColor: string;
};

const headers = ['ROLE', 'PART', 'AREA', 'MORE']
const MemberBio = ({ name, sections, img, borderColor }: MemberBioProps) => {
    const firstName = name.split(' ')[0];
    const lastName = name.split(' ')[1];
    
    return (
    <div className='flex flex-row ml-[3vh] mb-[20vh]'>
        <div className="">
                <Image src={img} alt="Rahul Datta" height={400} width={400} style={{ borderRadius: '50%', border: `4px solid ${borderColor}`}} />

        </div>
        <div className='flex flex-col ml-10'>
            <div className={`flex flex-wrap gap-4 text-7xl mt-4 ${anton.className}`}>
                <div className='text-bright-green'>
                    {firstName}
                </div>
                <div className='text-bright-pink'>
                    {lastName}
                </div>
            </div>
            <div className={`min-w-[55vh] mt-4 text-4xl ${libreBaskerville.className}`}>
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
    <div className="flex flex-col mt-[6%]">
        <div className='flex flex-col items-center'>
            <div className={`flex flex-wrap gap-[2vh] text-10xl ${anton.className}`}>
                <div className='text-bright-green'>
                    OUR
                </div>
                <div className='text-bright-pink'>
                    MISSION
                </div>
            </div>

            <div className={`text-center text-4xl mt-[3vh] pl-16 pr-16 ${libreBaskerville.className}`}>
                In the past, individuals have required an expensive personal trainer to receive personalized workouts. 
                However, Seventeen 30 aims to change that: our mission is to democratize fitness, giving users custom, professional-quality workout plans with the click of a button. By leveraging the power of generative AI, Seventeen 30 offers an unprecedented new approach to your exercise.
            </div>

            <div className={`flex flex-wrap gap-[2vh] mt-[15vh] text-10xl ${anton.className}`}>
                <div className='text-bright-green'>
                    THE
                </div>
                <div className='text-bright-pink'>
                    TEAM
                </div>
            </div>
        </div>

        <div className='flex flex-wrap mt-[10vh]'>
            <MemberBio 
                name='Rahul Datta'
                sections={['Head Web Developer', 'Coded the backend of the website', 'Pleasanton, California', 'President of Tri-Valley Hacks']}
                img='/images/Rahul4.png'
                borderColor="#10E62C"
            />
            <MemberBio 
                name='Sana Khan'
                sections={['User Experience and Understanding', 'FAQ page, User Tutorial, and Resource Library', 'Vestal, New York', 'Stem-e YDCP Team Leader']}
                img='/images/Sana.png'
                borderColor="#D90368"
            />
            <MemberBio 
                name='Jack Deutsch'
                sections={['Prompt Engineer', 'Bridged the gap between the User and API', 'McLean, Virginia', 'CASPCA Website User Interface Designer']}
                img='/images/Jack.png'
                borderColor="#10E62C"
            />
            <MemberBio 
                name='Gina Kaiser'
                sections={['User Interface Designer', 'Website Layout, Logo, and Flow', 'Burke, Virginia', 'Competitive Dancer at Buffas Dance Studio']}
                img='/images/Gina.png'
                borderColor="#D90368"
            />
        </div>
        
    </div>
);

export default About;
