import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

interface MessageBoxProps {
  variant:
    | "shadow"
    | "bordered"
    | "flat"
    | "faded"
    | "solid"
    | "light"
    | undefined;
  color: "bg-slate-200 text-black" | "bg-blue-500 text-white" | undefined;
  text: string;
}

const MessageBox: React.FC<MessageBoxProps> = ({ variant, color, text }) => {
  const DropdownContent: React.FC<MessageBoxProps> = ({
    variant,
    color,
    text,
  }) => (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <div className={`p-2 rounded max-w-96 ${color}`}>
            <p>{text}</p>
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dropdown Variants" variant={variant}>
          <DropdownItem key="New">Reply</DropdownItem>
          <DropdownItem key="Copy">Copy</DropdownItem>
          <DropdownItem key="Edit">Edit</DropdownItem>
          <DropdownItem key="Delete" className="text-danger" color="danger">
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );

  return (
    <div className="flex flex-wrap gap-2">
      <DropdownContent color={color} text={text} variant={variant} />
    </div>
  );
};

export default MessageBox;
