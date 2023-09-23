import Link from 'next/link';
import NavLink from './NavLink';

export default function NavBar() {
    return (
        <nav>
            <ul className='flex gap-2'>
                <li className='font-orbitron font-bold'>
                    <NavLink href={"/"} >Indie Game</NavLink>
                    {/* <Link className='text-orange-800 hover:underline ' href="/">Indie Game</Link> */}
                </li>
                <li className='ml-auto'>
                    <NavLink href={"/reviews"} >Review</NavLink>
                    {/* <Link className='text-orange-800 hover:underline' href="/reviews">Review</Link> */}
                </li>
                <li>
                    <NavLink href={"/about"} prefetch={false}>About</NavLink>
                    {/* <Link className='text-orange-800 hover:underline' href="/about" prefetch={false}>about</Link> */}
                </li>
            </ul>
        </nav>
    )
}