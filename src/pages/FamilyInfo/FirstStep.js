import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../../Fields/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const FirstStep = ({ onSubmit }) => {
  const onSubmitHandler = (data) => {
    onSubmit(data);
  };
  const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    parentNames: yup.string().required("Parent names are required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    address: yup.string().required("Address is required"),
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
          label="firstName"
          name="firstName"
          type="text"
          register={register}
          error={errors?.firstName}
          errorMessage="First name is required"
        />
        <InputField
          label={"lastName"}
          type={"text"}
          name="lastName"
          register={register}
          error={errors.lastName}
          errorMessage={"Last Name is required"}
        ></InputField>
        <InputField
          label="Parent Names"
          name="parentNames"
          type="text"
          register={register}
          error={errors.parentNames}
          errorMessage="Parent names are required"
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          register={register}
          error={errors.email}
          errorMessage="Email is required"
        />
        <InputField
          label="Address"
          name="address"
          type="text"
          register={register}
          error={errors.address}
          errorMessage="Address is required"
        />
        <button type="submit">Next</button>
      </form>
    </>
  );
};
