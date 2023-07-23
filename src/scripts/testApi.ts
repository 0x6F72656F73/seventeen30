const formData = {
    span: '7 Day Plan',
    amount: '3 Workouts',
    level: 'Beginner',
    duration: '30 Minutes',
    type: 'Weight Training',
    sport: 'Basketball'
}


// call the api at :3000/api/getWorkout

async function testApi() {
    const response = await fetch('http://localhost:3000/api/getWorkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData }),
    })
    const data = await response.json();
    console.log(data.usage);``
    const days = data.workoutDays;
    console.log(days);
    console.log(typeof(days));
    for (const day in days) {
        console.log(`Day: ${day}`);
        
        // Loop through the exercises of each day
        for (const exercise of days[day].exercises) {
          console.log(exercise);
        }
        
        console.log(); // Add an empty line between days for readability
      }

}

testApi()