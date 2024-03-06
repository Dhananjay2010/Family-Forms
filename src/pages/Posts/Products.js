import React, { useState } from "react";
import { useQuery, useMutation, queryClient } from "react-query";
import axios from "axios";
import { ProductListing } from "./ProductListing";
import { AddProduct } from "./AddProduct";
const GET_API_ENDPOINT = "https://dummyjson.com/products";
const POST_API_ENDPOINT = "https://dummyjson.com/products/add";

export const Product = () => {
  // Have to use state since the add product was not saving the product in server
  const [productData, setProductData] = useState([]);
  console.log(productData);
  const retrievePosts = async () => {
    const response = await axios.get(GET_API_ENDPOINT);
    setProductData(response?.data?.products);
    return response.data;
  };
  const postProduct = async (newProductData) => {
    const response = await axios.post(POST_API_ENDPOINT, newProductData);
    return response.data;
  };
  const { data, isLoading, isError } = useQuery("products", retrievePosts);

  const addProductMutation = useMutation(postProduct, {
    onSuccess: (data, variables, context) => {
      // queryClient.invalidateQueries("products");
      return data;
    },
  });

  const handleAddProduct = async (newProductData) => {
    const payload = {
      ...newProductData,
      title: newProductData?.name,
    };
    console.log(payload);
    try {
      const resp = await addProductMutation.mutateAsync(payload);
      setProductData([...productData, { ...resp }]);
      console.log(resp);
    } catch (error) {
      console.error("Error adding product:", error.message);
    }
  };

  console.log(productData);
  return (
    <>
      <ProductListing
        productData={productData}
        isLoading={isLoading}
        isError={isError}
      />
      <AddProduct onSubmit={handleAddProduct} />
    </>
  );
};
