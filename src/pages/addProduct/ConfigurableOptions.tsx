/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  Key,
  useState,
} from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { MdClose } from "react-icons/md";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"; // assuming these components exist

const ConfigurableOptions: React.FC = () => {
  const { register, control, setValue, getValues } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "productAttributes", // The field name in the form
  });

  const [activeIndex, setActiveIndex] = useState<number | null>(null); // Store the active index for Accordion

  // Function to get the last attribute values (to prepopulate the new attribute)
  const getLastAttributeValues = () => {
    const productAttributes = getValues("productAttributes");
    if (productAttributes.length > 0) {
      const lastAttribute = productAttributes[productAttributes.length - 1];

      // Map over colors and exclude the `images` field
      const colorsWithoutImages = lastAttribute.options.colors.map(
        (color: { [x: string]: any; images: any }) => {
          const { images, ...restOfColor } = color;
          return { ...restOfColor }; // Return color data without the `images` field
        }
      );

      return {
        ...lastAttribute,
        options: {
          ...lastAttribute.options,
          colors:
            colorsWithoutImages.length > 0
              ? colorsWithoutImages
              : [
                  {
                    color: "",
                    hex: "#000000",
                    quantity: 0,
                    discountedPrice: 0,
                    images: [], // Default value
                  },
                ],
        },
      };
    }

    // Default values if no attributes exist
    return {
      size: "S", // Default size
      options: {
        colors: [
          {
            color: "",
            hex: "#000000",
            quantity: 0,
            discountedPrice: 0,
            images: [], // Default value
          },
        ],
      },
    };
  };

  const handleImageChange = (
    index: number,
    colorIndex: number,
    files: FileList | null
  ) => {
    if (!files) return;

    const fileArray = Array.from(files);

    // Get current images for the specific color, or initialize with an empty array if none
    const currentImages =
      getValues(
        `productAttributes.${index}.options.colors.${colorIndex}.images`
      ) || [];

    // Update the images array for that specific color
    const updatedImages = [...currentImages, ...fileArray];

    // Set the new value for images for that color in the form
    setValue(
      `productAttributes.${index}.options.colors.${colorIndex}.images`,
      updatedImages
    );
  };

  const generateImagePreview = (files: File[]) => {
    return files.map((file) => URL.createObjectURL(file));
  };

  return (
    <div className="mb-4">
      <label className="block py-3">Product Attributes</label>

      <Accordion type="single" collapsible>
        {fields.map((field, index) => {
          const size = getValues(`productAttributes.${index}.size`);
          const colors =
            getValues(`productAttributes.${index}.options.colors`) || [];
          const imagePreviews = colors.map(
            (colorObject: { images: any }, colorIndex: any) =>
              generateImagePreview(colorObject.images || [])
          );

          return (
            <AccordionItem key={field.id} value={`attribute-${index}`}>
              <AccordionTrigger
                onClick={() =>
                  setActiveIndex(index === activeIndex ? null : index)
                }
              >
                product size: {size || "S"}{" "}
                {/* Display product size as title */}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 mb-4 border p-4 flex flex-wrap gap-4">
                  <div className="w-full flex items-center justify-between">
                    <div>
                      <label className="font-medium">Selected Size: </label>
                      <span className="ml-2 text-blue-600">{size}</span>
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => remove(index)}
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
                    {colors.map(
                      (
                        colorObject: {
                          hex: any;
                          color:
                            | string
                            | number
                            | boolean
                            | ReactElement<
                                any,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | ReactPortal
                            | null
                            | undefined;
                        },
                        colorIndex: number
                      ) => (
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
                              defaultValue={String(colorObject.color) || ""}
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
                              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() => {
                              const updatedColors = colors.filter(
                                (_: any, i: number) => i !== colorIndex
                              );
                              setValue(
                                `productAttributes.${index}.options.colors`,
                                updatedColors
                              );
                            }}
                          >
                            <MdClose />
                          </Button>

                          {/* Image input for each color */}
                          <div className="w-full">
                            <label className="font-medium">
                              Upload Images for {colorObject.color}
                            </label>
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={(e) =>
                                handleImageChange(
                                  index,
                                  colorIndex,
                                  e.target.files
                                )
                              }
                              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                          </div>

                          {/* Image Previews */}
                          {imagePreviews[colorIndex]?.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {imagePreviews[colorIndex].map(
                                (
                                  preview: string | undefined,
                                  idx: Key | null | undefined
                                ) => (
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
                                )
                              )}
                            </div>
                          )}
                        </div>
                      )
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const newColorArray = [
                          ...colors,
                          {
                            color: "",
                            hex: "#000000",
                            quantity: 0,
                            discountedPrice: 0,
                            images: [],
                          },
                        ];
                        setValue(
                          `productAttributes.${index}.options.colors`,
                          newColorArray
                        );
                      }}
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
          const lastAttribute = getLastAttributeValues();
          append(lastAttribute); // Prepopulate with the last attribute's values (excluding images)
        }}
      >
        <PlusIcon /> Add Attribute
      </Button>
    </div>
  );
};

export default ConfigurableOptions;
