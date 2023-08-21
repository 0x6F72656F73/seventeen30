import { useContext } from 'react';
import Link from 'next/link';

import AIDataContext from "@/utils/AIDataContext";


const RegisterNow = () => {

    const { AIData } = useContext(AIDataContext);

    if (AIData === undefined || Object.keys(AIData).length === 0) {
        return;
    } 

    return (
        <div className="flex flex-col items-center mt-36 text-center">
            <div className='text-4xl'>
                Pro Tip
            </div>
                <div className='mt-10'>
                    <span>
                        <Link href="/register" className='underline underline-offset-2 hover:text-bright-green'>Register Now</Link>
                    </span>
                    <span className='ml-2'>
                        to save this workout and access all features.
                    </span>
                </div>            
        </div>
    );
}

export default RegisterNow;