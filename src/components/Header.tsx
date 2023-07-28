import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'
import { motion } from "framer-motion";

import { libreBaskerville } from '@/utils/fonts';

const Header = () => {
    const [isHover, toggleHover] = useState(false);

    const toggleHoverMenu = () => {
        toggleHover(!isHover);
    };

    const subMenuAnimate = {
        enter: {
            opacity: 1,
            rotateX: 0,
            transition: {
            duration: 0.5
            },
            display: "block"
        },
        exit: {
            opacity: 0,
            rotateX: -15,
            transition: {
            duration: 0.5,
            delay: 0.3
            }
        }
    };

    return (
        <div className={`mt-10 text-5xl text-white ${libreBaskerville.className}`}>
            <div className="flex flex-row space-x-[13vh]">
                <div>
                    <Link href="/" className='ml-[14vh]'>HOME</Link>
                </div>
                <div>
                    <Link href="/tutorial" className='ml-[4vh]'>TUTORIAL</Link>
                </div>
                <Image src="images/seventeen30.svg" alt="Hero" priority={true} width="500" height="0" sizes="200vw" className="h-auto -mt-[5vh]" placeholder="blur" blurDataURL="images/seventeen30.svg"/>
                <div>
                    <Link href="/about" className='-ml-[5vh]'>ABOUT US</Link>
                </div>
                <div>
                    <motion.div
                    onHoverStart={toggleHoverMenu}
                    onHoverEnd={toggleHoverMenu}
                    >
                        <div className='flex flex-row'>
                            <div>MORE</div>
                            <svg
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            className={`inline w-[6vh] h-[8vh] ml-1 -mt-11 transition-transform duration-200 transform ${
                                isHover ? 'rotate-180' : 'rotate-0'
                            }`}
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </div>
                        <motion.div
                        className="flex flex-col mt-[1vh]"
                        initial="exit"
                        animate={isHover ? "enter" : "exit"}
                        variants={subMenuAnimate}
                        >
                            <div className="flex flex-col gap-y-[2vh]">
                                <Link href="/FAQs">FAQs</Link>
                                <Link href="/resource-library">Resource Library</Link>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Header;
