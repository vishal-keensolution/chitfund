import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import NotificationManagementTable from "./NotificationManagementTable";
import UpperNavbar from "./UpperNavbar";
import RedirectNavbar from "./RedirectNavbar";
export default function NotificationManagement() {
  var history = useHistory();

  const [loginStatus, setLoginStatus] = useState("");

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

  const [NotificationNotificationType, setNotificationNotificationType] =
    useState("");
  const [NotificationNotificationName, setNotificationNotificationName] =
    useState("");
  const [NotificationDetailMessage, setNotificationDetailMessage] =
    useState("");
  const [NotificationMedium, setNotificationMedium] = useState("");
  const [NotificationStatus, setNotificationStatus] = useState("");

  const addNotification = async () => {
    await axios
      .post("/api/addNotification", {
        NotificationNotificationType: NotificationNotificationType,
        NotificationNotificationName: NotificationNotificationName,
        NotificationDetailMessage: NotificationDetailMessage,
        NotificationMedium: NotificationMedium,
        NotificationStatus: NotificationStatus,
      })
      .then((response) => {
        console.log(response.data);
      });
  };
  return (
    <div className="sidebar-collapse">
      <RedirectNavbar />
      <div className="card-body">
        <div className="row">
          <div className="col-sm-12 col-md-12">
            <NotificationManagementTable />
          </div>
        </div>
        <div className="row">
          <div className="row">
            <div className="col-md-3">
              <button
                type="button"
                className="btn btn-secondary"
                data-toggle="modal"
                data-target="#modal-lg"
              >
                Add Notification
              </button>
            </div>
          </div>
          <div className="modal fade" id="modal-lg">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Add Notification</h4>
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
                  <div>
                    <div className="row">
                      <div className="col-sm-12 col-md-6">
                        <div className="form-group">
                          <label>Notification Type(Special/Regular)</label>
                          <select
                            className="form-control"
                            onChange={(e) => {
                              setNotificationNotificationType(e.target.value);
                            }}
                          >
                            <option>select</option>
                            <option>Special</option>
                            <option>Regular</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12 col-md-12">
                        <div className="form-group">
                          <label>Notification Name</label>

                          <input
                            type="text"
                            className="form-control"
                            placeholder="Notification Name"
                            onChange={(e) => {
                              setNotificationNotificationName(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12 col-md-12">
                        <div className="form-group">
                          <label>Detail Message</label>
                          <textarea
                            className="form-control"
                            rows="3"
                            placeholder="Detail Message"
                            onChange={(e) => {
                              setNotificationDetailMessage(e.target.value);
                            }}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12 col-md-6">
                        <div className="form-group">
                          <label>Select Medium (SMS/Email)</label>
                          <select
                            className="form-control"
                            onChange={(e) => {
                              setNotificationMedium(e.target.value);
                            }}
                          >
                            <option>select</option>
                            <option>SMS</option>
                            <option>Email</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <hr size="8" width="100%" color="black" />
                    </div>
                    <div className="row">
                      <div className="col-sm-12 col-md-6">
                        <div className="form-group">
                          <label>Select Staus</label>
                          <select
                            className="form-control"
                            onChange={(e) => {
                              setNotificationStatus(e.target.value);
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
                      <div className="col-sm-12 col-md-6">
                        <button
                          className="btn btn-block btn-secondary"
                          onClick={addNotification}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /.modal-content */}
        </div>
        {/* /.modal-dialog */}
      </div>
    </div>
  );
}
