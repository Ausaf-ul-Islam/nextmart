import { groq } from "next-sanity";

const bannerQuerry = groq`*[_type == 'banner']{
  ...
}| order(_createAt asc)`;

const productsQuerry = groq`*[_type == 'product']{
  ...
}| order(_createAt asc)`;

const bestSellersQuerry = groq`*[_type == 'product' && position == 'bestSellers']{
  ...
}| order(_createAt asc)`;

export { bannerQuerry, productsQuerry, bestSellersQuerry };