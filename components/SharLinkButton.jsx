'use client';

import { LinkIcon } from '@heroicons/react/20/solid';
import { useState } from "react";


export default function ShareLinkBUtton() {
    const [clicked, setClicked] = useState(false);
    const handleClick = () => {
        navigator.clipboard.writeText(window.location.href)
        setClicked(true);
        setTimeout(() => setClicked(false), 1500)
    }
    return (
        <button className="border flex gap-1 items-centre px-2 py-1 rounded text-slate-500 text-sm hover:text-slate-700" onClick={handleClick}>
            <LinkIcon className='h-4 w-4' />
            {clicked ? 'Link Copied' : 'Share Link'}
        </button>
    )
}