import { getColorClassNames } from '@/components/WorkoutForm';

import { anton, libreBaskerville } from '@/utils/fonts';

interface InitialStepProps {
    stepNumber: string;
    stepName: string;
    color: string;
    place: string;
    description: string;
}

const InitialStep = ({stepNumber, stepName, color, place, description}: InitialStepProps) => {
    return (
        <div className={`flex flex-col items-center ${place === 'r' ? 'sm:flex-row' : 'sm:flex-row-reverse'} mb-20`}>
            <div className='font-bold text-center text-white text-4xl '>
                <div className={`flex items-center justify-center rounded-[2rem] w-[36rem] h-20  ${place === 'r' ? 'sm:ml-[5vh]' : 'sm:mr-[5vh]' } p-4 ${getColorClassNames(color)[1]}`}>
                    STEP {stepNumber}: {stepName}
                </div>
            </div>
            <div className={`${place === 'r' ? 'sm:ml-[3vh]' : 'sm:mr-[3vh]' } mx-10 mt-3 text-2xl text-center lg:text-left xl:text-justify ${libreBaskerville.className}`} dangerouslySetInnerHTML={{__html: description}} />
        </div>
    )
}

interface LaterStepProps {
    stepNumber: string;
    stepName: string;
    color: string;
    description: string;
}

const LaterStep = ({stepNumber, stepName, color, description}: LaterStepProps) => {
    return (
        <div className={`flex flex-col items-center mb-10`}>
            <div className='text-center text-white font-bold text-4xl'>
                <div className={`flex items-center justify-center rounded-[2rem] w-[36rem] h-20 p-4 ${getColorClassNames(color)[1]}`}>
                    STEP {stepNumber}: {stepName}
                </div>
            </div>
            <div className={`mt-3 text-2xl text-center ${libreBaskerville.className}`}>
                {description}
            </div>
        </div>
    )
}




const Tutorial = () => {
    return (

            <div className='flex flex-col items-center'>
                    <div className={`text-8xl ${anton.className} text-bright-green`}>
                        Tutorial
                    </div>

                <div className={`mt-[6vh] mx-7 ${libreBaskerville.className}`}>
                    <InitialStep stepNumber={'1'} stepName='TIME' color={'bright-pink'} place={'r'} description='Consider how long you would like your program to be, specifically how much of a commitment you are willing to take on.
                    Refer to the <a href="/FAQs" class="underline underline-offset-2"> FAQs page</a> for a response on how to choose the best plan according to your needs and lifestyle.' />
                    <InitialStep stepNumber={'2'} stepName='LEVEL' color={'bright-green'} place={'l'} description='Beginners should pick the beginner level to lay good foundations, while those with some fitness background can choose the intermediate level for moderate intensity. 
                    People with a strong fitness background may choose the advanced level, which is customized to their advanced physical capability.' />
                    <InitialStep stepNumber={'3'} stepName='TYPE' color={'bright-orange'} place={'r'} description='Choose a type of program based on your fitness goals.
                    Cardio programs are ideal for increasing cardiovascular endurance and burning calories, while weight training building focuses on building muscle and strength development.
                    Calisthenics focuses on bodyweight movements to improve total functional fitness and flexibility.
                    Refer to the <a href="/resource-library" class="underline underline-offset-2">Resource Library</a> for more information.' />
                    <LaterStep stepNumber={'4'} stepName='DURATION' color={'bright-blue'} description={`Choose the amount of time you'd like your daily workout to take.`}/>
                    <LaterStep stepNumber={'5/6'} stepName='HEIGHT/WEIGHT' color={'bright-blue-2'} description='Use the scroller to enter your height and weight.' />
                    <LaterStep stepNumber={'7'} stepName='SPORT' color={'bright-purple'} description='Type in the sport you play, if any.' />
                    <LaterStep stepNumber={'8'} stepName='SUBMIT' color={'bright-purple-2'} description='Click the submit button to generate your workout plan!' />
                </div>
            </div>
    )
}

export default Tutorial;