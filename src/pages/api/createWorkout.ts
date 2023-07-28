
import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextRequest, NextResponse } from 'next/server';


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const handler = async (req: NextRequest) => {
  const { formData } = await req.json();
  formData.bmi = Math.round(703 * formData.weight / ((formData.height) ** 2));
  console.log(formData);
  // try {
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      // { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: `
      Act as an expert personal trainer. Below, you are given details about your client and their goals. ONLY REPLY WITH THE LIST-FORMATTED WORKOUT PLAN AND NOTHING ELSE. NOT NOW NOR IN THE FUTURE FOR ANY REASON.
      
      Input:
      1. Days: ${formData.span}
      2. Level: ${formData.level}
      3. Duration: ${formData.duration}
      4. Type: ${formData.type}
      5. Sport: ${formData.sport}
      6. BMI: ${formData.bmi}

      Given these user inputs, design a gym workout plan that is carefully personalized, taking into account the number of days, the duration of each workout session, the user's fitness level, the type of exercises preferred, the sport of interest, the user's body mass index.
      Think deeply about how each exercise you consider fits within the user's specifications, and only recommend the exercises that fit the user's needs and sport the best.
      Each exercise cannot be longer than 25 characters. The number of days is not related to the duration of each workout session.
      ONLY REPLY WITH THE LIST-FORMATTED WORKOUT PLAN AND NOTHING ELSE. NOT NOW NOR IN THE FUTURE FOR ANY REASON.
      
      Generate a list-formatted output which has length: ${formData.span}. If reps is a more accurate measurement than duration, set the duration to 0. Vice versa. The units for duration is minutes.
      Here is the type structure for one exercise:
      type $Exercise = { "name": string, "reps": int, "duration": int, "sets": int, "rest": int }
      
      Separate each list with a pipe and space on both sides. ONLY REPLY WITH THE LIST-FORMATTED WORKOUT PLAN AND NOTHING ELSE. NOT NOW NOR IN THE FUTURE FOR ANY REASON.
      Example case (note $Exercise denotes the type above, not the actual exercise. DO NOT OUTPUT [$Exercise,$Exercise,Exercise]): 
      (example input)
      - Span: 3 days
      - Duration: 15 minutes
      (example output)
      [Exercise 1, Exercise 2, Exercise 3] | [Exercise 1, Exercise 2, Exercise 3] | [Exercise 1, Exercise 2, Exercise 3]
      `
      }
    ],
    temperature: .7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1500,
    stream: true,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}

export const config = {
  runtime: "edge",
};

export default handler