import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import {
  Listbox,
  ListboxItem,
  Skeleton,
  Spinner,
  Input,
  Avatar,
} from "@nextui-org/react";
import axios from "axios";
import { Chat } from "./chatpage";

interface ChatProps {
  onSelectContact: Dispatch<SetStateAction<Chat | null>>;
}

const Contacts: React.FC<ChatProps> = ({ onSelectContact }) => {
  const HOST = import.meta.env.VITE_HOST;
  const [chats, setChat] = useState<Chat[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = async (search: string) => {
    setIsLoading(true);
    try {
      const userToken = localStorage.getItem("userInfo");
      if (!userToken) {
        throw new Error("User token not found in local storage");
      }
      const userInfo = JSON.parse(userToken);
      const response = await axios.get(`${HOST}/api/chat/`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
        params: {
          search,
        },
      });
      const searchResults = response.data;
      setChat(searchResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
    setIsLoading(false);
  };

  const handleAction = (index: number) => {
    const selectedChat = chats[index];
    onSelectContact(selectedChat);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  useEffect(() => {
    handleSearch("");
  });

  return (
    <>
      <div className="scroll">
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
              <Spinner label="Loading Contacts..." color="warning" />
            </div>
            {Array.from({ length: 5 }, (_, index) => (
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
            {chats.map((chat: Chat, index: number) => (
              <ListboxItem key={index} onClick={() => handleAction(index)}>
                <div className="grid grid-cols-10 gap-2">
                  <Avatar src={chat.users[1].pic} className="col-span-2" />
                  <div className="col-span-7">
                    <strong>{chat.users[1].name}</strong>
                    <div className="flex justify-between">
                      <p className="text-blue-800">
                        {new Date(chat.updatedAt).toLocaleDateString([], {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })}
                      </p>
                      <p className="text-blue-800">
                        {new Date(chat.updatedAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <p className="p-1 w-5 flex-1">
                        {chat?.latestMessage?.content}
                      </p>
                    </div>
                  </div>
                </div>
              </ListboxItem>
            ))}
          </Listbox>
        )}
      </div>
    </>
  );
};

export default Contacts;
