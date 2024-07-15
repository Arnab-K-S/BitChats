import React, { useState, useEffect } from "react";
import { Listbox, ListboxItem, Spinner } from "@nextui-org/react";
import { ListboxWrapper } from "./list";
import { Avatar } from "@nextui-org/avatar";
import { Badge } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import axios from 'axios';

interface Message {
  name: string;
  timestamp: string;
  content: string;
  pic: string;
  messageCount: number;
}

const Contacts: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageCounts, setMessageCounts] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading,setIsLoading] =useState(true);
  const handleSearch = async (search: string) => {
    setIsLoading(true)
    try {
      const userToken = localStorage.getItem('userInfo');
      if (!userToken) {
        throw new Error('User token not found in local storage');
      }
      const userInfo = JSON.parse(userToken);
      const response = await axios.get(`http://localhost:3000/api/user?search=${search}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      });

      const searchResults = response.data;
      setMessages(searchResults);
      setMessageCounts(searchResults.map((msg: Message) => msg.messageCount));
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
    setIsLoading(false)
  };


  const handleAction = (index: number) => {
    const newMessageCounts = [...messageCounts];
    newMessageCounts[index] = 0; // Reset message count or perform relevant action
    setMessageCounts(newMessageCounts);
    console.log(newMessageCounts);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  useEffect(() => {
    handleSearch('');
  }, []);

  return (
    <ListboxWrapper>
      <Input
        className="border-none rounded p-1"
        // {
        //   {
        //   // base: "w-full h-10",
        //   // mainWrapper: "h-full",
        //   // input: "text-small",
        //   // inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
        // }}
        placeholder="Type to search..."
        size="sm"
        type="search"
        value={searchTerm}
        onChange={handleInputChange}
      />
      {
        isLoading ? (
          <div className="flex justify-center">
            <Spinner label="Loading Contacts..." color="warning" />
          </div>
        ) : (
          
          <Listbox aria-label="Messages" className="h-10">
        {messages.map((message: Message, index: number) => (
          <ListboxItem key={index} onClick={() => handleAction(index)}>
            <div className="grid grid-cols-10 gap-2">
              <Avatar src={message.pic} className="col-span-2" />
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
  )
}
    </ListboxWrapper>
  );
};

export default Contacts;
