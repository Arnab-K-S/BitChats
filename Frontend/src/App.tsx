import { Route, Routes, Navigate } from "react-router-dom";
import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import ChatPage from "@/pages/chatPage";
import BlogPage from "@/pages/blog";
import Home from "./components/Home/home";
import { useState, useEffect } from "react";
import DefaultLayout from "./layouts/default";

function App() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const savedLogin = localStorage.getItem("userInfo");
    if (savedLogin) {
      setLogin(JSON.parse(savedLogin));
    }
  }, []);

  const handleLogin = () => {
    setLogin(true);
  };

  const handleLogout = () => {
    setLogin(false);
    localStorage.removeItem("userInfo");
  };

  return (
    <>
      {login ? (
        <DefaultLayout onLogout={handleLogout}>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<DocsPage />} path="/docs" />
            <Route element={<ChatPage />} path="/chats" />
            <Route element={<BlogPage />} path="/blog" />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </DefaultLayout>
      ) : (
        <Routes>
          <Route element={<IndexPage onLogin={handleLogin} />} path="/" />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </>
  );
}

export default App;
