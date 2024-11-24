import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { MdClose } from "react-icons/md";

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
  const [imagePreviews, setImagePreviews] = useState<Record<number, string[]>>(
    {}
  );
  console.log("imagePreviews: ", imagePreviews);

  const handleImageChange = (index: number, files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const newPreviews = fileArray.map((file) => {
      const reader = new FileReader();
      return new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });
    console.log("newPreviews: ", newPreviews);
    Promise.all(newPreviews).then((previewUrls) => {
      setImagePreviews((prev) => ({
        ...prev,
        [index]: previewUrls,
      }));
    });
  };

  return (
    <div className="mb-4">
      <label className="block">Product Attributes</label>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="space-y-4 mb-2 border border-cyan-300 p-4"
        >
          {/* Featured Checkbox */}
          <div className="w-full flex items-center justify-between">
            <div>
              <input
                type="checkbox"
                {...register(`productAttributes.${index}.featured`)}
                className="form-checkbox text-blue-600"
              />
              <span className="ml-2">Featured</span>
            </div>

            <Button
              type="button"
              variant="destructive"
              onClick={() => remove(index)}
            >
              <MdClose />
            </Button>
          </div>

          <div className="flex flex-wrap space-x-4 gap-2">
            {/* Color Name Input */}
            <div className="w-[10%]">
              <input
                type="text"
                {...register(`productAttributes.${index}.colorName`)}
                placeholder="color"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Custom Color Picker */}
            <div className="w-[10%]">
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

            {/* Size Dropdown */}
            <div className="w-[20%]">
              <select
                {...register(`productAttributes.${index}.size`)}
                className="w-full p-2 border text-black  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option
                  value="Select Size"
                  className="text-black dark:text-gray-800"
                >
                  Select Size
                </option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="2XL">2XL</option>
                <option value="3XL">3XL</option>
              </select>
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

          {/* Image Picker */}
          <div className="mt-4">
            <label className="block mb-2">Upload Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleImageChange(index, e.target.files)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            {/* Image Previews */}
            <div className="flex flex-wrap mt-2">
              {imagePreviews[index]?.map((src, i) => (
                <div key={i} className="mr-2 mb-2">
                  <img
                    src={src}
                    alt={`Preview ${i}`}
                    className="w-[100px] h-[100px] border border-gray-300 rounded-md object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      <Button
        type="button"
        onClick={() =>
          append({
            featured: false,
            colorName: "",
            hex: "#000000",
            size: "",
            quantity: 0,
            discountedPrice: 0,
            images: imagePreviews,
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
