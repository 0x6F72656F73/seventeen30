import Link from 'next/link';

import { libreBaskerville } from '@/utils/fonts';

const Header = () => {
    return (
        <div className={` mt-10 text-4xl text-white ${libreBaskerville.className}`}>
            <div className="flex flex-row justify-around">
                <div>
                    <Link href="/">Home</Link>
                </div>
                <div>
                    <Link href="/index">Index</Link>
                </div>
                <div>
                    <Link href="/about">About Us</Link>
                </div>
                <div>
                    <Link href="/more">More</Link>
                </div>
            </div>
        </div>
    )
}

export default Header;