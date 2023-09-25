'use client';

import { Combobox } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDebounce } from 'use-debounce';



export default function SearchBox() {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [query, setQuery] = useState('');
    const [reviews, setReviews] = useState([]);
    const [debounceQuery] = useDebounce(query, 300);

    useEffect(() => setIsClient(true), []);
    useEffect(() => {
        if (debounceQuery.length > 1) {
            const controller = new AbortController();
            (async () => {
                const url = '/api/search?query=' + encodeURIComponent(debounceQuery);
                const response = await fetch(url, { signal: controller.signal });
                const reviews = await response.json();
                setReviews(reviews)
            })();
            return () => controller.abort();
        } else {
            setReviews([]);
        }
    }, [debounceQuery]);


    //below method is used to navigate to a selected option from a select/combo box
    const handleChange = (review) => {
        router.push(`/reviews/${review.slug}`)
    }

    if (!isClient) return null;

    const filtered = reviews.filter((review) => review.title.toLowerCase().includes(query.toLowerCase())).slice(0, 5);


    return (
        <div className='relative w-48'>
            <Combobox onChange={handleChange}>
                < Combobox.Input placeholder="Search..."
                    className="border px-2 py-1 rounded w-full"
                    value={query} onChange={(event) => setQuery(event.target.value)} />
                <Combobox.Options className='absolute bg-white py-1 w-full'>
                    {filtered.map((review) => (
                        <Combobox.Option key={review.slug} value={review}>
                            {(({ active }) => (

                                <span className={`block px-2 truncate w-full ${active ? 'bg-orange-100' : ''}`}>{review.title}
                                </span>
                            ))}
                        </Combobox.Option>
                    ))}
                </Combobox.Options>
            </Combobox>
        </div>

        // <div className="relative w-48">
        //     <Combobox>
        //         <Combobox.Input placeholder="Search…"
        //             className="border px-2 py-1 rounded w-full"
        //         />
        //         <Combobox.Options className="absolute bg-white py-1 w-full">
        //             {reviews.map((review) => (
        //                 <Combobox.Option key={review.slug}>
        //                     {({ active }) => (
        //                         <span className={`block px-2 truncate w-full ${active ? 'bg-orange-100' : ''
        //                             }`}>
        //                             {review.title}
        //                         </span>
        //                     )}
        //                 </Combobox.Option>
        //             ))}
        //         </Combobox.Options>
        //     </Combobox>
        // </div>
    )

}