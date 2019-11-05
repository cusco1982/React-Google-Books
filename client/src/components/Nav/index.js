import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        Google Books
      </a>

      <a className="home-nav-link" href="/">Search</a>
      <a className="saved-nav-link" href="/saved">Saved</a>
    </nav>
  );
}

export default Nav;