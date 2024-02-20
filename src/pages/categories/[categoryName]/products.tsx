import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Product } from "@/types";
import { getCategoyProducts, getCategories } from "@/products-service";
import { ProductList } from "@/components/ProductList";
import { Box, Typography } from "@mui/material";

const CategoryProducts = () => {
  const router = useRouter();
  const { categoryName } = router.query;
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState('');

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (categoryName) {
        const products: Product[] = await getCategoyProducts(
          categoryName as string
        );
        const foundCategory = (await getCategories()).find(category => category.id === categoryName)?.description ?? '';
        setCategories(foundCategory);
        setProducts(products);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  if (!categoryName) {
    return <Typography>Loading...</Typography>;
  }
  
  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <Box>
      <Typography variant="h4" paragraph>
       {/* {capitalizeFirstLetter(categoryName as string)} Products */}
       {capitalizeFirstLetter(categories as string)}
      </Typography>
      <ProductList products={products} />
    </Box>
  );
};

export default CategoryProducts;
