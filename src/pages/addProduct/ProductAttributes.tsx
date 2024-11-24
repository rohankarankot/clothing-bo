/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button } from "@/components/ui/button";
import {  UseFormRegister } from "react-hook-form";

type ProductAttributesProps = {
  register: UseFormRegister<any>;
  fields: any[];
  remove: (index: number) => void;
  append: (value: any) => void;
};

const ProductAttributes: React.FC<ProductAttributesProps> = ({
  register,
  fields,
  remove,
  append,
}) => {
  return (
    <div className="mb-4">
      <label className="block">Product Attributes</label>
      {fields.map((field, index) => (
        <div key={field.id} className="flex space-x-4 mb-2">
          <input
            type="text"
            {...register(`productAttributes.${index}.attributeName`)}
            placeholder="Attribute Name"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="text"
            {...register(`productAttributes.${index}.value`)}
            placeholder="Value"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <Button
            type="button"
            onClick={() => remove(index)}
            className="text-red-500"
          >
            Remove
          </Button>
        </div>
      ))}
      <Button
        type="button"
        onClick={() => append({ attributeName: "", value: "" })}
        className="mt-2"
      >
        Add Attribute
      </Button>
    </div>
  );
};

export default ProductAttributes;
