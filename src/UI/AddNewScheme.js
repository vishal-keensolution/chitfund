import React, { useState } from "react";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
export default function AddNewScheme() {
  const [SchemeSchemeName, setSchemeSchemeName] = useState("");
  const [SchemeContactPerson, setSchemeContactPerson] = useState("");
  const [SchemeCellPhone, setSchemeCellPhone] = useState("");
  const [SchemeEmail, setSchemeEmail] = useState();
  const [SchemeMaxAllowedUser, setSchemeMaxAllowedUser] = useState(0);
  const [SchemeAmountPerUser, setSchemeAmountPeruser] = useState(0);
  const [SchemeTerm, setSchemeTerm] = useState("");
  const [SchemeAddress, setSchemeAddress] = useState("");
  const [SchemeCountry, setSchemeCountry] = useState("");
  const [SchemeState, setSchemeState] = useState("");
  const [SchemeCity, setSchemeCity] = useState("");
  const [SchemeZipcode, setSchemeZipcode] = useState("");
  const [SchemeDescription, setSchemeDescription] = useState("");
  const [SchemeStartDate, setSchemeStartDate] = useState("");
  const [SchemeEndDate, setSchemeEndDate] = useState("");
  const [SchemeStatus, setSchemeStatus] = useState("");

  const AddScheme = async () => {
    await axios
      .post("/api/addScheme", {
        SchemeSchemeName: SchemeSchemeName,
        SchemeContactPerson: SchemeContactPerson,
        SchemeCellPhone: SchemeCellPhone,
        SchemeEmail: SchemeEmail,
        SchemeMaxAllowedUser: SchemeMaxAllowedUser,
        SchemeAmountPerUser: SchemeAmountPerUser,
        SchemeTerm: SchemeTerm,
        SchemeAddress: SchemeAddress,
        SchemeCountry: SchemeCountry,
        SchemeState: SchemeState,
        SchemeCity: SchemeCity,
        SchemeZipcode: SchemeZipcode,
        SchemeDescription: SchemeDescription,
        SchemeStartDate: SchemeStartDate,
        SchemeEndDate: SchemeEndDate,
        SchemeStatus: SchemeStatus,
      })
      .then((response) => {
        console.log("response : ", response);
      });
  };
  return (
    <div>
      <div className="modal fade" id="modal-lg-scheme">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add a Scheme</h4>
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
                    <label>Scheme Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Scheme Name"
                      onChange={(e) => {
                        setSchemeSchemeName(e.target.value);
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
                        setSchemeContactPerson(e.target.value);
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
                        setSchemeCellPhone(e.target.value);
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
                        setSchemeEmail(e.target.value);
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
                        setSchemeMaxAllowedUser(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-md-4">
                  <div className="form-group">
                    <label>Amount Per User</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Amount Per User"
                      onChange={(e) => {
                        setSchemeAmountPeruser(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12 col-md-4">
                  <div className="form-group">
                    <label>Select Term (Weekly/Monthly)</label>
                    <select
                      className="form-control"
                      onChange={(e) => {
                        setSchemeTerm(e.target.value);
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
                        setSchemeAddress(e.target.value);
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
                        setSchemeCountry(e.target.value);
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
                        setSchemeState(e.target.value);
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
                        setSchemeCity(e.target.value);
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
                        setSchemeZipcode(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <hr size="8" width="100%" color="black" />
              </div>
              <div className="row">
                <div className="col-sm-12 col-md-12">
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      rows="3"
                      className="form-control"
                      placeholder="Description"
                      onChange={(e) => {
                        setSchemeDescription(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 col-md-4">
                  <div className="form-group">
                    <label>Select Start Date</label>
                    <Dropdown>
                      <Dropdown.Toggle
                        style={{ background: "transparent", color: "grey" }}
                        variant="success"
                        id="dropdown-basic"
                      >
                        {SchemeStartDate === ""
                          ? "Start Date"
                          : SchemeStartDate}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>
                          <Calendar
                            onChange={(e) => {
                              setSchemeStartDate(e.toDateString());
                            }}
                          />
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <div className="col-sm-12 col-md-4">
                  <div className="form-group">
                    <label>Select End Date</label>
                    <Dropdown>
                      <Dropdown.Toggle
                        style={{ background: "transparent", color: "grey" }}
                        variant="success"
                        id="dropdown-basic"
                      >
                        {SchemeEndDate === "" ? "End Date" : SchemeEndDate}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>
                          <Calendar
                            onChange={(e) => {
                              setSchemeEndDate(e.toDateString());
                            }}
                          />
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="form-group">
                  <label>Document Required</label>
                </div>
              </div>
              <div className="row">
                <div className="col sm-6 col-md-1.5">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label">Aadhar Card</label>
                  </div>
                </div>
                <div className="col sm-6 col-md-1.5">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label">Pan Card</label>
                  </div>
                </div>
                <div className="col sm-6 col-md-1.5">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label">Driving Licence</label>
                  </div>
                </div>
                <div className="col sm-6 col-md-1.5">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label">Passport</label>
                  </div>
                </div>
                <div className="col sm-6 col-md-1.5">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label">Voter ID</label>
                  </div>
                </div>
                <div className="col sm-6 col-md-1.5">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label">Other Gov. ID </label>
                  </div>
                </div>
                <div className="col-sm-6 col-md-2">
                  <input type="text" className="form-control" placeholder="" />
                </div>
              </div>
              <div className="row">
                <hr size="8" width="100%" color="black" />
              </div>
              <div className="row">
                <div className="col-sm-12 col-md-4">
                  <div className="form-group">
                    <label>Select Status (Active/Inactive/Verified)</label>
                    <select
                      className="form-control"
                      onChange={(e) => {
                        setSchemeStatus(e.target.value);
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
                    onClick={AddScheme}
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
      {/* /.modal */}
    </div>
  );
}
