import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image'
import { motion } from "framer-motion";

import { libreBaskerville } from '@/utils/fonts';

const Header = () => {
    const router = useRouter();
    const [isToggle, toggleHover] = useState(false);

    const toggleHoverMenu = () => {
        toggleHover(!isToggle);
    };

    const subMenuAnimate = {
        enter: {
            opacity: 1,
            rotateX: 0,
            transition: {
            duration: 0.5
            },
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
        <div className={`mt-16 mb-20 md:mb-32 text-white ${libreBaskerville.className}`}>
            <div className='xs:hidden md:hidden flex-row justify-around text-4xl'>
                <div className='hover:text-bright-green-300'>
                    <Link href="/">HOME</Link>
                </div>
                <div className='hover:text-bright-green-300'>
                    <Link href="/tutorial">TUTORIAL</Link>
                </div>
                <div className="ml-20 md:w-[20rem] lg:w-[40rem] outline-none">
                    <Image src="images/seventeen30.svg" alt="Hero" priority={true} width={0} height={0} className='w-auto h-auto' placeholder="blur" blurDataURL="images/seventeen30.svg"/>
                </div>
                <div className='hover:text-bright-green-300'>
                    <Link href="/about">ABOUT US</Link>
                </div>
                <div className='hover:text-bright-green-300'>
                    <Link href="/">MORE</Link>
                </div>
            </div>
            <div className="xs:hidden md:flex flex-row justify-around text-4xl">

                <div className='hover:text-bright-green-300'>
                    <Link href="/" >HOME</Link>
                </div>

                <div className='hover:text-bright-green-300'>
                    <Link href="/tutorial">TUTORIAL</Link>
                </div>
                
                <div className="md:w-[20rem] lg:w-[40rem] outline-none">
                    <Image src="images/seventeen30.svg" alt="Hero" priority={true} width={0} height={0} className='w-auto h-auto' placeholder="blur" blurDataURL="images/seventeen30.svg"/>
                </div>
                
                <div className='whitespace-nowrap hover:text-bright-green-300'>
                    <Link href="/about">ABOUT US</Link>
                </div>

                <motion.div
                onClick={toggleHoverMenu}
                className="flex flex-col justify-items-center items-center"
                >
                    <div className='flex flex-row hover:text-bright-green-300'>
                        <div>MORE</div>
                        <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        className={`inline w-[6vh] h-[8vh] -mt-8 transition-transform duration-200 transform ${
                            isToggle ? 'rotate-180' : 'rotate-0'
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
                    className={`flex flex-col mt-[1vh] ${isToggle ? "block" : "hidden"}`}
                    initial="exit"
                    animate={isToggle ? "enter" : "exit"}
                    variants={subMenuAnimate}
                    >
                        <div className="flex flex-col gap-y-[2vh] w-[5rem] text-center items-center">
                            <Link href="/FAQs" className='hover:text-bright-green-300'>FAQs</Link> 
                            <Link href="/resource-library" className='hover:text-bright-green-300'>RESOURCE LIBRARY</Link>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            <div className="xs:flex md:hidden flex-row justify-around text-2xl">
                <div className="w-[23rem] sm:w-[35rem]  h-20 outline-none">
                    <Image src="images/seventeen30.svg" alt="Hero" priority={true} width={0} height={0} className='h-auto w-auto' placeholder="blur" blurDataURL="images/seventeen30.svg"/>
                </div>

                <motion.div
                    onClick={toggleHoverMenu}
                    className="flex flex-col"
                    >
                    <div className='flex flex-col items-center hover:text-bright-green-300 '>
                        <div className={`${isToggle ? "text-bright-green" : ""} mt-2 -mb-5 text-5xl`}>
                            MENU
                        </div>
                        <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        className={`inline w-20 h-20 ml-1 -mb-9 transition-transform duration-200 transform ${
                            isToggle ? 'rotate-180' : 'rotate-0'
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
                    className={`mt-8 ${isToggle ? "block" : "hidden"}`}
                    initial="exit"
                    animate={isToggle ? "enter" : "exit"}
                    variants={subMenuAnimate}
                    >
                        <div className="flex flex-col gap-y-4 text-center">
                            <Link href="/" className={router.pathname === '/' ? 'text-bright-pink ' : 'hover:text-bright-green-300'}>HOME</Link>
                            <Link href="/tutorial" className={router.pathname === '/tutorial' ? 'text-bright-pink ' : 'hover:text-bright-green-300'}>TUTORIAL</Link>
                            <Link href="/about" className={router.pathname === '/about' ? 'text-bright-pink' : 'hover:text-bright-green-300'}>ABOUT US</Link>
                            <Link href="/FAQs" className={router.pathname === '/FAQs' ? 'text-bright-pink' : 'hover:text-bright-green-300'}>FAQs</Link> 
                            <Link href="/resource-library" className={router.pathname === '/resource-library' ? 'text-bright-pink' : 'hover:text-bright-green-300'}>RESOURCE LIBRARY</Link>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default Header;
