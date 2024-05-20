import React from "react";
import { Page } from "./Page";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

export const PagesList = ({ pages }) => {
  return (
    <>
      <h1>WikiVerse</h1>
      <h2>An interesting 📚</h2>
      {pages.map((page, idx) => {
        return (
          <Link
            style={{
              color: "black",
              textDecoration: "none",
            }}
            to={`/wiki/${page.slug}`}
            key={idx}
          >
            <Page page={page} />
          </Link>
        );
      })}

      <Link to="/add-article">
        <button>Add Article</button>
      </Link>
    </>
  );
};

/*

-When you click on a link, the URL in the 
browser changes to match the 
'to' attribute of the <Link>

-clicking <Link to="/product/shoes">Shoes</Link> 
changes the URL to /product/shoes.

-React Router listens for changes in the URL. 
When the URL changes, it checks all 
defined routes to find a match.


-When the URL changes to something like 
/product/shoes, 
React Router matches it to the 
route /product/:slug. It recognizes that shoes is the value for the slug parameter.
React Router then renders the component specified in the route (ProductPage) 
and provides the parameter value to it.

but you can also define any url and handle 
request within component if you dont need any params


*/
