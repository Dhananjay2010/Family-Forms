import React from "react";
import "../App.css";
const InputField = ({ label, name, type, error, errors, register }) => {
  return (
    <div className="input-cont">
      <label>{label}</label>
      <input type={type} {...register(name)} />
      {error && <span className="error">{error.message}</span>}
    </div>
  );
};

export default InputField;
