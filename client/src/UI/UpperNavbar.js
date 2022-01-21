import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

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
      console.log(response.data);
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
  return (
    <div>
      <nav
        className="main-header navbar navbar-expand navbar-white navbar-light"
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
        <ul className="navbar-nav ml-auto">
          {/* Navbar Search */}
          <div className="row">
            <div className="col-sm-12 col-md-4">
              <span>Logged in as : {loginStatus}</span>
            </div>
            <div className="col-sm-12 col-md-4">
              <div className="form-group">
                <select
                  className="form-control"
                  onChange={(e) => {
                    console.log(e.target.value);
                    history.push(e.target.value);
                    window.location.reload();
                  }}
                >
                  <option value="/Settings">Settings</option>
                  <option value="/taxmanagement">Tax Management</option>
                  <option value="/Notificationmanagement">Notifications</option>
                  <option value="/Settings">Transaction Charge</option>
                  <option value="/Platformfee">Platform Fee</option>
                  <option value="/OtherSetting">Other Settings</option>
                </select>
              </div>
            </div>
            <div className="col-sm-12 col-md-4">
              <button type="submit" className="btn btn-danger" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </ul>

        {/* Right navbar links */}
      </nav>
    </div>
  );
}
