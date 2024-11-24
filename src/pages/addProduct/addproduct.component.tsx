/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProductDetails from "./ProductDetails";
import PriceDetails from "./PriceDetails";
import ConfigurableOptions from "./ConfigurableOptions";
import SubmitButton from "./SubmitButton";

const AddProductComponent: React.FC = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      price: { regularPrice: 0, discountedPrice: 0, percent: 0 },
      productAttributes: [{  }],
      isConfigurable: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "productAttributes",
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Add Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ProductDetails register={register} errors={errors} />
        <Accordion type="single" collapsible>
          <AccordionItem value="price">
            <AccordionTrigger>Price</AccordionTrigger>
            <AccordionContent>
              <PriceDetails
                register={register}
                errors={errors}
                setValue={setValue}
                watch={watch}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <ConfigurableOptions
          register={register}
          fields={fields}
          append={append}
          remove={remove}
        />
        <SubmitButton />
      </form>
    </div>
  );
};

export default AddProductComponent;
