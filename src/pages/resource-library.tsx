import Image from 'next/image';

import { anton, libreBaskerville } from '@/utils/fonts';

interface SpotifyBoxProps {
    playlistName: string;
    playlistLink: string;
}
const SpotifyBox = ({playlistLink, playlistName}: SpotifyBoxProps) => {
    return (
        <div className='flex flex-col items-center'>
            <Image src='/images/spotify.svg' alt='spotify logo' width={274.2} height={274.2} className='brightness-[1.03]' />
            <div className='mt-[5vh] underline underline-offset-2 text-3xl text-center text-white '>
                {playlistName}
            </div>
        </div>
    )
}

interface BlockBoxProps {
    blockTitle: string;
    blockPoints: {
        [title: string]: string;
    }
    color: string;
}
const BlockBox = ({blockTitle, blockPoints, color}: BlockBoxProps) => {
    return (
        <div className='flex flex-col items-center'>
            <div className={`border-4 border-${color} p-8`}>
                <div className={`text-4xl text-${color}`}>
                    {blockTitle}
                </div>
                <ul className='list-disc'>
                    {Object.entries(blockPoints).map(([title, link], index) => {
                        return (
                            <li key={index} className='mt-[2vh] text-3xl'>
                                <a href={link} className='underline underline-offset-2 text-white' rel="noopener noreferrer">
                                    {title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

const ResourceLibrary = () => {
    return (
        <div className="flex flex-col mt-[6%]">
            <div className='flex flex-col items-center'>
                    <div className={`text-10xl ${anton.className}`}>
                        Resource Library
                    </div>
 
                <div className={`flex flex-row gap-x-40 mt-[5vh] ${libreBaskerville.className}`}>
                    <SpotifyBox playlistName={'Rap Workout Playlist'} playlistLink={'https://open.spotify.com/playlist/4mk1o6g93vy9e9DDOaapX3?si=fOWeIzR2Qs2nEDAO8tvk6A'}/>
                    <BlockBox blockTitle='BMI and Health Information'
                        blockPoints={{
                        "The WHO's Healthy Lifestyle Recommendation": 'https://www.who.int/europe/news-room/fact-sheets/item/a-healthy-lifestyle---who-recommendations',
                        "NASM's Health and Fitness as a Lifestyle": 'https://blog.nasm.org/behavior-change-and-motivation/how-to-make-health-and-fitness-a-lifestyle',
                        }}
                        color='bright-pink' />
                </div>
            
            </div>
        </div>
)}

export default ResourceLibrary;