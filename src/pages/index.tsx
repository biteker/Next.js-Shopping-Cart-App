import Head from "next/head";
import { ProductList } from "../components/ProductList";
import { getCategories, getProducts } from "../products-service";
import { Product } from "@/types";
import { Box, Typography } from "@mui/material";
import ProductsCategories from "@/components/ProductsCategories";
import AppPagination from "@/components/Pagination";
import React from "react";
import Pagination from '@mui/material/Pagination';
import { useRouter } from "next/router";

type Props = {
  products: Product[];
  categories: { id: string; description: string }[];
};
export default function Home({ products, categories }: Props) {
  const router = useRouter();
  const page = parseInt(router.query.page as string) || 1;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.push(`/?page=${value}`);
  };
  return (
    <>
      <Head>
        <title>Time To Eat</title>
        <meta
          name="description"
          content="Discover the best deals and shop for your favorite products at our online store. With a wide range of categories and brands, our eCommerce app makes shopping easy and convenient. Get free shipping on orders over $50 and enjoy hassle-free returns. Download our app now and start shopping!"
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Box>
        <Typography
          sx={{
            textAlign: "center",
            marginBottom: 6,
          }}
          variant="h2"
        >
          Product List
        </Typography>
        <ProductsCategories categories={categories} />
        <ProductList products={products} />
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="10vh" // Bu, bileşeni dikey olarak da ortalar
      >
        <Pagination count={4} page={page} onChange={handleChange} size="large" color="secondary" />
      </Box>

    </>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.

export async function getServerSideProps(context: { query: { page: string; }; }) {
  const page = context.query.page ? parseInt(context.query.page) : 1;
  // Call an external API endpoint to get products.
  // You can use any data fetching library and can also query the database directly.
  const products: Product[] = await getProducts(page, 3);
  const categories: { id: string; description: string }[] = (await getCategories()).map(category => ({ id: category.id, description: category.description }));


  // By returning { props: { products } }, the Home component
  // will receive `products` as a prop at build time in Production
  return {
    props: {
      products,
      categories,
    },
  };
}
