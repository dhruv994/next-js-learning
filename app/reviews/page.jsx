import Link from 'next/Link'
import Heading from '../../components/Heading'
import { getReviews, getSlugs } from '../../lib/reviews';

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
                <ul className='flex flex-col flex-wrap gap-3'>
                    {reviews.map((review) => {
                        return (<li className='bg-white border w-80 shadow rounded hover:shadow-xl'>
                            <Link href={`/reviews/${review.slug}`}>
                                <img src={review.image} alt=""
                                    width="320" height="180" className="mb-2 rounded-t"
                                />
                                <h2 className='py-1 text-center font-orbitron font-semibold'>{review.title}</h2> </Link>
                        </li>)
                    })}

                </ul>
            </nav>

        </>
    )
}