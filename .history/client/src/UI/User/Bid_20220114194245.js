import React, { useState } from "react";
import axios from "axios";
export default function AddUser() {
  // id	idplans	user_id	fee	paid	won	created_at	updated_at	
  const [Scheme, setSchemeError] = useState(false);
  const [Fee, setFeeError] = useState(false);
  const [Paid, setPaidError] = useState(false);
  const [CreatedAt, setCreatedAtError] = useState(false);

  const onSubmit = async () => {
    if (Scheme === "") {
      setSchemeError(true);
    }
    if (Fee !== "") {
      setFeeError(true);
    }
    if (Paid === "") {
      setPaidError(true);
    }
    if (CreatedAt === "") {
      setCreatedAtError(true);
    }
   
    if (
      Scheme !== "" &&
      Fee !== "" &&
      Paid !== "" &&
      CreatedAt !== "" 
    ) {
      
      await axios
        .post("/api/bid", {
          Scheme: Scheme,
          Fee: Fee,
          Paid: Paid,
          CreatedAt: CreatedAt,
        })
        .then((response) => {
          console.log(response.data);
        });
    }
  };

  const [Scheme, setScheme] = useState("");
  const [Fee, setFee] = useState("");
  const [Paid, setPaid] = useState("");
  const [CreatedAt, setCreatedAt] = useState("");
  return (
    <div>
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <h3>Current Bid</h3>
        </div>


        <div className="col-sm-12 col-md-4">
          <label>Select Scheme</label>

          <button
            type="text"
            className="form-control"
            
            onChange={(e) => {
              setScheme(e.target.value);
            }}
          ></button>
          <span
            hidden={!SchemeError}
            style={{
              color: "red",
              fontSize: "11px",
            }}
          >
            Please provide a First Name
          </span>
        </div>
        <div className="col-sm-12 col-md-4">
          <label>Last Name</label>

          <input
            type="text"
            className="form-control"
            placeholder="Last  Name"
            onChange={(e) => {
              setUserLastName(e.target.value);
            }}
          />
          <span
            hidden={!UserLastNameError}
            style={{
              color: "red",
              fontSize: "11px",
            }}
          >
            Please provide a Last Name
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 col-md-4">
          <label>Cell Phone</label>
          <input
            type="text"
            className="form-control"
            placeholder="Cell Phone"
            onChange={(e) => {
              setUserCellPhone(e.target.value);
            }}
          />
          <span
            hidden={!UserCellPhoneError}
            style={{
              color: "red",
              fontSize: "11px",
            }}
          >
            Please provide a Cell Phone
          </span>
        </div>
        <div className="col-sm-6 col-md-4">
          <label>Alternate Contact</label>
          <input
            type="text"
            className="form-control"
            placeholder="Alternate Contact"
            onChange={(e) => {
              setUserAlternateContact(e.target.value);
            }}
          />
        </div>
        <div className="col-sm-12 col-md-4">
          <label>Email</label>
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
          />
        </div>


        <div className="col-sm-12 col-md-4">
          <div className="form-group">
            <label>Select Gender</label>
            <select
              className="form-control"
              onChange={(e) => {
                e.target.value === "select"
                  ? setUserGender("")
                  : setUserGender(e.target.value);
              }}
            >
              <option>select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <span
              hidden={!UserGenderError}
              style={{
                color: "red",
                fontSize: "11px",
              }}
            >
              Please provide a Gender
            </span>
          </div>
        </div>

        <div className="col-sm-12 col-md-8">
          <label>Address</label>

          <input
            type="text"
            className="form-control"
            placeholder="Address"
            onChange={(e) => {
              setUserAddress(e.target.value);
            }}
          />
          <span
            hidden={!UserAddressError}
            style={{
              color: "red",
              fontSize: "11px",
            }}
          >
            Please provide a Address
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-4">
          <div className="form-group">
            <label>Select Country</label>
            <select
              className="form-control"
              onChange={(e) => {
                e.target.value === "select"
                  ? setUserCountry("")
                  : setUserCountry(e.target.value);
              }}
            >
              <option>select</option>
              <option>India</option>
              <option>Other</option>
            </select>
            <span
              hidden={!UserCountryError}
              style={{
                color: "red",
                fontSize: "11px",
              }}
            >
              Please provide a Country
            </span>
          </div>
        </div>
        <div className="col-sm-12 col-md-4">
          <div className="form-group">
            <label>State</label>
            <select
              className="form-control"
              onChange={(e) => {
                e.target.value === "select"
                  ? setUserState("")
                  : setUserState(e.target.value);
              }}
            >
              <option>select</option>
              <option>M.P.</option>
              <option>Other</option>
            </select>
            <span
              hidden={!UserStateError}
              style={{
                color: "red",
                fontSize: "11px",
              }}
            >
              Please provide a State
            </span>
          </div>
        </div>
        <div className="col-sm-12 col-md-2">
          <div className="form-group">
            <label>City</label>
            <select
              className="form-control"
              onChange={(e) => {
                e.target.value === "select"
                  ? setUserCity("")
                  : setUserCity(e.target.value);
              }}
            >
              <option>select</option>
              <option>Indore</option>
              <option>Other</option>
            </select>
            <span
              hidden={!UserCityError}
              style={{
                color: "red",
                fontSize: "11px",
              }}
            >
              Please provide a City
            </span>
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
                setUserZipcode(e.target.value);
              }}
            />
            <span
              hidden={!UserZipcodeError}
              style={{
                color: "red",
                fontSize: "11px",
              }}
            >
              Please provide a Zipcode
            </span>
          </div>
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
                e.target.value === "select"
                  ? setUserStatus("")
                  : setUserStatus(e.target.value);
              }}
            >
              <option>select</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Verified</option>
            </select>
            <span
              hidden={!UserStatusError}
              style={{
                color: "red",
                fontSize: "11px",
              }}
            >
              Please provide a Status
            </span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-4">
          <button className="btn btn-block btn-secondary" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
