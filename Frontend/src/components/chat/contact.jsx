import React, { useState } from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { ListboxWrapper } from "./list";
import { Avatar } from "@nextui-org/avatar";
import { Badge } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import messages from './data.json';


export default function Contacts() {
  const [messageCounts, setMessageCounts] = useState(messages.map(msg => msg.messageCount));

  const handleAction = (index) => {
    const newMessageCounts = [...messageCounts];
    newMessageCounts[index] = 0;
    setMessageCounts(newMessageCounts);
    console.log(newMessageCounts)
  };

  return (
    <ListboxWrapper className="h-5">
      <Input
        classNames={{
          base: " w-full h-10",
          mainWrapper: "h-full",
          input: "text-small",
          inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
        }}
        placeholder="Type to search..."
        size="sm"
        // startContent={<SearchIcon size={18} />}
        type="search"
      />
      <Listbox aria-label="Actions" className="h-10">
        {
          messages.map((message, index) => (
            <ListboxItem className="" key={index} onClick={() => handleAction(index)}>
              <div className="grid grid-cols-10 gap-2">
                <Avatar src={message.profilePic} className="col-span-2" />
                <div className="col-span-7">
                  <strong>{message.name}</strong>
                  <div className="flex place-content-between">
                    <p className="text-blue-500 col-span-2 col-start-7 pr-4">
                      {new Date(message.timestamp).toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')}
                    </p>
                    <p className="text-blue-500 col-span-2 col-start-7 pr-4">
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <p className="p-1 w-5 flex-1 col-span-6">{message.content}</p>
                  </div>
                </div>

                <div className="flex-col col-span-1">
                  {messageCounts[index] > 0 && (
                    <Badge
                      className="col-span-1 col-start-9 text-white"
                      content={messageCounts[index]}
                      color="success"
                      placement="bottom-right"
                    />
                  )}
              </div>

              </div>
    </ListboxItem>
  ))
}
      </Listbox >
    </ListboxWrapper >
  );
}