import React, { useState, useEffect } from "react";
import { Listbox, ListboxItem, Skeleton, Spinner, Input, Avatar, Badge, Button, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, ModalFooter } from "@nextui-org/react";
import axios from 'axios';

interface Message {
  _id: string;
  name: string;
  timestamp: string;
  content: string;
  pic: string;
  messageCount: number;
}

interface ContactsProps {
  onSelectContact: (contact: Message) => void;
}

const Contacts: React.FC<ContactsProps> = ({ onSelectContact }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageCounts, setMessageCounts] = useState<number[]>([]);
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
    setIsLoading(false);
  };

  const handleAction = (index: number) => {
    const selectedContact = messages[index];
    onSelectContact(selectedContact);
    const newMessageCounts = [...messageCounts];
    newMessageCounts[index] = 0;
    setMessageCounts(newMessageCounts);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  useEffect(() => {
    handleSearch('');
  }, []);

  const {isOpen, onOpen, onClose} = useDisclosure();
  return (
    <>
    <Button onClick={() => onOpen()} variant="ghost" color="primary" className="mt-2 mb-2">Add New Friends</Button>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} className="h-full m-1 p-1">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Search with Email ID / Name</ModalHeader>
          <ModalBody className="h-72 overflow-y-auto p-2 m-2">
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
              Array.from({ length: 10 }, (_, index) => (
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
                    <Badge content={messageCounts[index]} color="success" placement="bottom-right" />
                  )}
                </div>
              </div>
            </ListboxItem>
          ))}
        </Listbox>
      )} 
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
      {/* {
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
                    <Badge content={messageCounts[index]} color="success" placement="bottom-right" />
                  )}
                </div>
              </div>
            </ListboxItem>
          ))}
        </Listbox>
      )} */}
    </div>
    </>
  );
};

export default Contacts;