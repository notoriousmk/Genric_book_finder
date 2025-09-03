import React from "react";
import "../styles/BookFinderApp.css";

export default function NavItem({ icon, label }) {
  return (
    <div className="nav-item">
      {icon}
      <span>{label}</span>
    </div>
  );
}