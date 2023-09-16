import Heading from "../../../components/Heading";
import ShareLinkBUtton from "../../../components/SharLinkButton";
import { getReview, getSlugs } from "../../../lib/reviews";

// export async function  generateStaticParams() {
//     const slugs = await getSlugs();
//     return slugs.map((slug) => { slug });
// }

export async function generateMetadata({ params: { slug } }) {
    const review = await getReview(slug);
    return {
        title: review.title
    };

}

export default async function ReviewPage({ params: { slug } }) {
    const reviews = await getReview(slug);
    return (
        <>
            <Heading> {reviews.title}</Heading>
            <div className="flex gap-3 items-baseline">
                <p className="italic pb-2">{reviews.date}</p>
                <ShareLinkBUtton />
            </div>
            <img src={reviews.image} alt=""
                width="640" height="360" className="mb-2 rounded"
            />
            <article dangerouslySetInnerHTML={{ __html: reviews.body }}
                className="max-w-screen-sm prose prose-slate"
            />
        </>
    )
}