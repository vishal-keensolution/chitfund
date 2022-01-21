import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import TaxManagementTable from "./TaxManagementTable";
/* import Navbar from "./Navbar";
import UpperNavbar from "./UpperNavbar"; */
import RedirectNavbar from "./RedirectNavbar";
import Calendar from "react-calendar";
import { Dropdown } from "react-bootstrap";
import "react-calendar/dist/Calendar.css";

export default function TaxManagement() {
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

  const [TaxTaxType, setTaxTaxType] = useState("");
  const [TaxTaxName, setTaxTaxName] = useState("");
  const [TaxStartDate, setTaxStartDate] = useState("");
  const [TaxEndDate, setTaxEndDate] = useState("");
  const [TaxIncExc, setTaxIncExc] = useState("");
  const [TaxTaxRate, setTaxTaxRate] = useState("");
  const [TaxStatus, setTaxStatus] = useState("");
  const AddTax = async () => {
    await axios
      .post("/api/addTax", {
        TaxTaxType: TaxTaxType,
        TaxTaxName: TaxTaxName,
        TaxStartDate: TaxStartDate,
        TaxEndDate: TaxEndDate,
        TaxIncExc: TaxIncExc,
        TaxTaxRate: TaxTaxRate,
        TaxStatus: TaxStatus,
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
            <TaxManagementTable />
          </div>
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          data-toggle="modal"
          data-target="#modal-lg"
        >
          Add Tax
        </button>
        <div className="row">
          <div className="modal fade" id="modal-lg">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Add Tax</h4>
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
                          <label>Tax Type(Fixed/Percentage)</label>
                          <select
                            className="form-control"
                            onChange={(e) => {
                              setTaxTaxType(e.target.value);
                            }}
                          >
                            <option>select</option>
                            <option>Fixed</option>
                            <option>Percentage</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-sm-12 col-md-6">
                        <label>Tax Name</label>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Tax Name"
                          onChange={(e) => {
                            setTaxTaxName(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12 col-md-3">
                        <label>Start Date</label>
                        <Dropdown>
                          <Dropdown.Toggle
                            style={{ background: "transparent", color: "grey" }}
                            variant="success"
                            id="dropdown-basic"
                          >
                            {TaxStartDate === "" ? "Start Date" : TaxStartDate}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item>
                              <Calendar
                                onChange={(e) => {
                                  setTaxStartDate(e.toDateString());
                                }}
                              />
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div className="col-sm-12 col-md-3">
                        <label>End Date</label>

                        <Dropdown>
                          <Dropdown.Toggle
                            style={{ background: "transparent", color: "grey" }}
                            variant="success"
                            id="dropdown-basic"
                          >
                            {TaxEndDate === "" ? "End Date" : TaxEndDate}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item>
                              <Calendar
                                onChange={(e) => {
                                  setTaxEndDate(e.toDateString());
                                }}
                              />
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>

                      <div className="col-sm-12 col-md-3">
                        <label>Tax Rate</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Tax Rate"
                          onChange={(e) => {
                            setTaxTaxRate(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-sm-12 col-md-3">
                        <label>Including/Excluding</label>
                        <select
                          className="form-control"
                          onChange={(e) => {
                            setTaxIncExc(e.target.value);
                          }}
                        >
                          <option>select</option>
                          <option>Inclusive</option>
                          <option>Exclusive</option>
                        </select>
                      </div>
                    </div>
                    <div className="row">
                      <hr size="8" width="100%" color="black" />
                    </div>
                    <div className="row">
                      <div className="col-sm-12 col-md-3">
                        <div className="form-group">
                          <label>Select Status</label>
                          <select
                            className="form-control"
                            onChange={(e) => {
                              setTaxStatus(e.target.value);
                            }}
                          >
                            <option>select</option>
                            <option>Active</option>
                            <option>Inactive</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12 col-md-3">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={AddTax}
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
