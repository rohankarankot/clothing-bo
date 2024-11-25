/* eslint-disable @typescript-eslint/no-unused-vars */
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { MdClose } from "react-icons/md";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useState } from "react";

// Import helper functions
import {
  getLastAttributeValues,
  handleImageChange,
  generateImagePreview,
  addColorToAttribute,
  removeColor,
  removeAttribute,
} from "./helpers";
import { FormValues } from "./types"; // Import types

const ConfigurableOptions: React.FC = () => {
  const { register, control, setValue, getValues } =
    useFormContext<FormValues>();
  const { fields, append, remove } = useFieldArray<any>({
    control,
    name: "productAttributes",
  });

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="mb-4">
      <label className="block py-3">Product Attributes</label>
      <Accordion type="single" collapsible>
        {fields.map((field, index) => {
          const size = getValues(`productAttributes.${index}.size`);
          const colors =
            getValues(`productAttributes.${index}.options.colors`) || [];
          const imagePreviews = colors.map((colorObject) =>
            generateImagePreview(colorObject.images || [])
          );

          return (
            <AccordionItem key={field.id} value={`attribute-${index}`}>
              <AccordionTrigger
                onClick={() =>
                  setActiveIndex(index === activeIndex ? null : index)
                }
              >
                Product Size: {size || "S"}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 mb-4 border p-4 flex flex-wrap gap-4">
                  <div className="w-full flex items-center justify-between">
                    <div>
                      <label className="font-medium">Selected Size:</label>
                      <span className="ml-2 text-blue-600">{size}</span>
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeAttribute(index, remove)}
                    >
                      <MdClose />
                    </Button>
                  </div>

                  <label className="font-medium">Select Size</label>
                  <select
                    {...register(`productAttributes.${index}.size`)}
                    className="w-[20%] rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="2XL">2XL</option>
                    <option value="3XL">3XL</option>
                  </select>

                  <div className="w-full">
                    <label className="font-medium">Colors</label>
                    {colors.map((colorObject, colorIndex) => (
                      <div
                        key={colorIndex}
                        className="flex gap-2 mb-2 flex-wrap border p-4 rounded"
                      >
                        <div className="w-20 flex flex-col">
                          <label className="font-medium">Color</label>
                          <input
                            type="color"
                            {...register(
                              `productAttributes.${index}.options.colors.${colorIndex}.hex`
                            )}
                            defaultValue={colorObject.hex || "#000000"}
                            className="w-10 h-10 p-0 border border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label className="font-medium">Color Name</label>
                          <input
                            type="text"
                            {...register(
                              `productAttributes.${index}.options.colors.${colorIndex}.color`
                            )}
                            placeholder="Color Name"
                            defaultValue={colorObject.color || ""}
                            className="p-2 border border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label className="font-medium">Quantity</label>
                          <input
                            type="number"
                            {...register(
                              `productAttributes.${index}.options.colors.${colorIndex}.quantity`
                            )}
                            placeholder="Quantity"
                            className="p-2 border border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label className="font-medium">
                            Discounted Price
                          </label>
                          <input
                            type="number"
                            {...register(
                              `productAttributes.${index}.options.colors.${colorIndex}.discountedPrice`
                            )}
                            placeholder="Discounted Price"
                            className="p-2 border border-gray-300 rounded-md"
                          />
                        </div>

                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() =>
                            removeColor(colors, colorIndex, index, setValue)
                          }
                        >
                          <MdClose />
                        </Button>

                        <div className="w-full">
                          <label className="font-medium">
                            Upload Images for {colorObject.color}
                          </label>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) =>
                              handleImageChange({
                                index,
                                colorIndex,
                                files: e.target.files,
                                getValues,
                                setValue,
                              })
                            }
                            className="p-2 border border-gray-300 rounded-md"
                          />
                        </div>

                        {imagePreviews[colorIndex]?.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {imagePreviews[colorIndex].map((preview, idx) => (
                              <div
                                key={idx}
                                className="w-20 h-20 overflow-hidden border rounded-md"
                              >
                                <img
                                  src={preview}
                                  alt={`Image Preview ${idx}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        addColorToAttribute(colors, index, setValue)
                      }
                    >
                      Add Color
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      <Button
        type="button"
        variant="secondary"
        onClick={() => {
          const lastAttribute = getLastAttributeValues(getValues);
          append(lastAttribute);
        }}
      >
        <PlusIcon /> Add Attribute
      </Button>
    </div>
  );
};

export default ConfigurableOptions;
