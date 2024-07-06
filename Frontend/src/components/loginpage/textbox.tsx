import React, { useState } from "react";
import { Card, Input } from "@nextui-org/react";
import { Button } from "@nextui-org/button";

const Textbox: React.FC = () => {
  const [newuser, setNewuser] = useState(false);
  const ToggleNewUser=()=>{
      setNewuser(!newuser);
  }
  return (
    <>
    {
      (newuser)?(
         <Card className="h-full w-80 p-10 shadow-xl border" isFooterBlurred>
         <div className="w-full flex flex-col gap-4">
           <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
             <Input type="name" variant="underlined" label="Name" placeholder="Enter your Name" />
           </div>
           <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
             <Input type="email" variant="underlined" label="Email" placeholder="Enter your Email" />
           </div>
           <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
             <Input type="password" variant="underlined" label="Password" placeholder="Enter your Password" />
           </div>
           <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
             <Input type="password" variant="underlined" label="Password" placeholder="Confirm your Password" />
           </div>
           <Button color="primary" variant="bordered" className="mt-5 mb-5" >Register</Button>
           <Button color="warning" variant="bordered" onClick={ToggleNewUser} >Already Registered?</Button>
         </div>
       </Card>
      )
      :(
        <Card className="h-full w-80 p-10 shadow-xl border" isFooterBlurred>
          <div className="w-full flex flex-col gap-4">
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Input type="email" variant="underlined" label="Email" placeholder="Enter your email" />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Input type="password" variant="underlined" label="Password" placeholder="Enter your Password" />
            </div>
            <Button color="primary" variant="bordered" className="mt-5 mb-5" >Login</Button>
            <Button color="warning" variant="bordered"  onClick={ToggleNewUser}>Register</Button>
          </div>
        </Card>
      )
    }
    </>
  );
};

export default Textbox;
