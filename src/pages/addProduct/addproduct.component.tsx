/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";

import ProductDetails from "./ProductDetails";
import PriceDetails from "./PriceDetails";
import ConfigurableOptions from "./ConfigurableOptions";
import SubmitButton from "./SubmitButton";

const AddProductComponent: React.FC = () => {
  const methods = useForm({
    defaultValues: {
      name: "",
      slug: "",
      sku: "",
      vendorName: "",
      stockqty: 0,
      newArrived: false,
      price: { regularPrice: 0, discountedPrice: 0, percent: 0 },
      productAttributes: [{}],
    },
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <FormProvider {...methods}>
      <div className="max-w-4xl mx-auto shadow-md rounded-lg p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <ProductDetails />
          <hr className="py-4" />
          <PriceDetails />
          <hr className="py-4" />

          <ConfigurableOptions />
          <SubmitButton />
        </form>
      </div>
    </FormProvider>
  );
};

export default AddProductComponent;
