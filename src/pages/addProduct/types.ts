// Represents a single color within the product attribute
export type Color = {
  color?: string;
  hex: string;
  quantity: number;
  discountedPrice: number;
  images?: File[]; // Array of uploaded files
};

// Represents the options of a product attribute
export type AttributeOptions = {
  colors?: Color[]; // Array of color objects
  control?:any
  name?:any
};

// Represents a single product attribute
export type ProductAttribute = {
  size: string; // The size of the product (e.g., "S", "M", "L")
  options: AttributeOptions; // Options associated with the attribute
  control:any
  name:any
};

// Form values managed by react-hook-form
export type FormValues = {
  productAttributes: ProductAttribute[]; // Array of product attributes
};

// Parameters for the handleImageChange function
export type HandleImageChangeParams = {
  index: number; // Index of the product attribute
  colorIndex: number; // Index of the color within the attribute
  files: FileList | null; // Uploaded files
};

// State type for the active accordion index
export type ActiveIndexState = number | null;

// Represents a single field in react-hook-form's useFieldArray
export type FieldArrayField = {
  id: string; // Unique identifier for the field
} & ProductAttribute;

// Represents an array of image preview URLs
export type ImagePreview = string[];
