import { IColorVariants } from '@/types/common';

export const colorVariants: IColorVariants = {
  'bright-pink': ['#D90368', 'bg-bright-pink', 'border-bright-pink', 'from-bright-pink', 'text-bright-pink'],
  'bright-green': ['#10E62C', 'bg-bright-green', 'border-bright-green', 'from-bright-green', 'text-bright-green'],
  'bright-orange': ['#FF4D00', 'bg-bright-orange', 'border-bright-orange', 'from-bright-orange'],
  'bright-blue': ['#5CE1E6', 'bg-bright-blue', 'border-bright-blue', 'from-bright-blue'],
  'bright-yellow': ['#FFE347', 'bg-bright-yellow', 'border-bright-yellow', 'from-bright-yellow', '[&::-webkit-slider-runnable-track]:bg-bright-yellow'],
  'bright-blue-2': ['#004AAD', 'bg-bright-blue-2', 'border-bright-blue-2', 'from-bright-blue-2', '[&::-webkit-slider-runnable-track]:bg-bright-blue-2'],
  'bright-purple': ['#CB6CE6', 'bg-bright-purple', 'border-bright-purple', 'from-bright-purple'],
  'bright-purple-2': ['#5E1474', 'bg-bright-purple-2', 'border-bright-purple-2', 'from-bright-purple-2']
};

const getColorClassNames = (color: string): string[] => {
  if (colorVariants.hasOwnProperty(color)) {
    return colorVariants[color];
  } else {
    throw new Error(`Color ${color} is not defined in colorVariants`);
  }
};

export default getColorClassNames;
