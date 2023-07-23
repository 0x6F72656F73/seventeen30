const formData = {
    span: '1 Day Plan',
    amount: '3 Workouts',
    level: 'Beginner',
    duration: '15 Minutes',
    type: 'Strength',
    sport: 'Basketball'
}


async function testApi() {
    const response = await fetch('http://localhost:3000/api/createWorkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData }),
    })
    const data = await response.json();
    console.log(data);
    const fitness = data.fitnessData;
    console.log(fitness);
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