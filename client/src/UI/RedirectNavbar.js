import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function RedirectNavbar() {
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
  return (
    <div>
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
      <div style={{ display: "contents" }} className="col-12 col-sm-6">
        <div className="card card-secondary card-tabs">
          <div className="card-header p-0 pt-1">
            <ul
              style={{ width: "56%", margin: "0 auto" }}
              className="nav nav-tabs"
              id="custom-tabs-two-tab"
              role="tablist"
            >
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="dashboard-tab"
                  data-toggle="pill"
                  href="#dashboard"
                  role="tab"
                  aria-controls="dashboard"
                  aria-selected="false"
                  onClick={(e) => {
                    history.push("/dashboard");
                    window.location.reload();
                  }}
                >
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="users-tab"
                  data-toggle="pill"
                  href="#users"
                  role="tab"
                  aria-controls="users"
                  aria-selected="false"
                  onClick={(e) => {
                    history.push("/dashboard");
                    window.location.reload();
                  }}
                >
                  Users
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="verfications-tab"
                  data-toggle="pill"
                  href="#verifications"
                  role="tab"
                  aria-controls="verifications"
                  aria-selected="false"
                  onClick={(e) => {
                    history.push("/dashboard");
                    window.location.reload();
                  }}
                >
                  Verifications
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="schemes-tab"
                  data-toggle="pill"
                  href="#schemes"
                  role="tab"
                  aria-controls="schemes"
                  aria-selected="false"
                  onClick={(e) => {
                    history.push("/dashboard");
                    window.location.reload();
                  }}
                >
                  Schemes
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="groups-tab"
                  data-toggle="pill"
                  href="#groups"
                  role="tab"
                  aria-controls="groups"
                  aria-selected="false"
                  onClick={(e) => {
                    history.push("/dashboard");
                    window.location.reload();
                  }}
                >
                  Groups
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="collections-tab"
                  data-toggle="pill"
                  href="#collections"
                  role="tab"
                  aria-controls="Collections"
                  aria-selected="false"
                  onClick={(e) => {
                    history.push("/dashboard");
                    window.location.reload();
                  }}
                >
                  Collections
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="reports-tab"
                  data-toggle="pill"
                  href="#reports"
                  role="tab"
                  aria-controls="reports"
                  aria-selected="false"
                  onClick={(e) => {
                    history.push("/dashboard");
                    window.location.reload();
                  }}
                >
                  Reports
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
