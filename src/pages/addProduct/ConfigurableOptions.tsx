import React from "react";
import { UseFormRegister } from "react-hook-form";
import { Button } from "@/components/ui/button";

type ConfigurableOptionsProps = {
  register: UseFormRegister<any>;
  fields: any[];
  append: any;
  remove: any;
};

const ConfigurableOptions: React.FC<ConfigurableOptionsProps> = ({
  register,
  fields,
  append,
  remove,
}) => {
  return (
    <div className="mb-4">
      <label className="block">Product Attributes</label>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex flex-wrap space-y-4 mb-2 border border-cyan-300 p-4"
        >
          {/* Featured Checkbox */}
          <div className="w-1/6 flex items-center">
            <input
              type="checkbox"
              {...register(`productAttributes.${index}.featured`)}
              className="form-checkbox text-blue-600"
            />
            <span className="ml-2">Featured</span>
          </div>

          <div className="flex flex-wrap space-x-4">
            {/* Color Name Input */}
            <div className="w-[20%]">
              <input
                type="text"
                {...register(`productAttributes.${index}.colorName`)}
                placeholder="color"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Custom Color Picker (with square or circle shape) */}
            <div className="w-[20%]">
              <input
                type="color"
                {...register(`productAttributes.${index}.colorHex`)}
                className="w-full h-10 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none"
                style={{
                  width: "100%",
                  height: "40px",
                  borderRadius: "8px", // Change to "50%" for a circle
                }}
              />
            </div>

            {/* Size */}
            <div className="w-[20%]">
              <input
                type="text"
                {...register(`productAttributes.${index}.size`)}
                placeholder="e.g., S, M, L, XL"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Quantity */}
            <div className="w-[20%]">
              <input
                type="number"
                {...register(`productAttributes.${index}.quantity`)}
                placeholder="Quantity"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Discounted Price */}
            <div className="w-[20%]">
              <input
                type="number"
                {...register(`productAttributes.${index}.discountedPrice`)}
                placeholder="Discounted Price"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <Button
            type="button"
            onClick={() => remove(index)}
            className="text-red-500 mt-2"
          >
            Remove
          </Button>
        </div>
      ))}
      <Button
        type="button"
        onClick={() =>
          append({
            featured: false,
            colorName: "",
            colorHex: "#000000",
            size: "",
            quantity: 0,
            discountedPrice: 0,
          })
        }
        className="mt-2"
      >
        Add Attribute
      </Button>
    </div>
  );
};

export default ConfigurableOptions;
