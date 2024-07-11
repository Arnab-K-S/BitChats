import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

interface MessageBoxProps {
    variant: "shadow" | "bordered" | "flat" | "faded" | "solid" | "light" | undefined;
    color:"default" | "primary" | "success" | "warning" | "secondary" | "danger" | undefined;
    text: string;
}

const MessageBox: React.FC<MessageBoxProps> = ({ variant, color, text }) => {

    const DropdownContent: React.FC<MessageBoxProps> = ({ variant, color, text }) => (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    color={color}
                    variant={variant}
                    className="capitalize"
                >
                    {text}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Dropdown Variants"
                color={color}
                variant={variant}
            >
                <DropdownItem key="New">Reply</DropdownItem>
                <DropdownItem key="Copy">Copy</DropdownItem>
                <DropdownItem key="Edit">Edit</DropdownItem>
                <DropdownItem key="Delete" className="text-danger" color="danger">
                    Delete
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );

    return (
        <div className="flex flex-wrap gap-2">
            <DropdownContent variant={variant} color={color} text={text} />
        </div>
    );
}

export default MessageBox;
