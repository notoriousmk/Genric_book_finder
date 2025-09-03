import React from "react";
import "../styles/BookFinderApp.css";

export default function BookCard({ title, author }) {
  return (
    <div className="book-card">
      <p className="book-title">{title}</p>
      <p className="book-author">{author}</p>
    </div>
  );
}
