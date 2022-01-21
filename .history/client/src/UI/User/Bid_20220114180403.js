import React, { useState } from "react";
import axios from "axios";
export default function AddUser() {
  const [Scheme, setScheme] = useState(false);
  const [UserFirstNameError, setUserFirstNameError] = useState(false);
  const [UserLastNameError, setUserLastNameError] = useState(false);
  const [UserCellPhoneError, setUserCellPhoneError] = useState(false);
  const [UserGenderError, setUserGenderError] = useState(false);
  const [UserAddressError, setUserAddressError] = useState(false);
  const [UserCountryError, setUserCountryError] = useState(false);
  const [UserStateError, setUserStateError] = useState(false);
  const [UserCityError, setUserCityError] = useState(false);
  const [UserZipcodeError, setUserZipcodeError] = useState(false);
  const [UserStatusError, setUserStatusError] = useState(false);

  const onSubmit = async () => {
    if (UserSalutation === "") {
      setUserSalutationError(true);
    }
    if (UserSalutation !== "") {
      setUserSalutationError(false);
    }
    if (UserFirstName === "") {
      setUserFirstNameError(true);
    }
    if (UserFirstName !== "") {
      setUserFirstNameError(false);
    }
    if (UserLastName === "") {
      setUserLastNameError(true);
    }
    if (UserLastName !== "") {
      setUserLastNameError(false);
    }
    if (UserCellPhone === "") {
      setUserCellPhoneError(true);
    }
    if (UserCellPhone !== "") {
      setUserCellPhoneError(false);
    }
    if (UserGender === "") {
      setUserGenderError(true);
    }
    if (UserGender !== "") {
      setUserGenderError(false);
    }
    if (UserAddress === "") {
      setUserAddressError(true);
    }
    if (UserAddress !== "") {
      setUserAddressError(false);
    }
    if (UserCountry === "") {
      setUserCountryError(true);
    }
    if (UserCountry !== "") {
      setUserCountryError(false);
    }
    if (UserState === "") {
      setUserStateError(true);
    }
    if (UserState !== "") {
      setUserStateError(false);
    }
    if (UserCity === "") {
      setUserCityError(true);
    }
    if (UserCity !== "") {
      setUserCityError(false);
    }
    if (UserZipcode === "") {
      setUserZipcodeError(true);
    }
    if (UserZipcode !== "") {
      setUserZipcodeError(false);
    }
    if (UserStatus === "") {
      setUserStatusError(true);
    }
    if (UserStatus !== "") {
      setUserStatusError(false);
    }
    if (
      UserSalutation !== "" &&
      UserFirstName !== "" &&
      UserLastName !== "" &&
      UserCellPhone !== "" &&
      UserGender !== "" &&
      UserAddress !== "" &&
      UserCountry !== "" &&
      UserState !== "" &&
      UserCity !== "" &&
      UserZipcode !== "" &&
      UserStatus !== ""
    ) {
      /* console.log(
        UserSalutation,
        "\n",
        UserFirstName,
        "\n",
        UserLastName,
        "\n",
        UserCellPhone,
        "\n",
        UserGender,
        "\n",
        UserAddress,
        "\n",
        UserCountry,
        "\n",
        UserState,
        "\n",
        UserCity,
        "\n",
        UserZipcode,
        "\n",
        UserStatus
      ); */
      await axios
        .post("/api/addCompanyUser", {
          UserSalutation: UserSalutation,
          UserFirstName: UserFirstName,
          UserLastName: UserLastName,
          UserCellPhone: UserCellPhone,
          UserAlternateContact: UserAlternateContact,
          UserEmail: UserEmail,
          UserGender: UserGender,
          UserAddress: UserAddress,
          UserCountry: UserCountry,
          UserState: UserState,
          UserCity: UserCity,
          UserZipcode: UserZipcode,
          UserStatus: UserStatus,
        })
        .then((response) => {
          console.log(response.data);
        });
    }
  };

  const [UserSalutation, setUserSalutation] = useState("");
  const [UserFirstName, setUserFirstName] = useState("");
  const [UserLastName, setUserLastName] = useState("");
  const [UserCellPhone, setUserCellPhone] = useState("");
  const [UserAlternateContact, setUserAlternateContact] = useState("");
  const [UserEmail, setUserEmail] = useState("");
  const [UserGender, setUserGender] = useState("");
  const [UserAddress, setUserAddress] = useState("");
  const [UserCountry, setUserCountry] = useState("");
  const [UserState, setUserState] = useState("");
  const [UserCity, setUserCity] = useState("");
  const [UserZipcode, setUserZipcode] = useState("");
  const [UserStatus, setUserStatus] = useState("");
  return (
    <div>
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <h3>Add New User</h3>
        </div>
        <div className="col-sm-12 col-md-4">
          <div id="salutation" className="form-group">
            <label>MR/MS/MSR</label>
            <select
              className="form-control"
              onChange={(e) => {
                e.target.value === "select"
                  ? setUserSalutation("")
                  : setUserSalutation(e.target.value);
              }}
            >
              <option>select</option>
              <option>MR</option>
              <option>MS</option>
              <option>MSR</option>
            </select>
            <span
              hidden={!UserSalutationError}
              style={{
                color: "red",
                fontSize: "11px",
              }}
            >
              Please provide a Input
            </span>
          </div>
        </div>

        <div className="col-sm-12 col-md-4">
          <label>First Name</label>

          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            onChange={(e) => {
              setUserFirstName(e.target.value);
            }}
          />
          <span
            hidden={!UserFirstNameError}
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
