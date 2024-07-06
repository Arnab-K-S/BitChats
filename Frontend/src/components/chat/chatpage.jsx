import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import Contacts from "./contact";
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import MessageBox from "./message";
import { Avatar } from "@nextui-org/avatar";
import { Divider } from "@nextui-org/react";
import { Badge } from "@nextui-org/react";
import { useState } from "react";

export default function Chat() {
  const [online, setOnline] = useState(true);
  // const [online, setOnline] = useState(false);
  return (
    <div className="flex space-x-2 justify-start w-full h-full">
      <Card className="w-96">
        <CardBody>
          <Contacts />
        </CardBody>
      </Card>
      <Card className="w-full">
        <CardBody className="overflow-hidden">
          <div className="namebar flex gap-4">
          {online ? (
                <Badge content="online" color="success" shape="circle" placement="bottom-right" className="text-white">
                  <Avatar className="m-0 p-0" radius="full" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                </Badge>
              ) : (
                <Badge content="offline" color="danger" shape="circle" placement="bottom-right" className="text-white">
                  <Avatar radius="full" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                </Badge>
              )}
            <h6 className="text-2xl">John Doe</h6>
          </div>
          <Divider className="my-4" />

          <div className="textcontainer h-full p-0">
            <div className="message sent">
              <MessageBox color="primary" variant="bordered"
                text="Hello This is a message"
              />
            </div>
            <div className="message recieved float-right">
              <MessageBox color="primary" variant="shadow"
                text="Hello This is a message"
              />
            </div>
          </div>
          <Textarea
            isRequired
            placeholder="Type your message here..."
            className="max-w h-10"
          />
        </CardBody>
      </Card>
    </div>
  );
}
