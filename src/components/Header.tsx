import Link from 'next/link';

import { libreBaskerville } from '@/utils/fonts';

const Header = () => {
    return (
        <div className={`mt-10 text-5xl text-white ${libreBaskerville.className}`}>
            <div className="flex flex-row justify-around">
                <div>
                    <Link href="/">HOME</Link>
                </div>
                <div>
                    <Link href="/tutorial">TUTORIAL</Link>
                </div>
                <div>
                    <Link href="/about">ABOUT US</Link>
                </div>
                <div>
                    <Link href="/more">MORE</Link>
                </div>
            </div>
        </div>
    )
}

export default Header;