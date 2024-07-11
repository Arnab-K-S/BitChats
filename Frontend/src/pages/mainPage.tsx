import { Route, Routes } from "react-router-dom";
import React from "react";
import { BrowserRouter } from "react-router-dom";
// import { AppProvider } from './hooks/context.ts';
import { Provider } from "../provider";
import "@/styles/globals.css";
import IndexPage from "@/pages/mainPage";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/chatPage";
import BlogPage from "@/pages/blog";

function MainPage() {
  return (
    <>
    <React.StrictMode>
      <BrowserRouter>
        <Provider>
          <Routes>
            <Route element={<IndexPage />} path="/" />
            <Route element={<DocsPage />} path="/docs" />
            <Route element={<PricingPage />} path="/pricing" />
            <Route element={<BlogPage />} path="/blog" />
          </Routes>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>,
    </>
  );
}

export default MainPage;
