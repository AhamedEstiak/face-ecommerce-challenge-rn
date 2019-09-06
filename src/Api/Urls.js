const baseUrl = `https://sleepy-fortress-78287.herokuapp.com`;

export const productList = `/api/products`;
export const productsPath = (page, limit, sort) => baseUrl + `/api/products?_page=${page}&_limit=${limit}&_sort=${sort}`;
// export const sortByProducts = (sort) => baseUrl + `/api/products?_sort=${sort}`;



