import React from "react";
import { UseFormRegister, FieldValues, FieldError } from "react-hook-form";

type FieldProps = {
  register: UseFormRegister<FieldValues>;
  errors: Record<string, FieldError | undefined>;
};

type MappedFieldsProps = {
  formFields: {
    label: string;
    name: string;
    type: string;
    required: boolean;
  }[];
} & FieldProps;

const MappedFields: React.FC<MappedFieldsProps> = ({
  formFields,
  register,
  errors,
}) => {
  return (
    <>
      {formFields.map((field, index) => (
        <div key={index} className="mb-4">
          <label className="block">{field.label}</label>
          <input
            type={field.type}
            {...register(field.name, {
              required: field.required ? `${field.label} is required` : false,
            })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {errors[field.name] && (
            <p className="text-red-500 text-sm">
              {errors[field.name]?.message}
            </p>
          )}
        </div>
      ))}
    </>
  );
};

export default MappedFields;
