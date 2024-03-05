import React from "react";
const InputField = ({
  label,
  name,
  type,
  error,
  errors,
  register,
}) => {
  return (
    <div>
      <label>{label}</label>
      <input type={type} {...register(name)} />
      {error && <span>{error.message}</span>}
    </div>
  );
};

export default InputField;
