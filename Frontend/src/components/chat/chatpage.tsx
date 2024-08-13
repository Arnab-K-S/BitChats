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
} from "@nextui-org/react";
import Contacts from "./Contact";
import MessageBox from "./Message";
import SearchContacts from "./SearchContacts";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface Message {
  id: number;
  text: string;
  userId: string | undefined;
  isCode?: boolean;
  language?: string;
}

export type Contact = {
  _id: string;
  email: string;
  name: string;
  pic: string;
  messageCount?: number;
  updatedAt: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  pic: string;
  isAdmin: boolean;
};

export type Chat = {
  _id: string;
  chatName: string;
  email: string;
  updatedAt: string;
  isGroupChat: boolean;
  users: User[];
};

const Chat: React.FC = () => {
  const [online, setOnline] = useState<boolean>(true);
  const [chatmode, setChatmode] = useState<boolean>(false);
  const [messageText, setMessageText] = useState<string>("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [language, setLanguage] = useState<string>("text");

  const languages = ["Text", "C++", "C", "Javascript", "Java", "Python"];

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
    if (userInfo && userInfo._id) {
      setCurrentUserId(userInfo._id);
    }
  }, []);

  useEffect(() => {
    if (selectedContact) {
      setChatmode(true);
      setMessages([
        { id: 1, text: "Hi there! How are you?", userId: selectedContact._id },
        {
          id: 2,
          text: "Hello! I'm good, thank you. How about you?",
          userId: selectedContact._id,
        },
      ]);
    } else {
      setChatmode(false);
    }

    console.log("Selected  Contacts:\n", selectedContact);
  }, [selectedContact]);

  const handleSendMessage = () => {
    if (messageText.trim() && currentUserId !== null) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: messageText,
          userId: currentUserId,
          isCode: language !== "text",
          language: language,
        },
      ]);
      setMessageText("");
      setLanguage("text");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex space-x-2 justify-start w-full h-full">
      <Card className="w-96">
        <CardBody>
          <SearchContacts onSelectContact={setSelectedContact} />
          <Contacts onSelectContact={setSelectedContact} />
        </CardBody>
      </Card>
      <Card className="w-full">
        <CardBody className="overflow-hidden">
          {chatmode && selectedContact ? (
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
                      src={selectedContact.pic}
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
                    <Avatar radius="full" src={selectedContact.pic} />
                  </Badge>
                )}
                <h6 className="text-2xl">{selectedContact.name}</h6>
                <div className="ml-auto">
                  <Select
                    label="Syntax"
                    placeholder="Text"
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
                    key={message.id}
                    className={`message m-1 ${
                      message.userId === currentUserId
                        ? "sent self-end"
                        : "received"
                    }`}
                  >
                    {message.isCode ? (
                      <SyntaxHighlighter
                        language={message.language}
                        style={docco}
                      >
                        {message.text}
                      </SyntaxHighlighter>
                    ) : (
                      <MessageBox
                        color="primary"
                        variant={
                          message.userId === currentUserId
                            ? "shadow"
                            : "bordered"
                        }
                        text={message.text}
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
              onKeyDown={handleKeyDown as any}
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
