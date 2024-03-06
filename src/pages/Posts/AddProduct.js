import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../../Fields/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const AddProduct = ({ onSubmit }) => {
  const onSubmitHandler = (data) => {
    onSubmit(data);
  };
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("description is required"),
    price: yup
      .number()
      .positive("Price must be a positive number")
      .required("Price is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <InputField
          label="Name"
          name="name"
          type="text"
          register={register}
          error={errors?.name}
        />
        <InputField
          label="description"
          name="description"
          type="text"
          register={register}
          error={errors?.description}
        />
        <InputField
          label="price"
          name="price"
            type="number"
          register={register}
          error={errors?.price}
        />
        <button type="submit">Add Product</button>
      </form>
    </>
  );
};
