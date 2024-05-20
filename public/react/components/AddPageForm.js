import React, { useState } from "react";
import apiURL from "../api";

export const AddPageForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAddingArticle, setIsAddingArticle] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newArticle = {
      title,
      content,
      name,
      email,
      tags,
    };

    try {
      const response = await fetch(`${apiURL}/wiki`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newArticle),
      });
      if (response.ok) {
        // Clear form and reset state after information is post
        setTitle("");
        setName("");
        setEmail("");
        setContent("");
        setTags("");
        setIsAddingArticle(false); // Reset the form display state
      } else {
        console.error("Failed to add article");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  //clear form for cancellation purposes and reset the isAddingArticle variable for next submit
  function clear() {
    if (!isAddingArticle) {
      setTitle("");
      setName("");
      setEmail("");
      setContent("");
      setTags("");
      setIsAddingArticle(true);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Author:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Tags (space separated):</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <button type="submit">Add Article</button>
      {/* on click set IsAddingArticle to false and clear all fields in the form */}
      <button
        type="button"
        onClick={() => {
          setIsAddingArticle(false);
          clear();
        }}
      >
        Cancel
      </button>
    </form>
  );
};
