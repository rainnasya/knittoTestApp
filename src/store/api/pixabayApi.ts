import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../service/axiosBaseQuery";


const PIXABAY_API_KEY = '46923788-406ed719d48c8a903ab49b961';

export const pixabayApi = createApi({
    reducerPath: "pixabayApi",
    baseQuery: axiosBaseQuery({ baseUrl: "https://pixabay.com/api/"}),
    endpoints: (builder) => ({
        getImages: builder.query({
            query: ({searchTerm, page}) => ({
                url: '',
                params: {
                    key: PIXABAY_API_KEY,
                    q: searchTerm,
                    image_type: 'photo',
                    per_page: 20,
                    page: page
                },
            }),
        }),
    }),
});

export const { useGetImagesQuery } = pixabayApi;
