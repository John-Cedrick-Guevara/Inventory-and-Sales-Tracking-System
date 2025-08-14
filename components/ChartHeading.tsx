import React from "react";

const ChartHeading = ({ children }: { children: string }) => {
  return (
    <h3 className="text-xl w-fit font-bold text-gray-500 py-2 px-3 rounded-2xl bg-blue-100 mr-auto self-center">
      {children}
    </h3>
  );
};

export default ChartHeading;
