import React from "react";

export default function Navbar() {
  return (
    <div>
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
                  className="nav-link active"
                  id="dashboard-tab"
                  data-toggle="pill"
                  href="#dashboard"
                  role="tab"
                  aria-controls="dashboard"
                  aria-selected="true"
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
