"use client";
import React from "react";

const FormError = ({
  error,
  setError,
}: {
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) => {
  setTimeout(() => {
    setError("");
  }, 5000);

  return (
    <div
      className={`bg-red-700 text-white py-2 px-4 rounded-2xl w-full max-w-sm text-center  ${
        error ? "block" : "hidden"
      }`}
    >
      {error}
    </div>
  );
};

export default FormError;
