import {IColorVariants} from '@/types/common'

export const HeightConverter = (stringInches: string): string => {
    const intInches = parseInt(stringInches);
    const feet = Math.floor(intInches / 12);
    const inches = intInches % 12;
    return `${feet}"${inches}'`;
}

export const WeightConverter = (stringLbs: string): string => {
    return `${stringLbs} lbs`;
}

// IMPL TODO
// export const colorVariants: IColorVariants = {
//     'bright-pink': ['#D90368', 'bg-bright-pink', 'border-bright-pink', 'from-bright-pink'],
//     'bright-green': ['#10E62C','bg-bright-green', 'border-bright-green', 'from-bright-green'],
//     'bright-orange': ['#FF4D00','bg-bright-orange', 'border-bright-orange', 'from-bright-orange'],
//     'bright-blue': ['#5CE1E6','bg-bright-blue', 'border-bright-blue', 'from-bright-blue'],
//     'bright-yellow': ['#FFE347','bg-bright-yellow', 'border-bright-yellow', 'from-bright-yellow', '[&::-webkit-slider-runnable-track]:bg-bright-yellow'],
//     'bright-blue-2': ['#004AAD','bg-bright-blue-2', 'border-bright-blue-2', 'from-bright-blue-2', '[&::-webkit-slider-runnable-track]:bg-bright-blue-2'],
//   };

// export const getColorClassNames = (color: string): string[] => {
//     if (colorVariants.hasOwnProperty(color)) {
//         console.log(colorVariants[color]);
//       return colorVariants[color];
//     } else {
//       throw new Error(`Color ${color} is not defined in colorVariants`);
//     }
//   };