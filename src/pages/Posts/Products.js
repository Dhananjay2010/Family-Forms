import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { ProductListing } from "./ProductListing";
import { AddProduct } from "./AddProduct";
const GET_API_ENDPOINT = "https://dummyjson.com/products";
const POST_API_ENDPOINT = "https://dummyjson.com/products/add";

export const Product = () => {
  // Have to use state since the add product was not saving the product in server
  const [productData, setProductData] = useState([]);
  const retrievePosts = async () => {
    const response = await axios.get(GET_API_ENDPOINT);
    setProductData(response?.data?.products);
    return response.data;
  };
  const postProduct = async (newProductData) => {
    const response = await axios.post(POST_API_ENDPOINT, newProductData);
    return response.data;
  };
  const { isLoading, isError } = useQuery("products", retrievePosts);

  const addProductMutation = useMutation(postProduct, {
    onSuccess: (data) => {
      return data;
    },
  });

  const handleAddProduct = async (newProductData) => {
    const payload = {
      ...newProductData,
      title: newProductData?.name,
    };
    try {
      const resp = await addProductMutation.mutateAsync(payload);
      setProductData([{ ...resp }, ...productData]);
    } catch (error) {
      console.error("Error adding product:", error.message);
    }
  };

  return (
    <>
      <AddProduct onSubmit={handleAddProduct} />
      <ProductListing
        productData={productData}
        isLoading={isLoading}
        isError={isError}
      />
    </>
  );
};
