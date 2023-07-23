
import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { formData } = req.body;
  console.log(formData);

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: `
      You are building a personalized workout plan based on user preferences. The user has provided the following inputs:

      1. Span: ${formData.span}
      2. Amount: ${formData.amount}
      3. Level: ${formData.level}
      4. Duration: ${formData.duration}
      5. Type: ${formData.type}
      6. Sport: ${formData.sport}
      

      Design a gym workout plan that fits the user's preferences and requirements. Take into account the span of the plan, the number of workouts per week, the user's fitness level, the duration of each workout, the type of exercises preferred, and the sport of interest. Each exercise should be something done at the gym.

      Generate a json output which has ${formData.span}-day entries. Do not output anything else. Here is the json structure:
      
      {
        "workout_days": {
          "day1": {
            "exercises": [
              {
                "exercise name": string,
                "reps": int,
                "sets": int,
                "rest": int
              },
            ],
          },
        }
      }`
      }
    ],
    temperature: 0.2,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1500,
  });
  const jsonString = completion.data.choices[0].message?.content;
  console.log(jsonString);
  const json = JSON.parse(jsonString);

  const workoutDays = json.workout_days;

  console.log(workoutDays);

  res.status(200).json({ workoutDays, usage: completion.data.usage });

  //   const allData = [];
  //   for (const day in workoutDays) {
  //       console.log(`Day: ${day}`);
        
  //       // Loop through the exercises of each day
  //       for (const exercise of workoutDays[day].exercises) {
  //         const exerciseName = exercise['exercise name'];
  //         console.log(exerciseName);
  //         const response = await fetch(`https://api.api-ninjas.com/v1/exercises?offset=9&name=${exerciseName}`, {
  //           method: 'GET',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             'X-Api-Key': process.env.API_NINJAS_API_KEY,
  //           },
  //         });

  //         const data = await response.json();
  //         console.log(data);
  //         allData.push(data);
  //       }

  //       console.log(allData);
        
  //       console.log(); // Add an empty line between days for readability
  //     }

  // res.status(200).json({ workoutDays, usage: completion.data.usage, fitnessData: allData });


}

// .000602



// const { formData } = req.body;

//   const completion = await openai.createChatCompletion({
//     model: 'gpt-3.5-turbo',
//     messages: [
//       { role: "system", content: "You are a helpful assistant." },
//       {
//         role: "user",
//         content: `
//         You are building a personalized workout plan based on user preferences. The user has provided the following inputs:

//         1. Span: ${formData.span}
//         2. Amount: ${formData.amount}
//         3. Level: ${formData.level}
//         4. Duration: ${formData.duration}
//         5. Type: ${formData.type}
//         6. Sport: ${formData.sport}

//         Design a gym workout plan that fits the user's preferences and requirements. Take into account the span of the plan, the number of workouts per week, the user's fitness level, the duration of each workout, the type of exercises preferred, and the sport of interest. Each exercise should be something done at the gym.

//         Generate a json output. Do not output anything else. Here is the json structure:

//         {
//           "workout_days": {
//             "day1": [
//               {
//                 "exercise_name": "Exercise 1",
//                 "duration": 30,
//                 "sets": 3,
//                 "reps": 12,
//                 "rest": 60
//               },
//               {
//                 "exercise_name": "Exercise 2",
//                 "duration": 45,
//                 "sets": 4,
//                 "reps": 10,
//                 "rest": 45
//               },
//               {
//                 "exercise_name": "Exercise 3",
//                 "duration": 60,
//                 "sets": 3,
//                 "reps": 8,
//                 "rest": 90
//               }
//             ]
//           }
//         }`
//       }
//     ],
//     functions: [
//       {
//         name: "parse_workout_plan",
//         description: "Parse the user's workout plan and generate a JSON output",
//         parameters: {
//           type: "object",
//             properties: {
//               workout_days: {
//                 type: "object",
//                 properties: {
//                   day1: {
//                     type: "array",
//                       items: {
//                         type: "object",
//                           properties: {
//                             exercise_name: {
//                               type: "string"
//                             },
//                             duration: {
//                               type: "number"
//                             },
//                             sets: {
//                               type: "integer"
//                             },
//                             reps: {
//                               type: "integer"
//                             },
//                             rest: {
//                               type: "integer"
//                             }
//                           },
//           }
//         }
//       },
//     }
//   },
//   required: ["exercise_name",
//   "duration",
//   "sets",
//   "reps",
//   "rest", "day1", "workout_days"]
//       }
//     }
//     ],
//     temperature: 0.7,
//     top_p: 1,
//     frequency_penalty: 0,
//     presence_penalty: 0,
//     max_tokens: 256,
//   });

//   // const jsonOutput = JSON.parse(completion.data.choices[0].message?.content);
//   res.status(200).send({ result: completion.data.choices[0].message?.content});
// }
