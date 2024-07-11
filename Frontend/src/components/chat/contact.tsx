import React, { useState } from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { ListboxWrapper } from "./list";
import { Avatar } from "@nextui-org/avatar";
import { Badge } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import messages from './data.json';

interface Message {
  name: string;
  timestamp: string;
  content: string; 
  profilePic: string;
  messageCount: number;
}

const Contacts: React.FC = () => {
  const [messageCounts, setMessageCounts] = useState<number[]>(
    messages.map((msg: Message) => msg.messageCount)
  );

  const handleAction = (index: number) => {
    const newMessageCounts = [...messageCounts];
    newMessageCounts[index] = 0;
    setMessageCounts(newMessageCounts);
    console.log(newMessageCounts);
  };

  return (
    <ListboxWrapper>
      <Input
        classNames={{
          base: "w-full h-10",
          mainWrapper: "h-full",
          input: "text-small",
          inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
        }}
        placeholder="Type to search..."
        size="sm"
        type="search"
      />
      <Listbox aria-label="Messages" className="h-10">
        {messages.map((message: Message, index: number) => (
          <ListboxItem key={index} onClick={() => handleAction(index)}>
            <div className="grid grid-cols-10 gap-2">
              <Avatar src={message.profilePic} className="col-span-2" />
              <div className="col-span-7">
                <strong>{message.name}</strong>
                <div className="flex justify-between">
                  <p className="text-blue-800">
                    {new Date(message.timestamp).toLocaleDateString([], {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </p>
                  <p className="text-blue-800">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="flex gap-2">
                  <p className="p-1 w-5 flex-1">{message.content}</p>
                </div>
              </div>
              <div className="flex-col col-span-1">
                {messageCounts[index] > 0 && (
                  <Badge
                    content={messageCounts[index]}
                    color="success"
                    placement="bottom-right"
                  />
                )}
              </div>
            </div>
          </ListboxItem>
        ))}
      </Listbox>
    </ListboxWrapper>
  );
};

export default Contacts;
