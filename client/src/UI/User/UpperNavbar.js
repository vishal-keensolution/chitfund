import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { DropdownButton } from 'react-bootstrap';
import 'semantic-ui-css/semantic.min.css'
import { Dropdown, Image } from 'semantic-ui-react'
import DropdownImageTriggerExample from '../DropdownImageTriggerExample'

export default function Navbar() {
  const [loginStatus, setLoginStatus] = useState("");
  var history = useHistory();
  useEffect(() => {
    axios.get("/api/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user.fullname);
      }
      if (response.data.loggedIn === false) {
        history.push("/");
        window.location.reload();
      }
    
    });
  }, []);
  const logout = () => {
    axios.get("/api/logout").then((response) => {
      if (response.data === "logout done") {
        setLoginStatus("");
      }
    });
    history.push("/");
    window.location.reload();
  };
  const upic=localStorage.getItem('pic');
  const userid=localStorage.getItem('userid');
  
 
  return (
    <div className="container-fluid">
      <nav
        className="navbar navbar-expand navbar-white navbar-light"
        style={{ paddingLeft: "20px" }}
      >
        {/* Left navbar links */}
        <div>
          <div className="row">
            <ul className="navbar-nav">
              <h1>Chit-Fund</h1>
            </ul>
          </div>
          <div style={{ paddingLeft: "2%" }} className="row">
            <ul className="navbar-nav">
              <span
                style={{
                  paddingLeft: "30px",
                  fontSize: "10px",
                  marginTop: "-12px",
                  color: "gray",
                }}
              >
                Management System
              </span>
            </ul>
          </div>
        </div>
        
          {/* Navbar Search */}
          
            <ul className="navbar-nav navbar-nav-icons ms-auto flex-row align-items-center">
            <li className="nav-item dropdown">
            <DropdownImageTriggerExample/>
            </li>
            <li className="nav-item dropdown">
              <button type="submit" className="btn btn-danger" onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        {/* Right navbar links */}
      </nav>
    </div>
  );
}
