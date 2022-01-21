import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import TotalUserDonutChart from "./User/TotalUserDonutChart";
import MonthlyAuctionLineChart from "./User/MonthlyAuctionLineChart";
import DashboardTable from "./User/DashboardTable";
import SchemeManagmentTable from "./User/SchemeManagementTable";
import ReportTable from "./User/ReportTable";
import GroupManagementTable from "./User/GroupManagementTable";
import UpperNavbar from "./User/UpperNavbar";
import Navbar from "./User/Navbar";
import Navbar from "./User/Bid";

/* import AssignForm from "./AssignForm";
 */
export default function DashboardUser() {
  const [GroupGroupName, setGroupGroupName] = useState("");
  const [GroupContactPersonName, setGroupContactPersonName] = useState("");
  const [GroupCellPhone, setGroupCellPhone] = useState("");
  const [GroupEmail, setGroupEmail] = useState("");
  const [GroupMaxAllowedUsers, setGroupMaxAllowedUsers] = useState(0);
  const [GroupAmountPerUser, setGroupAmountPerUser] = useState(0);
  const [GroupTerms, setGroupTerms] = useState("");
  const [GroupAddress, setGroupAddress] = useState("");
  const [GroupCountry, setGroupCountry] = useState("");
  const [GroupState, setGroupState] = useState("");
  const [GroupCity, setGroupCity] = useState("");
  const [GroupZipcode, setGroupZipcode] = useState("");
  const [GroupStatus, setGroupStatus] = useState("");



  var history = useHistory();
  const [TotalUsers, setTotalUsers] = useState();
  const [TotalSchemes, setTotalSchemes] = useState();
  const [TotalGroups, setTotalGroups] = useState();

  useEffect(async () => {
    await axios.get("/api/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user.fullname);
      }
      if (response.data.loggedIn === false) {
        history.push("/");
        window.location.reload();
      }
      console.log(response.data);
    });
    await axios.get("/api/getTotalSchemeCount").then((response) => {
      setTotalSchemes(response.data.data[0].totalSchemes);
    });
    await axios.get("/api/getTotalGroupCount").then((response) => {
      setTotalGroups(response.data.data[0].totalGroups);
    });
    await axios.get("/api/getTotalUsersCount").then((response) => {
      setTotalUsers(response.data.data[0].totalUsers);
    });
  }, []);

  const [loginStatus, setLoginStatus] = useState("");

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
    <div className="sidebar-collapse">
      <UpperNavbar />
      <div style={{ display: "contents" }} className="col-12 col-sm-6">
        <div className="card card-secondary card-tabs">
          <Navbar />
          <div className="card-body">
            <div className="tab-content" id="custom-tabs-two-tabContent">
              <div
                className="tab-pane fade show active"
                id="dashboard"
                role="tabpanel"
                aria-labelledby="dashboard-tab"
              >
                {/*  Dashboard */}
                <div className="row">
                  <div className="col-md-2 col-sm-4 col-6">
                    <div className="info-box">
                      <span className="info-box-icon bg-info">
                        <i className="far fa-envelope" />
                      </span>
                      <div className="info-box-content">
                        <span className="info-box-number">{TotalUsers}</span>
                        <span className="info-box-text">Total Users</span>
                      </div>
                      {/* /.info-box-content */}
                    </div>
                    {/* /.info-box */}
                  </div>
                  {/* /.col */}
                  <div className="col-md-2 col-sm-4 col-6">
                    <div className="info-box">
                      <span className="info-box-icon bg-success">
                        <i className="far fa-flag" />
                      </span>
                      <div className="info-box-content">
                        <span className="info-box-number">410</span>
                        <span className="info-box-text">
                          Total Verifications
                        </span>
                      </div>
                      {/* /.info-box-content */}
                    </div>
                    {/* /.info-box */}
                  </div>
                  {/* /.col */}
                  <div className="col-md-2 col-sm-4 col-6">
                    <div className="info-box">
                      <span className="info-box-icon bg-warning">
                        <i className="far fa-copy" />
                      </span>
                      <div className="info-box-content">
                        <span className="info-box-number">{TotalSchemes}</span>
                        <span className="info-box-text">Total Schemes</span>
                      </div>
                      {/* /.info-box-content */}
                    </div>
                    {/* /.info-box */}
                  </div>
                  {/* /.col */}
                  <div className="col-md-2 col-sm-4 col-6">
                    <div className="info-box">
                      <span className="info-box-icon bg-success">
                        <i className="far fa-flag" />
                      </span>
                      <div className="info-box-content">
                        <span className="info-box-number">{TotalGroups}</span>
                        <span className="info-box-text">Total Groups</span>
                      </div>
                      {/* /.info-box-content */}
                    </div>
                    {/* /.info-box */}
                  </div>
                  <div className="col-md-2 col-sm-4 col-6">
                    <div className="info-box">
                      <span className="info-box-icon bg-success">
                        <i className="far fa-flag" />
                      </span>
                      <div className="info-box-content">
                        <span className="info-box-number">410</span>
                        <span className="info-box-text">Total Auctions</span>
                      </div>
                      {/* /.info-box-content */}
                    </div>
                    {/* /.info-box */}
                  </div>
                  <div className="col-md-2 col-sm-4 col-6">
                    <div className="info-box">
                      <span className="info-box-icon bg-danger">
                        <i className="far fa-star" />
                      </span>
                      <div className="info-box-content">
                        <span className="info-box-number">93,139</span>
                        <span className="info-box-text">
                          Total Fund Withdrawal
                        </span>
                      </div>
                      {/* /.info-box-content */}
                    </div>
                    {/* /.info-box */}
                  </div>
                  {/* /.col */}
                </div>
                <div className="row">
                  <div className="col-md-4 col-sm-12">
                    <TotalUserDonutChart />
                  </div>
                  <div className="col-md-8 col-sm-12">
                    <MonthlyAuctionLineChart />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 col-sm-12">
                    <DashboardTable />
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="schemes"
                role="tabpanel"
                aria-labelledby="schemes-tab"
              >
                <div className="row">
                  <div className="col-sm-12 col-md-12">
                    <SchemeManagmentTable />
                  </div>
                </div>
                {/* Schemes */}
              </div>

              <div
                className="tab-pane fade"
                id="groups"
                role="tabpanel"
                aria-labelledby="groups-tab"
              >
                {/* Groups */}

                <GroupManagementTable />
              </div>

              <div
                className="tab-pane fade"
                id="reports"
                role="tabpanel"
                aria-labelledby="reports-tab"
              >
                {/* Reports */}
                <ReportTable />
              </div>
              <div
                className="tab-pane fade"
                id="bidform"
                role="tabpanel"
                aria-labelledby="reports-tab"
              >
                {/* Reports */}
                <Bid />
              </div>
            </div>
          </div>
          {/* /.card */}
        </div>
      </div>
    </div>
  );
}
