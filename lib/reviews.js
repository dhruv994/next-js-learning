
import { readdir, readFile } from 'node:fs/promises'
import { marked } from 'marked';
import matter from "gray-matter";
import qs from 'qs';

const CMS_URL = 'http://localhost:1337';

export async function getReview(slug) {
    const { data } = await fetchReview({
        filters: { slug: { $eq: slug } },
        fields: ['slug', 'title', 'image', 'date', 'body', 'publishedAt'],
        populate: { image: { fields: ['url'] } },
        pagination: { pageSize: 1, withCount: false },

    });
    const item = data[0];
    console.log("ITEM RESPONSE", item);
    return {
        slug: item.attributes.slug,
        title: item.attributes.title,
        date: item.attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
        image: CMS_URL + item.attributes.image.data.attributes.url,
        body: marked(item.attributes.body)
    }

}

export async function getReviews() {
    const { data } = await fetchReviews({
        fields: ['slug', 'title', 'subtitle', 'publishedAt'],
        populate: { image: { fields: ['url'] } },
        sort: ['pulishedAt:desc'],
        pagination: { pageSize: 6 }
    })
    //console.log(data.map((item) => ({ slug: item.attributes.slug, title: item.attributes.title, image: CMS_URL + item.attributes.image.data.attributes.url })));
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





async function fetchReviews(parameters) {
    const url = `${CMS_URL}/api/reviews?`
        + qs.stringify(parameters, { encodeValuesOnly: true });
    console.log("fetchReviews : ", url);
    const response = await fetch(url);
    return await response.json();
}

async function fetchReview(parameters) {
    const url = `${CMS_URL}/api/reviews?`
        + qs.stringify(parameters, { encodeValuesOnly: true });
    console.log("getReviewsURL : ", url);
    const response = await fetch(url);
    return await response.json();
}