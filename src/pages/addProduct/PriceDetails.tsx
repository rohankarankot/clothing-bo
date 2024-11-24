/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";

type PriceDetailsProps = {
  register: any;
  errors: Record<string, any>;
  setValue: any;
  watch: any;
};

const PriceDetails: React.FC<PriceDetailsProps> = ({
  register,
  errors,
  setValue,
  watch,
}) => {
  const regularPrice = watch("price.regularPrice");
  const discountPercent = watch("price.percent");

  useEffect(() => {
    if (regularPrice > 0 && discountPercent >= 0) {
      const discountedPrice =
        regularPrice - (regularPrice * discountPercent) / 100;
      setValue("price.discountedPrice", discountedPrice);
    }
  }, [regularPrice, discountPercent, setValue]);

  return (
    <div className="mb-4 flex space-x-4">
      <div className="flex-1">
        <label className="block">Regular Price</label>
        <input
          type="number"
          {...register("price.regularPrice", {
            required: "Regular price is required",
          })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
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
        {errors.price?.percent && (
          <p className="text-red-500 text-sm">{errors.price.percent.message}</p>
        )}
      </div>
    </div>
  );
};

export default PriceDetails;
