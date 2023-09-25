import 'server-only';
import { marked } from 'marked';

import qs from 'qs';

const CMS_URL = 'http://localhost:1337';
export const CACHE_TAG_REVIEWS = 'reviews';

export async function getReview(slug) {
    const { data } = await fetchReview({
        filters: { slug: { $eq: slug } },
        fields: ['slug', 'title', 'subtitle', 'image', 'date', 'body', 'publishedAt'],
        populate: { image: { fields: ['url'] } },
        pagination: { pageSize: 1, withCount: false },

    });
    if (data.length === 0) {
        return null;
    }
    const item = data[0];
    // console.log("ITEM RESPONSE", item);
    return {
        ...toReview(item),
        body: marked(item.attributes.body)
    }

}

export async function getReviews(pageSize, page) {
    const { data, meta } = await fetchReviews({
        fields: ['slug', 'title', 'subtitle', 'publishedAt'],
        populate: { image: { fields: ['url'] } },
        sort: ['pulishedAt:desc'],
        pagination: { pageSize, page }
    })
    // console.log(data.map(toReview))
    return {
        pageCount: meta.pagination.pageCount,
        reviews: data.map(toReview)
    }
}

export async function getSlugs() {
    const { data } = await fetchReviews({
        fields: ['slug'],
        sort: ['pulishedAt:desc'],
        pagination: { pageSize: 100 }
    });
    return data.map((item) => item.attributes.slug);

}

export async function searchReviews(query) {
    const { data } = await fetchReviews({
        filters: { title: { $containsi: query } },
        fields: ['slug', 'title'],
        sort: ['title'],
        pagination: { pageSize: 5 }
    });
    return data.map((item) => ({
        slug: item.attributes.slug,
        title: item.attributes.title
    }));

}


async function fetchReviews(parameters) {
    const url = `${CMS_URL}/api/reviews?`
        + qs.stringify(parameters, { encodeValuesOnly: true });
    // console.log("fetchReviews : ", url);
    const response = await fetch(url, {
        next: {
            tags: [CACHE_TAG_REVIEWS],
        }
    });
    return await response.json();
}

async function fetchReview(parameters) {
    const url = `${CMS_URL}/api/reviews?`
        + qs.stringify(parameters, { encodeValuesOnly: true });
    // console.log("getReviewsURL : ", url);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`CMS returned ${response.status} for ${url}`);
    }
    return await response.json();
}

function toReview(item) {
    return {
        slug: item.attributes.slug,
        title: item.attributes.title,
        subtitle: item.attributes.subtitle,
        date: item.attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
        image: CMS_URL + item.attributes.image.data.attributes.url
    }
}