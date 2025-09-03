import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Home, BookOpen, Star, MessageSquare, Settings, User, Menu, X } from "lucide-react";
import NavItem from "../components/NavItem";
import Section from "../components/Section";
import BookCard from "../components/BookCard";
import "../styles/BookFinderApp.css";

export default function BookFinderApp() {
  const [popularBooks, setPopularBooks] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [query, setQuery] = useState("");
  const [loggedIn, setLoggedIn] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

const navigate = useNavigate();   

const bookTitle = "Harry Potter";

useEffect(() => {
  fetch("https://openlibrary.org/subjects/fantasy.json?limit=20")
     .then((res) => res.json())
      .then((data) => {
        if (data.works && Array.isArray(data.works)) {
          const shuffled = data.works
            .sort(() => 0.5 - Math.random())
            .slice(0, 10);
          setPopularBooks(shuffled);
        }
      })
    .catch((err) => {
      console.error("Error fetching books:", err);
      setPopularBooks([]);
    });
}, []);


    const handleSearch = (e) => {
    e.preventDefault();
    if (!query) return;
    navigate(`/results?q=${encodeURIComponent(query)}`);  
    setQuery("");
  };


  return (
    <div className="app">
     
      <button
        className="menu-btn"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu size={28} />
      </button>

      <aside className={`sidebar-drawer ${sidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>
          <X size={24} />
        </button>

        <div className="profile">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Profile"
            className="profile-pic"
          />
          <h2 className="username">Alex</h2>
          {loggedIn ? (
            <button onClick={() => setLoggedIn(false)} className="btn logout">
              Logout
            </button>
          ) : (
            <button onClick={() => setLoggedIn(true)} className="btn login">
              Login
            </button>
          )}
        </div>

        <nav className="nav">
          <NavItem icon={<Home size={20} />} label="Home" />
          <NavItem icon={<BookOpen size={20} />} label="Categories" />
          <NavItem icon={<Star size={20} />} label="Recommendations" />
          <NavItem icon={<MessageSquare size={20} />} label="Reviews" />
          <NavItem icon={<Settings size={20} />} label="Settings" />
          <NavItem icon={<User size={20} />} label="Profile" />
        </nav>
        <div className="footer">© 2025 Generic Book Store</div>
      </aside>

      {/* Overlay Blur */}
      {sidebarOpen && (
        <div
          className="overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <main className={`main ${sidebarOpen ? "blur" : ""}`}>
        <div className="hero">
          <img
            src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1350&q=80"
            alt="Flower"
            className="hero-img"
          />
          <div className="hero-overlay">
            <h1 className="hero-title">Generic Book Store</h1>
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search for books..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
              />
            </form>
          </div>
        </div>

        <div className="sections">
          <Section title="Popular Books">
            {popularBooks.map((book, idx) => (
              <BookCard
                key={idx}
                title={book.title}
                author={book.authors?.[0]?.name || "Unknown"}
              />
            ))}
          </Section>

          <Section title="Recently Searched">
            {recentSearches.length > 0 ? (
              recentSearches.map((book, idx) => (
                <BookCard key={idx} title={book.title} author={book.author} />
              ))
            ) : (
              <p className="no-results">No recent searches yet.</p>
            )}
          </Section>
        </div>
      </main>
    </div>
  );
}
