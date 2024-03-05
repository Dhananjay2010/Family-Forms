import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import InputField from "../../Fields/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const SecondStep = ({ onSubmit }) => {
  const familyMemberSchema = yup.object().shape({
    test: yup.array().of(
      yup.object().shape({
        firstName: yup.string().required("Name is required"),
        lastName: yup.string().required("Last name is required"),
        address: yup.string().required("Address is required"),
        // Add more properties for family members
      })
    ),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      test: [{ firstName: "", lastName: "", address: "" }],
    },
    resolver: yupResolver(familyMemberSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  });

  const onSubmitHandler = (data) => {
    onSubmit(data?.test);
  };

  const handleDelete = (index) => {
    if (fields.length === 1) return;
    remove(index);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <h1>Used Field Array </h1>
        <p>Add Family Members</p>
        <ul>
          {fields.map((item, index) => {
            return (
              <li key={item.id}>
                <InputField
                  label="firstName"
                  name={`test.${index}.firstName`}
                  type="text"
                  register={register}
                  error={errors?.test && errors.test[index]?.firstName}
                />
                <InputField
                  label={"lastName"}
                  type={"text"}
                  name={`test.${index}.lastName`}
                  register={register}
                  error={errors?.test && errors.test[index]?.lastName}
                ></InputField>
                <InputField
                  label="Address"
                  name={`test.${index}.address`}
                  type="text"
                  register={register}
                  error={errors?.test && errors.test[index]?.address}
                />
                <button type="button" onClick={() => handleDelete(index)}>
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
        <section>
          <button
            type="button"
            onClick={() => {
              append({ firstName: "", lastName: "", address: "" });
            }}
          >
            Add More Family People
          </button>
        </section>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};
