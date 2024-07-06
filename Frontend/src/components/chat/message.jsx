import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

export default function MessageBox(props) {
    const { variant, color ,text } = props
    const DropdownContent = ({ variant, color ,text}) => (
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
                <DropdownItem key="New">Reply </DropdownItem>
                <DropdownItem key="Copy">Copy </DropdownItem>
                <DropdownItem key="Edit">Edit </DropdownItem>
                <DropdownItem key="Delete" className="text-danger" color="danger">
                    Delete
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )

    return (
        <div className="flex flex-wrap gap-2">
            <DropdownContent key={variant} color={color} variant={variant} text={text}/>
        </div>
    );
}
