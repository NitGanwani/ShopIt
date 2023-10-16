import { PRODUCTS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const productDetailApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductDetail: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductDetailQuery } = productDetailApiSlice;
