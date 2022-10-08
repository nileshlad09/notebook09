import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const userInitial=[]
  
  const [user, setUser] = useState(userInitial);
  const getUser = async () => {
    const response = await fetch(`https://notebook09.herokuapp.com/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setUser(json);
  };

  useEffect(() => {  
    if (localStorage.getItem("token")) {
      getUser();
    }
  }, []);
  let location = useLocation();
  const logout = () => {
    localStorage.removeItem("token");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand logo" to="/">
            NoteBook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  about
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex">
                <Link
                  className="btn btn-primary mx-2"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-primary mx-2"
                  to="/signup"
                  role="button"
                >
                  Signup
                </Link>
              </form>
            ) : (
              <>
                <div className={`btn-group  drop${window.innerWidth<900?"down":"start"}`}>
                  <button
                    type="button"
                    className="btn btn-secondary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fas fa-user"></i>
                  </button>
                  <ul className="dropdown-menu">
                    <li><i className="fas fa-user"></i>{user.name}</li>
                    <li><i className="fas fa-envelope"></i>{user.email}</li>
                  </ul>
                </div>

                <Link
                  className="btn btn-primary mx-2"
                  to="/login"
                  onClick={logout}
                  role="button"
                >
                  logout
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
