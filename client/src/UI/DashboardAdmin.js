import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import TotalUserDonutChart from "./TotalUserDonutChart";
import MonthlyAuctionLineChart from "./MonthlyAuctionLineChart";
import DashboardTable from "./DashboardTable";
import UserVerificationTable from "./UserVerificationTable";
import SchemeManagmentTable from "./SchemeManagementTable";
import ReportTable from "./ReportTable";
import GroupManagementTable from "./GroupManagementTable";
import UpperNavbar from "./UpperNavbar";
import Navbar from "./Navbar";
import AddUser from "./AddUser";
import AddNewScheme from "./AddNewScheme";
/* import AssignForm from "./AssignForm";
 */
export default function DashboardAdmin() {
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

  const AddGroup = async () => {
    await axios
      .post("/api/addGroup", {
        GroupGroupName: GroupGroupName,
        GroupContactPersonName: GroupContactPersonName,
        GroupCellPhone: GroupCellPhone,
        GroupEmail: GroupEmail,
        GroupMaxAllowedUsers: GroupMaxAllowedUsers,
        GroupAmountPerUser: GroupAmountPerUser,
        GroupTerms: GroupTerms,
        GroupAddress: GroupAddress,
        GroupCountry: GroupCountry,
        GroupState: GroupState,
        GroupCity: GroupCity,
        GroupZipcode: GroupZipcode,
        GroupStatus: GroupStatus,
      })
      .then((response) => {
        console.log("response : ", response);
      });
  };

  var history = useHistory();
  const [TotalUsers, setTotalUsers] = useState();
  const [TotalSchemes, setTotalSchemes] = useState();
  const [TotalGroups, setTotalGroups] = useState();

  useEffect(async () => {
    await axios.get("/api/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user.fullname);
        localStorage.setItem('userid',response.data.user.userid);
        localStorage.setItem('pic',response.data.user.pic);
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
                style={{ paddingLeft: "10%", paddingRight: "10%" }}
                className="tab-pane fade"
                id="users"
                role="tabpanel"
                aria-labelledby="users-tab"
              >
                <AddUser />
              </div>
              <div
                className="tab-pane fade"
                id="verifications"
                role="tabpanel"
                aria-labelledby="verifications-tab"
              >
                {/* verifications */}
                <UserVerificationTable />
              </div>
              
              <div
                className="tab-pane fade"
                id="schemes"
                role="tabpanel"
                aria-labelledby="schemes-tab"
              >
                <AddNewScheme />
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-toggle="modal"
                  data-target="#modal-lg-scheme"
                >
                  Add a Scheme
                </button>

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
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-toggle="modal"
                  data-target="#modal-lg-group"
                >
                  Add a Group
                </button>
                <div className="modal fade" id="modal-lg-group">
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h4 className="modal-title">Add a Group</h4>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="row">
                          <div className="col-sm-12 col-md-4">
                            <div className="form-group">
                              <label>Group Name</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Group Name"
                                onChange={(e) => {
                                  setGroupGroupName(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-4">
                            <div className="form-group">
                              <label>Contact Person Name</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Contact Person Name"
                                onChange={(e) => {
                                  setGroupContactPersonName(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-4">
                            <div className="form-group">
                              <label>Cell Phone</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Cell Phone"
                                onChange={(e) => {
                                  setGroupCellPhone(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12 col-md-4">
                            <div className="form-group">
                              <label>Email</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                onChange={(e) => {
                                  setGroupEmail(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-4">
                            <div className="form-group">
                              <label>Max Allowed Users</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Max Allowed Users"
                                onChange={(e) => {
                                  setGroupMaxAllowedUsers(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-4">
                            <div className="form-group">
                              <label>Amount per User</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Amount per User"
                                onChange={(e) => {
                                  setGroupAmountPerUser(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12 col-md-4">
                            <div className="form-group">
                              <label>Select Terms (Weekly/Monthly)</label>
                              <select
                                className="form-control"
                                onChange={(e) => {
                                  setGroupTerms(e.target.value);
                                }}
                              >
                                <option>select</option>
                                <option>Weekly</option>
                                <option>Monthly</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-8">
                            <div className="form-group">
                              <label>Address</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Address"
                                onChange={(e) => {
                                  setGroupAddress(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12 col-md-4">
                            <div className="form-group">
                              <label>Select Country</label>
                              <select
                                className="form-control"
                                onChange={(e) => {
                                  setGroupCountry(e.target.value);
                                }}
                              >
                                <option>select</option>
                                <option>India</option>
                                <option>Sri Lanka</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-4">
                            <div className="form-group">
                              <label>State</label>
                              <select
                                className="form-control"
                                onChange={(e) => {
                                  setGroupState(e.target.value);
                                }}
                              >
                                <option>select</option>
                                <option>M.P.</option>
                                <option>U.P.</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-2">
                            <div className="form-group">
                              <label>City</label>
                              <select
                                className="form-control"
                                onChange={(e) => {
                                  setGroupCity(e.target.value);
                                }}
                              >
                                <option>select</option>
                                <option>Indore</option>
                                <option>Bhopal</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-2">
                            <div className="form-group">
                              <label>Zipcode</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Zipcode"
                                onChange={(e) => {
                                  setGroupZipcode(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <hr size="8" width="100%" color="black" />
                        </div>
                        <div className="row">
                          <div className="col-sm-12 col-md-4">
                            <div className="form-group">
                              <label>
                                Select Status (Active/Inactive/Verified)
                              </label>
                              <select
                                className="form-control"
                                onChange={(e) => {
                                  setGroupStatus(e.target.value);
                                }}
                              >
                                <option>select</option>
                                <option>Active</option>
                                <option>Inactive</option>
                                <option>Verified</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12 col-md-4">
                            <button
                              className="btn btn-block btn-secondary"
                              onClick={AddGroup}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /.modal-content */}
                  </div>
                  {/* /.modal-dialog */}
                </div>

                <GroupManagementTable />
              </div>
              <div
                className="tab-pane fade"
                id="collections"
                role="tabpanel"
                aria-labelledby="collections-tab"
              >
                Collections
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
            </div>
          </div>
          {/* /.card */}
        </div>
      </div>
    </div>
  );
}
