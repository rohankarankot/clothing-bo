/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

type ProductDetailsProps = {
  register: any;
  errors: any;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({
  register,
  errors,
}) => {
  return (
    <>
      <div className="mb-4">
        <label className="block">Product Name</label>
        <input
          type="text"
          {...register("name", { required: "Product name is required" })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block">Slug</label>
        <input
          type="text"
          {...register("slug", { required: "Slug is required" })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {errors.slug && (
          <p className="text-red-500 text-sm">{errors.slug.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block">SKU</label>
        <input
          type="text"
          {...register("sku", { required: "SKU is required" })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {errors.sku && (
          <p className="text-red-500 text-sm">{errors.sku.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block">Vendor Name</label>
        <input
          type="text"
          {...register("vendorName", { required: "Vendor name is required" })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {errors.vendorName && (
          <p className="text-red-500 text-sm">{errors.vendorName.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block">Stock Quantity</label>
        <input
          type="number"
          {...register("stockqty", { required: "Stock quantity is required" })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {errors.stockqty && (
          <p className="text-red-500 text-sm">{errors.stockqty.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            {...register("newArrived")}
            className="form-checkbox text-blue-600"
          />
          <span className="ml-2">New Arrival</span>
        </label>
      </div>
    </>
  );
};

export default ProductDetails;
