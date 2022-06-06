import React from "react";

const Input = ({ type, required, value, placeholder }) => {
  return (
    <>
      {required ? (
        <div>
          <label htmlFor=""></label>
          <input type={type} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Input;
