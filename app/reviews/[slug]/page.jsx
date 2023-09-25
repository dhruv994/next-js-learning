import Image from 'next/image';
import { notFound } from 'next/navigation';
import Heading from "../../../components/Heading";
import ShareLinkBUtton from "../../../components/SharLinkButton";
import { getReview, getSlugs } from "../../../lib/reviews";


export async function generateStaticParams() {
    const slugs = await getSlugs();
    return slugs.map((slug) => ({slug}));
}


export async function generateMetadata({ params: { slug } }) {
    const review = await getReview(slug);
    if (!review) {
        notFound();
    }
    return {
        title: review.title
    };

}

export default async function ReviewPage({ params: { slug } }) {
    const reviews = await getReview(slug);
    // console.log('@@@@@@@ reviews',reviews);
    if (!reviews) {
        notFound();
    }
    return (
        <>
            <Heading> {reviews.title}</Heading>
            <p className='font-semibold pb-3'>{reviews.subtitle} </p>
            <div className="flex gap-3 items-baseline">
                <p className="italic pb-2">{reviews.date}</p>
                <ShareLinkBUtton />
            </div>
            <Image src={reviews.image} alt="" priority
                width="640" height="360" className="mb-2 rounded"
            />
            <article dangerouslySetInnerHTML={{ __html: reviews.body }}
                className="max-w-screen-sm prose prose-slate"
            />
        </>
    )
}