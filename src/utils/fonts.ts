import { Anton } from 'next/font/google';
import { Libre_Baskerville } from 'next/font/google'


export const anton = Anton({ 
    weight: '400', 
    subsets: ['latin'] , 
    display: 'swap',
    variable: '--font-anton',
})

export const libreBaskerville = Libre_Baskerville({
    weight: '400', 
    subsets: ['latin'] , 
    display: 'swap',
    variable: '--font-libreBaskerville',
})