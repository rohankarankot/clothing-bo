import { HandleImageChangeParams, ImagePreview } from "../types";

/* eslint-disable @typescript-eslint/no-unused-vars */
export const getLastAttributeValues = (getValues: any): any => {
  const productAttributes = getValues("productAttributes");
  if (productAttributes.length > 0) {
    const lastAttribute = productAttributes[productAttributes.length - 1];
    const colorsWithoutImages =
      lastAttribute.options.colors &&
      lastAttribute.options.colors.map(
        ({ images, color, hex, ...rest }: any) => rest
      );
    return {
      ...lastAttribute,
      options: {
        ...lastAttribute.options,
        colors:
          colorsWithoutImages && colorsWithoutImages.length > 0
            ? colorsWithoutImages
            : [
                {
                  color: "",
                  hex: "#000000",
                  quantity: 0,
                  discountedPrice: 0,
                  images: [],
                },
              ],
      },
    };
  }

  return {
    size: "S",
    options: {
      colors: [
        {
          color: "",
          hex: "#000000",
          quantity: 0,
          discountedPrice: 0,
          images: [],
        },
      ],
    },
  };
};

export const handleImageChange = ({
  index,
  colorIndex,
  files,
  getValues,
  setValue,
}: HandleImageChangeParams & { getValues: any; setValue: any }): void => {
  if (!files) return;
  const fileArray = Array.from(files);
  const currentImages =
    getValues(
      `productAttributes.${index}.options.colors.${colorIndex}.images`
    ) || [];
  const updatedImages = [...currentImages, ...fileArray];
  setValue(
    `productAttributes.${index}.options.colors.${colorIndex}.images`,
    updatedImages
  );
};

export const generateImagePreview = (files: File[]): ImagePreview => {
  return files.map((file) => URL.createObjectURL(file));
};

export const addColorToAttribute = (
  colors: any[],
  index: number,
  setValue: any
): void => {
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
  setValue(`productAttributes.${index}.options.colors`, newColorArray);
};

export const removeColor = (
  colors: any[],
  colorIndex: number,
  index: number,
  setValue: any
): void => {
  const updatedColors = colors.filter((_, i) => i !== colorIndex);
  setValue(`productAttributes.${index}.options.colors`, updatedColors);
};

export const removeAttribute = (index: number, remove: any): void => {
  remove(index);
};
