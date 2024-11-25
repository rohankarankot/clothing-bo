import { useFormContext, Controller } from "react-hook-form";
import Select from "react-select";
import ReactQuill from "react-quill"; // Import ReactQuill
import "react-quill/dist/quill.snow.css"; // Import the Quill styles
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ProductDetails = () => {
  const {
    register,
    control,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext();

  const productName = watch("name");

  const generateSlug = () => {
    if (productName) {
      const slug = productName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setValue("slug", slug);
    }
  };

  // Options for the select dropdown
  const categoryOptions = [
    { value: "Top Wear", label: "Top Wear" },
    { value: "Ethnic", label: "Ethnic" },
    { value: "Bottom Wear", label: "Bottom Wear" },
    { value: "Traditional", label: "Traditional" },
    { value: "Casual", label: "Casual" },
    { value: "Oversized", label: "Oversized" },
  ];

  return (
    <>
      {/* Product Name */}
      <div className="mb-4">
        <label className="block">Product Name</label>
        <input
          type="text"
          {...register("name", { required: "Product name is required" })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {errors.name?.message && (
          <p className="text-red-500 text-sm">{String(errors.name.message)}</p>
        )}
      </div>

      {/* Slug */}
      <div className="mb-4">
        <label className="block">Slug</label>
        <input
          type="text"
          {...register("slug", { required: "Slug is required" })}
          onFocus={generateSlug}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {errors?.slug?.message && (
          <p className="text-red-500 text-sm">{String(errors.slug.message)}</p>
        )}
      </div>

      {/* SKU */}
      <div className="mb-4">
        <label className="block">SKU</label>
        <input
          type="text"
          {...register("sku", { required: "SKU is required" })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {errors.sku?.message && (
          <p className="text-red-500 text-sm">{String(errors.sku.message)}</p>
        )}
      </div>

      {/* Vendor Name */}
      <div className="mb-4">
        <label className="block">Vendor Name</label>
        <input
          type="text"
          {...register("vendorName", { required: "Vendor name is required" })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {errors.vendorName?.message && (
          <p className="text-red-500 text-sm">
            {String(errors.vendorName.message)}
          </p>
        )}
      </div>

      {/* Stock Quantity */}
      <div className="mb-4">
        <label className="block">Stock Quantity</label>
        <input
          type="number"
          {...register("stockqty", { required: "Stock quantity is required" })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {errors.stockqty?.message && (
          <p className="text-red-500 text-sm">
            {String(errors.stockqty.message)}
          </p>
        )}
      </div>

      {/* New Arrival */}
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

      {/* Category Dropdown (Multi-select using react-select and Controller) */}
      <div className="mb-4">
        <label className="block">Category</label>

        {/* Render selected categories as badges */}
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <>
              {/* Multi-select dropdown */}
              <Select
                {...field}
                isMulti
                options={categoryOptions}
                getOptionLabel={(e) => e.label}
                getOptionValue={(e) => e.value}
                className="w-full"
              />
            </>
          )}
        />

        {errors.category && (
          <p className="text-red-500 text-sm">
            {String(errors.category.message)}
          </p>
        )}
      </div>
      {/* Gender Radio Buttons */}
      <div className="mb-4">
        <label className="block">Gender</label>
        <div className="flex gap-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="Male"
              {...register("gender", { required: "Gender is required" })}
              className="form-radio text-blue-600"
            />
            <span className="ml-2">Male</span>
          </label>

          <label className="inline-flex items-center">
            <input
              type="radio"
              value="Female"
              {...register("gender", { required: "Gender is required" })}
              className="form-radio text-pink-600"
            />
            <span className="ml-2">Female</span>
          </label>

          <label className="inline-flex items-center">
            <input
              type="radio"
              value="Unisex"
              {...register("gender", { required: "Gender is required" })}
              className="form-radio text-green-600"
            />
            <span className="ml-2">Unisex</span>
          </label>
        </div>
        {errors.gender && (
          <p className="text-red-500 text-sm">
            {String(errors.gender.message)}
          </p>
        )}
      </div>

      <Accordion type="single" collapsible>
        <AccordionItem value="price">
          <AccordionTrigger>Add Product Description</AccordionTrigger>
          <AccordionContent>
            {/* Product Description (Rich Text Editor) */}
            <div className="mb-4">
              <label className="block">Product Description</label>
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <ReactQuill
                    {...field}
                    theme="snow"
                    className="w-full border border-gray-300 rounded-md"
                    placeholder="Write product description here..."
                  />
                )}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {String(errors.description.message)}
                </p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default ProductDetails;
