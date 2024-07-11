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
      type={type}
      name={name}
      variant={variant}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

export default InputField;
