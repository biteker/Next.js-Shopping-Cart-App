import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Product } from "@/types";
import { getCategoyProducts, getCategories } from "@/products-service";
import { ProductList } from "@/components/ProductList";
import { Box, Typography } from "@mui/material";
import ProductsCategories from "@/components/ProductsCategories";

const CategoryProducts = () => {
  const router = useRouter();
  const { categoryName } = router.query;
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState('');
  const [allCategories, setAllCategories] = useState<{ id: string; description: string }[]>([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (categoryName) {
        const products: Product[] = await getCategoyProducts(
          categoryName as string
        );
        const allCategories1 = await getCategories();
        //const allCategories1: { id: string; description: string }[] = (await getCategories()).map(category => ({ id: category.id, description: category.description }));
        const foundCategory = (allCategories1).find(category => category.id === categoryName)?.description ?? '';
        setCategories(foundCategory);
        setProducts(products);
        setAllCategories(allCategories1);
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
      <ProductsCategories categories={allCategories} />
      <ProductList products={products} />
    </Box>
  );
};

export default CategoryProducts;
