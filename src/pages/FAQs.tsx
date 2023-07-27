import { getColorClassNames } from '@/components/WorkoutForm';
import { anton, libreBaskerville } from '@/utils/fonts';

interface QAPairProps {
    question: string;
    answer: string;
    color: string;
}

const QAPair = ({question, answer, color}: QAPairProps) => {
    return (
        <div className={`flex flex-col mb-[8vh] ml-[3vh] mr-[3vh]`}>
            <div className='text-center text-white'>
                <div className={`flex w-max-content ml-[5vh] p-4 ${getColorClassNames(color)[4]} text-5xl font-bold`}>
                    {question}
                </div>
            </div>
            <div className={`items-center mt-[3vh] ml-[20vh] pl-16 pr-16 text-3xl text-justify font-bold opacity-80`}>
                {answer}
            </div>
        </div>
    )
}

const FAQs = () => {
    return (
        <div className="flex flex-col mt-[6%]">
            <div className='flex flex-col items-center'>
                    <div className={`text-10xl ${anton.className} text-bright-pink`}>
                        FAQs
                    </div>

                <div className={`mt-[6vh] ${libreBaskerville.className}`}>
                    <QAPair question={'What is the best plan for me?'}
                    answer={'The best plan for you will fit into your lifestyle, it depends on your specific fitness goals, commitment level, and personal preferences. If you are looking for a quick workout to boost your energy or enhance your mood, the 1-Day Plan is great for you. Alternatively, for those seeking a moderate commitment level, the 7-day plan is ideal. A 30-Day Plan will work best for individuals seeking significant fitness improvement and long-term results, providing ample time to establish a consistent routine.'}
                    color='bright-green' />
                    <QAPair question={'What if I miss a day of the plan?'}
                    answer={'No worries! Simply integrate that missed day as a rest day, or take an extra day to add the missed workout. Rest days are essential for the body to heal and recover after intense workouts. They contribute to improved overall performance and long-term fitness improvement by reducing the risk of overtraining, preventing injuries, and encouraging muscular growth.'}
                    color='bright-pink' />
                    <QAPair question={'What should I be eating?'}
                    answer={`In order to fuel your body for these activities, you must consume a balanced, healthy diet. Depending on your needs, please contact a licensed dietitian or nutritionist as everyone's bodies are different and react to diets differently.`}
                    color='bright-green' />
                    <QAPair question={'How do I make the most of my program?'}
                    answer={'To avoid injury, maintain proper form throughout the workouts. Continuous improvement requires progression, therefore as the program progresses, experiment with larger weights or increase the intensity of bodyweight exercises. Listen to your body and rest if you feel tired or uncomfortable. To attain best results, combine your plan with a healthy diet.'}
                    color='bright-pink' />
                    <QAPair question={'What do we do with your information?'}
                    answer={'Upon entering your information, we will calculate your BMI according to your height and weight. The AI will then use the other information submitted to create a customized workout program for you. Refer to the Resource Library for information regarding BMI.'}
                    color='bright-green' />
                </div>
            
            </div>
        </div>
)};

export default FAQs;