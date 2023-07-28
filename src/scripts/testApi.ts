const formData = {
    span: '7 Day Plan',
    level: 'Beginner',
    duration: '30 Minutes',
    type: 'Weight Training',
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

        console.log(response.status);

        const reader = response.body!.pipeThrough(new TextDecoderStream()).getReader();
        let allData = '';
        while (true) {
            const {value, done} = await reader.read();
            if (done) break;
            // console.log(value)
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
        console.log(allData.length);
    } catch (error) {
        console.log(error);
    }


}

testApi()