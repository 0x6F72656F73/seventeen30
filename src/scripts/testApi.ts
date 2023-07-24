const formData = {
    span: '3 Day Plan',
    amount: '1 Workouts',
    level: 'Beginner',
    duration: '15 Minutes',
    type: 'Cardio',
    sport: 'Basketball'
}


async function testApi() {
    try {

        const response = await fetch('http://localhost:3000/api/createWorkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({formData}),
        })

        const reader = response.body!.pipeThrough(new TextDecoderStream()).getReader();
        let allData = '';
        while (true) {
            const {value, done} = await reader.read();
            if (done) break;
            allData += value;
        }
        
        console.log('Response fully received');
        console.log(allData);

        // const data = response.body;
        // if (!data) {
        //     return;
        // }

        // const reader = data.getReader();
        // const decoder = new TextDecoder();
        // let done = false;

        // while (!done) {
        //     const { value, done: doneReading } = await reader.read();
        //     done = doneReading;
        //     const chunkValue = decoder.decode(value);
        //     const cleanedJsonString = chunkValue.substring("data: ".length);
        //     console.log(cleanedJsonString);
        //     const jsonData = JSON.parse(cleanedJsonString);
        //     console.log(jsonData.choices[0].delta.content);
        // }


        // for await (const chunk of response.body) {
        //     console.log(chunk.toString())
        // };
    } catch (error) {
        console.log(error);
    }
    // const data = await response.json();
    // console.log(data);
    // const fitness = data.fitnessData;
    // console.log(fitness);

    // const days = data.workoutDays;
    // console.log(days);

    // for (const day in days) {
    //     console.log(`Day: ${day}`);
        
    //     // Loop through the exercises of each day
    //     for (const exercise of days[day].exercises) {
    //       console.log(exercise);
    //     }
        
    //     console.log(); // Add an empty line between days for readability
    //   }

}

testApi()