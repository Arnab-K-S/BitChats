import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import {
  Listbox,
  ListboxItem,
  Skeleton,
  Spinner,
  Input,
  Avatar,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalFooter,
} from "@nextui-org/react";

import axios from "axios";
import { User } from "./chatpage";

interface SearchContactsProps {
  onSelectContact: Dispatch<SetStateAction<User | null>>;
}

const SearchContacts: React.FC<SearchContactsProps> = ({ onSelectContact }) => {
  const [contacts, setContacts] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const HOST = import.meta.env.VITE_HOST;

  const handleSearch = async (search: string) => {
    setIsLoading(true);
    try {
      const userToken = localStorage.getItem("userInfo");
      if (!userToken) {
        throw new Error("User token not found in local storage");
      }
      const userInfo = JSON.parse(userToken);
      const response = await axios.get(`${HOST}/api/user?search=${search}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      const searchResults = response.data as User[];
      setContacts(searchResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
    setIsLoading(false);
  };

  const handleAction = async (index: number) => {
    const selectedContact = contacts[index];
    onSelectContact(selectedContact);
    try {
      const userToken = localStorage.getItem("userInfo");
      if (!userToken) {
        throw new Error("User token not found in local storage");
      }
      const userInfo = JSON.parse(userToken);
      await axios.post(
        `${HOST}/api/chat/`,
        { userId: selectedContact._id },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error sending contact ID:", error);
    }

    const updatedContacts = [...contacts];
    setContacts(updatedContacts);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  useEffect(() => {
    handleSearch("");
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={() => onOpen()}
        variant="ghost"
        color="primary"
        className="mt-2 mb-2"
      >
        Add New Friends
      </Button>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onClose={onClose}
        className="h-full m-1 p-1"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Search with Email ID / Name
          </ModalHeader>
          <ModalBody className="h-72 overflow-y-auto p-2 m-2">
            <Input
              classNames={{
                base: "w-full h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                  "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Type to search..."
              size="sm"
              type="search"
              value={searchTerm}
              onChange={handleInputChange}
            />
            {isLoading ? (
              <>
                <div className="flex justify-center">
                  <Spinner label="Loading SearchContacts..." color="warning" />
                </div>
                {Array.from({ length: 10 }, (_, index) => (
                  <div
                    key={index}
                    className="max-w-[300px] w-full flex items-center gap-3 m-2"
                  >
                    <div>
                      <Skeleton className="flex rounded-full w-12 h-12" />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <Skeleton className="h-3 w-3/5 rounded-lg" />
                      <Skeleton className="h-3 w-4/5 rounded-lg" />
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <Listbox aria-label="Messages" className="h-10">
                {contacts.map((contact: User, index: number) => (
                  <ListboxItem key={index} onClick={() => handleAction(index)}>
                    <div className="grid grid-cols-10 gap-2">
                      <Avatar src={contact.pic} className="col-span-2" />
                      <div className="col-span-7">
                        <strong>{contact.name}</strong>
                        <p className="text-blue-800">{contact.email}</p>
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
    </>
  );
};

export default SearchContacts;
