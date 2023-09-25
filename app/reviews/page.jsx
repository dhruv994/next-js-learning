import Link from 'next/link';
import Image from 'next/image';
import Heading from '../../components/Heading';
import { getReviews } from '../../lib/reviews';
import PaginatiationBar from '../../components/PaginitationBar';
import SearchBox from '../../components/SearchBox';

export const metadata = {
    title: "Reviews"
}
const PAGE_SIZE = 3;

// export const dynamic = 'force-dynamic';

export default async function ReviewsPage({ searchParams }) {
    const page = parsePageParam(searchParams.page);
    const { reviews, pageCount } = await getReviews(PAGE_SIZE, page);
  
    return (
        <>
            <Heading > Reviews </Heading>
            <div className='flex justify-between pb-3'>
                <PaginatiationBar
                    page={page}
                    pageCount={pageCount}
                    href="/reviews"
                />
                <SearchBox />
            </div>
            {/* <div className="flex gap-2 pb-3">
                <Link href={`/reviews?page=${page - 1}`}>&lt;</Link>
                <span>Page {page} of {pageCount}</span>
                <Link href={`/reviews?page=${page + 1}`}>&gt;</Link>
            </div> */}
            <p>
                Here we wil use all the reviews

            </p>
            <nav>
                <ul className='flex flex-row flex-wrap gap-3'>
                    {reviews.map((review, index) => {
                        return (<li key={review.slug} className='bg-white border w-80 shadow rounded hover:shadow-xl'>
                            <Link href={`/reviews/${review.slug}`}>
                                <Image src={review.image} alt="" priority={index === 0}
                                    width="320" height="180" className="rounded-t"
                                />
                                <h2 className='py-1 text-center font-orbitron font-semibold'>{review.title}</h2> </Link>
                        </li>)
                    })}

                </ul>
            </nav>

        </>
    )
}
function parsePageParam(paramValue) {
    if (paramValue) {
        const page = parseInt(paramValue);
        if (isFinite(page) && page > 0) {
            return page;
        }
    }
    return 1;
}