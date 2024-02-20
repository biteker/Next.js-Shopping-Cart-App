import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Product } from "../types";
import { useCart } from "../CartContext";
import Image from "next/image";
import { useRouter } from "next/router";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCartClick = (product: Product) => {
    addToCart(product);
  };

  return (
    <Box sx={{ cursor: "pointer" }}>
      <Box
        onClick={() => router.push(`/products/${product?.productId}/product-details`)}
      >
        <Image
          priority
          src={product?.productIcon}
          alt={product?.productName}
          width={300}
          height={300}
        />
        <Typography variant="h6">{product?.productName}</Typography>
        <Typography variant="subtitle1">{product?.categoryType}</Typography>
        <Typography variant="subtitle1">
          ${product?.productPrice?.toFixed(2)}
        </Typography>
      </Box>
      <Box mt={1}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleAddToCartClick(product)}
        >
          Add to Cart
        </Button>
      </Box>
    </Box>
  );
};

export default ProductCard;
