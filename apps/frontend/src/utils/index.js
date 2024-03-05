import axios from 'axios';

export async function fetchData({ filters = {} }) {
  const { minPrice, maxPrice, city, district, search } = filters;
  const queryParams = {};

  if (minPrice !== undefined && minPrice !== '')
    queryParams.minPrice = minPrice;
  if (maxPrice !== undefined && maxPrice !== '')
    queryParams.maxPrice = maxPrice;
  if (city !== undefined && city !== '') queryParams.city = city;
  if (district !== undefined && district !== '')
    queryParams.district = district;
  if (search !== undefined && search !== '') queryParams.search = search;

  try {
    const response = await axios.get(`/api/ads`, {
      params: { ...queryParams },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function fetchDetails(id) {
  try {
    const response = await axios.get(`/api/ads/${id}`);

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
