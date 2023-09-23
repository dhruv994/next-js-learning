import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';



export default function PaginatiationBar({ page, pageCount, href }) {
    console.log("Page and Page cpunt", page, pageCount);

    return (
        <div className="flex gap-2 pb-3">
            <PaginatationLink href={`${href}?page=${page - 1}`} enabled={page > 1}><ChevronLeftIcon className='h-5 w-5' /></PaginatationLink>
            <span>Page {page} of {pageCount}</span>
            <PaginatationLink href={`${href}?page=${page + 1}`} enabled={page < pageCount}><ChevronRightIcon className='h-5 w-5' /></PaginatationLink>
        </div>)
}

function PaginatationLink({ children, enabled, href }) {
    if (!enabled) {
        return (
            <span
                className="border cursor-not-allowed rounded text-slate-300 text-sm">
                {children}
            </span>
        );
    }
    return (
        <Link href={href} className="border rounded text-slate-500 text-sm hover:bg-orange-100  hover:text-slate-700">{children}</Link>
    );

}

