import React, { ChangeEvent } from "react";
import { Input } from "@nextui-org/react";
type VariantType = "bordered" | "flat" | "faded" | "underlined" | undefined;
interface InputFieldProps {
  type: string;
  name: string;
  variant: VariantType;
  label: string;
  placeholder: string;
  value: string;
  required: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  name,
  variant,
  label,
  placeholder,
  value,
  required,
  onChange,
}) => (
  <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
    <Input
      label={label}
      name={name}
      placeholder={placeholder}
      required={required}
      type={type}
      value={value}
      variant={variant}
      onChange={onChange}
    />
  </div>
);

export default InputField;
