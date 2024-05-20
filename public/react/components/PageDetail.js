import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiURL from "../api";
import { format, parseISO } from "date-fns"; //to format date value
import { Link } from "react-router-dom";

export const PageDetail = () => {
  const { slug } = useParams(); // Get the slug from the URL
  const [page, setPage] = useState(null);
  const [error, setError] = useState(null); // Add error state
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await fetch(`${apiURL}/wiki/${slug}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const pageData = await response.json();
        if (!pageData) {
          throw new Error("No page data found");
        }
        setPage(pageData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]); // Fetch page data whenever the slug changes

  const handleDelete = async () => {
    try {
      const response = await fetch(`${apiURL}/wiki/${slug}`, {
        method: "DELETE",
      });
      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!page) {
    return <p>No page found</p>;
  }
  console.log(page);
  return (
    <>
      <div>
        {/* if right value is falsy, show left value */}
        <h2>{page.title || "Title not available"}</h2>
        <p>
          <strong>Author: </strong>
          {page.author ? page.author.name : "Unknown author"}
        </p>
        <p>
          <strong>Published: </strong>
          {/* format createdAt value as specified */}
          {format(parseISO(page.createdAt), "MM/dd/yyyy")}
        </p>
        <p>{page.content || "No content available"}</p>

        <strong>Tags:</strong>

        {page.tags.map((tag, idx) => {
          return <p>{tag.name}</p>;
        })}
        <Link to="/Pages">
          <button>Back to Wiki List</button>
          <button onClick={handleDelete}>Delete Article</button>
        </Link>
      </div>
    </>
  );
};
