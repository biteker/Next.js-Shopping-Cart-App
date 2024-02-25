import axios from "axios";

//const API_URL = "https://fakestoreapi.com";
const API_URL = "https://timetoeat.herokuapp.com/api";

// Getting all products from fake store API
export const getProducts = async (page = 1, size = 15) => {
  //const { data } = await axios.get(`${API_URL}/products`);
  const { data } = await axios.get(`${API_URL}/product?page=${page}&size=${size}`);
  return data.content;
};

// Getting all categories from fake store API
export const getCategories = async () => {
  //const { data } = await axios.get(`${API_URL}/products/categories`);
  const data = [
    { id: "0", description: "Ana yemek" },
    { id: "1", description: "İçecekler" },
    { id: "2", description: "Tatlılar" }, // Örnek bir açıklama
    { id: "3", description: "Atıştırmalıklar" }, // Örnek bir açıklama
  ];
  return data;
};

// Getting all produts in a specfic category from fake store API
export const getCategoyProducts = async (categoryName: string) => {
  //const { data } = await axios.get(
  //  `${API_URL}/products/category/${categoryName}`
  //);
  const { data } = await axios.get(
    `${API_URL}/category/${categoryName}`
  );
  return data.page.content;
};

// Getting specific product by id
export const getProduct = async (id: number | string) => {
  //const { data } = await axios.get(`${API_URL}/products/${id}`);
  const { data } = await axios.get(`${API_URL}/product/${id}`);
  return data;
};
