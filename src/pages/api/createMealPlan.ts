
import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextRequest } from 'next/server';


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const handler = async (req: NextRequest) => {
  const { formData } = await req.json();
  // formData.bmi = Math.round(703 * formData.weight / ((formData.height) ** 2));
  // console.log(formData);
  // try {
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      // { role: "system", content: "You are a helpful assistant." },
      {
        role: "user", content: `
      Act as an expert nutritionist. Below, you are given details about your client and their goals. ONLY REPLY WITH THE LIST-FORMATTED MEAL PLAN AND NOTHING ELSE. NOT NOW NOR IN THE FUTURE FOR ANY REASON.
      
      Input:
      1. Days: ${formData.span}
      2. Goal: ${formData.goal}
      3. Macro specifications: ${formData.macros}
      4. Days exercising per week: ${formData.exercise}
      5. Ingredients already on hand: ${formData.ingredients}
      6. Dietary restrictions: ${formData.restrictions}

      Given these user inputs, design a meal plan that is carefully personalized, providing breakfast, lunch, and dinner for the given number of days.
      Think deeply about how each meal you consider fits within the user's specifications, and only recommend the meals that fit the user's goal, activity level,
      macro specifications, and dietary restrictions the best. Include meals that contain the ingredients already on hand specified by the user (if any),
      but do not necessarily limit the output to meals containing those ingredients. Try to introduce variation between meals as much as possible while
      keeping meals healthy, nutritional, and conforming with the given dietary restrictions.
      ONLY REPLY WITH THE LIST-FORMATTED MEAL PLAN AND NOTHING ELSE. NOT NOW NOR IN THE FUTURE FOR ANY REASON.
      
      Generate a list-formatted output which has a total of ${formData.span} lists.
      Here is the type structure for one meal:
      type $Meal = { "name": string, "calories": number, "protein": number, "carbs": number, "fat": number }
      required constraint: name.length < 20
      
      Separate each list with a pipe and space on both sides. ONLY REPLY WITH THE LIST-FORMATTED MEAL PLAN AND NOTHING ELSE. NOT NOW NOR IN THE FUTURE FOR ANY REASON.
      For each day, only provide a list of 3 meals, breakfast being the first, lunch the second, and dinner the third. Do not label the meals - whether a meal is breakfast,
      lunch, or dinner will be understood by its place in the list. Example case (note $Meal denotes the type above, not the actual meal. DO NOT OUTPUT [$Meal,$Meal,Meal]): 
      (example input)
      - Span: 3 days
      (example output)
      [Meal 1, Meal 2, Meal 3] | [Meal 1, Meal 2, Meal 3] | [Meal 1, Meal 2, Meal 3]
      `
      }
    ],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}

export const config = {
  runtime: "edge",
};

export default handler