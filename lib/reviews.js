
import { readdir, readFile } from 'node:fs/promises'
import { marked } from 'marked';
import matter from "gray-matter";
import qs from 'qs';

const CMS_URL = 'http://localhost:1337';

export async function getReview(slug) {
    const text = await readFile(`./content/reviews/${slug}.md`, 'utf8');
    const { content, data: { title, image, date } } = matter(text);
    const body = marked(content);

    return { slug, title, image, date, body }

}

export async function getReviews() {
    // const slugs = await getSlugs();

    // const reviews = [];
    // for (const slug of slugs) {
    //     const review = await getReview(slug);
    //     reviews.push(review)
    // }
    // reviews.sort((a, b) => b.date.localeCompare(a.date))
    // return reviews;
    const url = `${CMS_URL}/api/reviews?`
        + qs.stringify({
            fields: ['slug', 'title', 'subtitle', 'publishedAt'],
            populate: { image: { fields: ['url'] } },
            sort: ['pulishedAt:desc'],
            pagination: { pageSize: 6 },

        }, { encodeValuesOnly: true });
    console.log("URL : ", url);

    const response = await fetch(url);
    const { data } = await response.json()
    console.log(data.map((item) => ({ slug: item.attributes.slug, title: item.attributes.title, image: CMS_URL + item.attributes.image.data.attributes.url })));
    return data.map((item) => ({
        slug: item.attributes.slug,
        title: item.attributes.title,
        date: item.attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
        image: CMS_URL + item.attributes.image.data.attributes.url
    }))
}

export async function getSlugs() {
    const files = await readdir('./content/reviews');
    return files.filter((file) => file.endsWith('.md')).map((file) => file.slice(0, -'.md'.length))
}
