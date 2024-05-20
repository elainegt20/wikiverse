import React, { useState, useEffect } from "react";
import { PagesList } from "./PagesList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageDetail } from "./PageDetail";
import { AddPageForm } from "./AddPageForm.js";
// import and prepend the api url to any fetch calls
import apiURL from "../api";

export const App = () => {
  const [pages, setPages] = useState([]);

  async function fetchPages() {
    try {
      const response = await fetch(`${apiURL}/wiki`);
      const pagesData = await response.json();
      setPages(pagesData);
    } catch (err) {
      console.log("Oh no an error! ", err);
    }
  }

  useEffect(() => {
    fetchPages();
  }, []); // empty array to fecht data just once after component renders

  return (
    <main>
      <BrowserRouter>
        <Routes>
          {/* add a root path */}
          <Route path="/" element={<PagesList pages={pages} />} />
          {/* this path takes to the page where all articles live */}
          <Route path="/Pages" element={<PagesList pages={pages} />} />
          {/* this path takes me to a single view article */}
          <Route path="/wiki/:slug" element={<PageDetail />} />
          {/* this path allows me to add a page to my database */}
          <Route path="/add-article" element={<AddPageForm />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};
