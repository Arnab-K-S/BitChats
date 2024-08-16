import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Badge,
  Button,
  Divider,
  Avatar,
  Textarea,
  Skeleton,
  Select,
  SelectItem,
  Snippet,
} from "@nextui-org/react";
import Contacts from "./Contact";
import MessageBox from "./Message";
import SearchContacts from "./SearchContacts";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import axios from "axios";

export type User = {
  _id: string;
  name: string;
  email: string;
  pic: string;
  isAdmin: boolean;
  token: string;
};

interface Message {
  _id?: string;
  sender?: User;
  content: string;
  chat?: string;
  language?: string;
  readBy?: User[];
  createdAt?: string;
  updatedAt?: string;
}

export type Chat = {
  _id: string;
  chatName: string;
  email: string;
  updatedAt: string;
  isGroupChat: boolean;
  latestMessage: Message;
  users: User[];
};

const Chat: React.FC = () => {
  const [online, setOnline] = useState<boolean>(true);
  const [chatmode, setChatmode] = useState<boolean>(false);
  const [messageText, setMessageText] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [selectedContact, setSelectedContact] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [language, setLanguage] = useState<string>("Text");

  const languages = ["Text", "C++", "C", "Javascript", "Java", "Python"];

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
    if (userInfo && userInfo) {
      setCurrentUser(userInfo);
    }
  }, []);

  useEffect(() => {
    if (selectedChat) {
      setChatmode(true);
      setOnline(true); // temp using to avoid eslint error
      fetchMessages(selectedChat._id);
    } else {
      setChatmode(false);
    }
  }, [selectedChat, messages, selectedContact]);

  const fetchMessages = async (chatId: string) => {
    if (currentUser) {
      console.log(chatId);
      try {
        console.log(chatId);
        const response = await axios.get(
          `http://localhost:3000/api/message/${chatId}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser?.token}`,
            },
          }
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
  };

  const handleSendMessage = async () => {
    if (
      messageText.trim() &&
      currentUser &&
      currentUser.token &&
      selectedChat
    ) {
      const chatId = selectedChat?._id;
      try {
        const response = await axios.post(
          `http://localhost:3000/api/message/`,
          {
            content: messageText,
            chatId: chatId,
            language: language,
          },
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );
        setMessages([...messages, ...response.data]);
        console.log(response.data);
      } catch (error) {
        console.error("Error sending message:", error);
      }
      setMessageText("");
      setLanguage("Text");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && selectedChat) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex space-x-2 justify-start w-full h-full">
      <Card className="w-96">
        <CardBody>
          <SearchContacts onSelectContact={setSelectedContact} />
          <Contacts onSelectContact={setSelectedChat} />
        </CardBody>
      </Card>
      <Card className="w-full">
        <CardBody className="overflow-hidden">
          {chatmode && selectedChat && messages && currentUser ? (
            <>
              <div className="namebar flex gap-4">
                {online ? (
                  <Badge
                    content="online"
                    color="success"
                    shape="circle"
                    placement="bottom-right"
                    className="text-white"
                  >
                    <Avatar
                      className="m-0 p-0"
                      radius="full"
                      src={selectedChat.users[1].pic}
                    />
                  </Badge>
                ) : (
                  <Badge
                    content="offline"
                    color="danger"
                    shape="circle"
                    placement="bottom-right"
                    className="text-white"
                  >
                    <Avatar radius="full" src={selectedChat.users[1].pic} />
                  </Badge>
                )}
                <h6 className="text-2xl">{selectedChat.users[1].name}</h6>
                <div className="ml-auto">
                  <Select
                    label="Syntax"
                    placeholder="text"
                    className="w-32 float-right"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    {languages.map((lang) => (
                      <SelectItem key={lang} value={lang.toLowerCase()}>
                        {lang}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </div>
              <Divider className="my-4" />
              <div className="textcontainer h-80 p-2 flex flex-col overflow-y-auto">
                {messages.map((message) => (
                  <div
                    key={message._id}
                    className={`message m-1 ${
                      message?.sender?._id === currentUser._id
                        ? "sent self-end"
                        : "received"
                    }`}
                  >
                    {message.language &&
                    message.language != "text" &&
                    message.language != "Text" ? (
                      <Snippet variant="bordered" symbol="">
                        <SyntaxHighlighter
                          language={message.language}
                          style={docco}
                        >
                          {message.content}
                        </SyntaxHighlighter>
                      </Snippet>
                    ) : (
                      <MessageBox
                        variant="shadow"
                        color={
                          message?.sender?._id === currentUser?._id
                            ? "bg-slate-200 text-black"
                            : "bg-blue-500 text-white"
                        }
                        text={message.content}
                      />
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center h-full w-full space-y-3">
              <Skeleton className="rounded-lg w-24 h-24">
                <div className="rounded-lg bg-default-300"></div>
              </Skeleton>
              <div className="space-y-3 w-full">
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                  <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
              </div>
              <h3>Select a contact to start chatting</h3>
            </div>
          )}
          <div className="flex gap-2">
            <Textarea
              isRequired
              placeholder="Type your message here..."
              className="max-w h-10 flex-grow"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={() => handleKeyDown}
            />
            <Button onClick={handleSendMessage} variant="ghost" color="primary">
              Send
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Chat;
