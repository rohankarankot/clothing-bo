/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const PriceDetails: React.FC = () => {
  const { register, setValue, watch } = useFormContext();
  const regularPrice = watch("price.regularPrice");
  const discountPercent = watch("price.percent");

  useEffect(() => {
    if (regularPrice > 0 && discountPercent >= 0) {
      const discountedPrice =
        regularPrice - (regularPrice * discountPercent) / 100;
      setValue("price.discountedPrice", discountedPrice); // Update the discounted price
    }
  }, [regularPrice, discountPercent, setValue]);

  return (
    <div className="mb-4 flex space-x-4">
      {/* Regular Price */}
      <div className="flex-1">
        <label className="block">Regular Price</label>
        <input
          type="number"
          {...register("price.regularPrice", {
            required: "Regular price is required",
            valueAsNumber: true,
          })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Discounted Price */}
      <div className="flex-1">
        <label className="block">Discounted Price</label>
        <input
          type="number"
          {...register("price.discountedPrice", {
            required: "Discounted price is required",
          })}
          disabled
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Discount Percent */}
      <div className="flex-1">
        <label className="block">Discount Percent</label>
        <input
          type="number"
          {...register("price.percent", {
            min: { value: 0, message: "Discount percent cannot be negative" },
            max: { value: 100, message: "Discount percent cannot exceed 100" },
          })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
    </div>
  );
};

export default PriceDetails;
