import Link from 'next/link';
import Image from 'next/image';
import Heading from '../../components/Heading';
import { getReviews } from '../../lib/reviews';

export const metadata = {
    title: "Reviews"
}


export default async function ReviewsPage() {
    const reviews = await getReviews();
    return (
        <>
            <Heading > Reviews </Heading>
            <p>
                Here we wil use all the reviews

            </p>
            <nav>
                <ul className='flex flex-row flex-wrap gap-3'>
                    {reviews.map((review,index) => {
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