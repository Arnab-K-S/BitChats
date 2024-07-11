import React from "react";
import { Link } from "@nextui-org/link";
import Navbar from "@/components/navbar";

interface DefaultProps {
  onLogout: () => void;
  children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultProps> = ({ onLogout, children }) => {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar onLogout={onLogout}/>
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://github.com/Arnab-K-S"
          title="Arnab's Github Profile"
        >
          <span className="text-default-600">Designed and Created by</span>
          <p className="text-primary">Arnab Kumar Singh ©️</p>
        </Link>
      </footer>
    </div>
  );
};

export default DefaultLayout;
