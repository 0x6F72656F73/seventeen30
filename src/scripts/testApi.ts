const formData = {
    span: '8 Day Plan',
    level: 'Beginner',
    duration: '15 Minutes',
    type: 'Strength Training',
    sport: 'Basketball',
    height: '65',
    weight: '120',
}


const grabDay = (day: string) => {
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

            if (value.includes("]")) {
                allData = allData.replace('|', '');
                console.log("NEW DAY");
                try {
                const x = JSON.parse(allData);
                console.log(x,x.length);
                } catch (SyntaxError) {
                    console.log("Syntax Error:");
                    console.log(allData);
                }
                allData = '';
            }
        }
        
        console.log('Response fully received');
        console.log(allData);
    } catch (error) {
        console.log(error);
    }


}

testApi()