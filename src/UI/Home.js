import React, { useEffect, useState } from "react";
import {Navbar, Nav, NavItem, NavDropdown, DropdownButton, MenuItem, CollapsibleNav} from 'react-bootstrap';
import axios from "axios";
import Register from "./Register";
export default function Home() {
  const [loginStatus, setLoginStatus] = useState("");

  useEffect(() => {
    axios.get("/api/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user.fullname);
      }
    });
  }, []);

  const logout = () => {
    axios.get("/api/logout").then((response) => {
      if (response.data === "logout done") {
        setLoginStatus("");
      }
    });
  };

  return (
    <div className="sidebar-collapse">
      <nav className="navbar navbar-expand-sm bg-light navbar-light">
        <div className="container">
          <a className="navbar-brand" href="#"><h1>Chit-Fund</h1></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end collapsibleNavbar" >
              <ul className="navbar-nav nav ">
                  {/* Navbar Search */}
                  <li className="nav-item">
                    <a href="index3.html" className="nav-link">
                      Features
                    </a>
                  </li>
                  <li className="nav-item ">
                    <a href="index3.html" className="nav-link">
                      Plans
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="index3.html" className="nav-link">
                      About us
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="index3.html" className="nav-link">
                      Support
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-widget="navbar-search"
                      href="/"
                      role="button"
                    >
                      <i className="fas fa-search" />
                    </a>
                    <div className="navbar-search-block">
                      <form className="form-inline">
                        <div className="input-group input-group-sm">
                          <input
                            className="form-control form-control-navbar"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                          />
                          <div className="input-group-append">
                            <button className="btn btn-navbar" type="submit">
                              <i className="fas fa-search" />
                            </button>
                            <button
                              className="btn btn-navbar"
                              type="button"
                              data-widget="navbar-search"
                            >
                              <i className="fas fa-times" />
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </li>
                  {loginStatus === "" && (
                    <li
                      style={{ background: "gray" }}
                      className="nav-item d-none d-sm-inline-block"
                    >
                      <a
                        style={{ color: "white" }}
                        href="/register"
                        className="nav-link"
                      >
                        Login/Sign In
                      </a>
                    </li>
                  )}
                  {loginStatus !== "" && (
                    <>
                      <li
                        style={{ marginTop: "9px" }}
                        className="nav-item d-none d-sm-inline-block"
                      >
                        <span>Hello! {loginStatus} </span>
                      </li>
                      <li
                        style={{ marginTop: "1px", paddingLeft: "12px" }}
                        className="nav-item d-none d-sm-inline-block"
                      >
                        <button
                          type="submit"
                          className="btn btn-danger btn-block"
                          onClick={logout}
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  )}
                </ul>
          </div>
        </div>
      </nav>
      <center style={{ marginTop: "10%" }}>
        <h1>Chit-Fund to empower your</h1>
      </center>
      <center style={{ marginTop: "-10px" }}>
        <h1>Chit Fund Company </h1>
      </center>
      <center>
        <a href="/Register">
          <button
            type="submit"
            style={{ background: "gray" }}
            className="btn btn-primary "
          >
            Register
          </button>
        </a>
      </center>
      {/*Book a demo form*/}
    </div>
  );
}
