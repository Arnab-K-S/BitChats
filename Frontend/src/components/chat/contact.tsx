import React, { useState, useEffect } from "react";
import { Listbox, ListboxItem, Skeleton, Spinner, Input, Avatar, Badge } from "@nextui-org/react";
import axios from 'axios';

interface User {
  _id: string;
  name: string;
  pic: string;
}

interface Message {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: User[];
  latestMessage:string;
  createdAt: string;
  updatedAt: string;
}

interface ContactsProps {
  onSelectContact: (contact: Message) => void;
}

const Contacts: React.FC<ContactsProps> = ({ onSelectContact }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = async (search: string) => {
    setIsLoading(true);
    try {
      const userToken = localStorage.getItem('userInfo');
      if (!userToken) {
        throw new Error('User token not found in local storage');
      }
      const userInfo = JSON.parse(userToken);
      const response = await axios.get(`http://localhost:3000/api/chat/`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        },
        params: {
          search
        }
      });

      const searchResults = response.data;
      setMessages(searchResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
    setIsLoading(false);
  };

  const handleAction = (index: number) => {
    const selectedContact = messages[index];
    onSelectContact(selectedContact);
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
    <>
      <div className="scroll">
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
          value={searchTerm}
          onChange={handleInputChange}
        />
        {
          isLoading ? (
            <>
              <div className="flex justify-center">
                <Spinner label="Loading Contacts..." color="warning" />
              </div>
              {
                Array.from({ length: 5 }, (_, index) => (
                  <div key={index} className="max-w-[300px] w-full flex items-center gap-3 m-2">
                    <div>
                      <Skeleton className="flex rounded-full w-12 h-12" />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <Skeleton className="h-3 w-3/5 rounded-lg" />
                      <Skeleton className="h-3 w-4/5 rounded-lg" />
                    </div>
                  </div>
                ))
              }
            </>
          ) : (
            <Listbox aria-label="Messages" className="h-10">
              {messages.map((message: Message, index: number) => (
                <ListboxItem key={index} onClick={() => handleAction(index)}>
                  <div className="grid grid-cols-10 gap-2">
                    <Avatar src={message.users[0]?.pic} className="col-span-2" />
                    <div className="col-span-7">
                      <strong>{message.users[0].name}</strong>
                      <div className="flex justify-between">
                        <p className="text-blue-800">
                          {new Date(message.updatedAt).toLocaleDateString([], {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })}
                        </p>
                        <p className="text-blue-800">
                          {new Date(message.updatedAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <p className="p-1 w-5 flex-1">{message.users[0]?.name}</p>
                      </div>
                    </div>
                  </div>
                </ListboxItem>
              ))}
            </Listbox>
          )
        }
      </div>
    </>
  );
};

export default Contacts;
