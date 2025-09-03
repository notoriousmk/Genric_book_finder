import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "../styles/BookFinderApp.css";

export default function ResultsPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q");

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        const books = data.docs.slice(0, 20).map((book) => ({
          key: book.key,
          title: book.title,
          author: book.author_name?.[0] || "Unknown",
          year: book.first_publish_year || "N/A",
          coverId: book.cover_i,
        }));
        setResults(books);
        setLoading(false);
      })
      .catch(() => setResults([]));
  }, [query]);

  return (
    <div className="results-page">
      <div className="results-header">
        <h1>Search Results for "{query}"</h1>
        <Link to="/" className="back-btn">← Back Home</Link>
      </div>

      {loading ? (
        <p className="loading">Loading results...</p>
      ) : results.length > 0 ? (
        <div className="results-grid">
          {results.map((book) => (
            <div key={book.key} className="result-card">
              {book.coverId ? (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`}
                  alt={book.title}
                  className="result-cover"
                />
              ) : (
                <div className="result-cover placeholder">No Image</div>
              )}
              <h3 className="result-title">{book.title}</h3>
              <p className="result-author">{book.author}</p>
              <p className="result-year">{book.year}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-results">No books found.</p>
      )}
    </div>
  );
}
