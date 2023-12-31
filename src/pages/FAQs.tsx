import { getColorClassNames } from '@/components/WorkoutForm';
import { anton, libreBaskerville } from '@/utils/fonts';

interface QAPairProps {
    question: string;
    answer: string;
    color: string;
}

const QAPair = ({question, answer, color}: QAPairProps) => {
    return (
        <div className={`flex flex-col mx-10`}>
            <div className='text-center text-white'>
                <div className={`flex w-max-content mx-4 ${getColorClassNames(color)[4]} text-5xl font-bold`}>
                    {question}
                </div>
            </div>
            <div className={`items-center mt-5 text-3xl text-center sm:text-justify font-bold`} dangerouslySetInnerHTML={{__html: answer}}>
            </div>
        </div>
    )
}

const FAQs = () => {
    return (
        <div className="flex flex-col">
            <div className='flex flex-col items-center'>
                    <div className={`text-8xl tsm:text-10xl ${anton.className} text-bright-pink`}>
                        FAQs
                    </div>

                <div className={`flex flex-col gap-y-20 mt-16 ${libreBaskerville.className}`}>
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
                    answer={'Upon entering your information, we will calculate your BMI according to your height and weight. The AI will then use the other information submitted to create a customized workout program for you. Refer to the <a href="/resource-library" class="underline underline-offset-2">Resource Library</a> for information regarding BMI.'}
                    color='bright-green' />
                </div>
            
            </div>
        </div>
)};

export default FAQs;