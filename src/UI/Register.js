import React, { useState } from "react";
import axios from "axios";
export default function Register() {
  /*   const [seconds, setSeconds] = React.useState(10);
   */
  /*   React.useEffect(() => {
    console.log(seconds);
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds("BOOOOM!");
    }
  });
 */
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [emptyfullname, setEmptyfullname] = useState(false);
  const [emptyusername, setEmptyusername] = useState(false);
  const [emptyaddress, setEmptyaddress] = useState(false);
  const [emptypassword, setEmptypassword] = useState(false);
  const [emptyconfirmpassword, setEmptyconfirmpassword] = useState(false);
  const [emptycontact, setEmptycontact] = useState(false);
  const [registersuccess, setRegistersuccess] = useState("");
  const [accountalreadyexist, setAccountalreadyexist] = useState("");

  const onSubmit = (event) => {
    setRegistersuccess(false);
    setAccountalreadyexist(false);

    if (fullname === "") {
      setEmptyfullname(true);
    }
    if (fullname !== "") {
      setEmptyfullname(false);
    }
    if (email === "") {
      setEmptyusername(true);
    }
    if (email !== "") {
      setEmptyusername(false);
    }
    if (password === "") {
      setEmptypassword(true);
    }
    if (password !== "") {
      setEmptypassword(false);
    }
    if (confirmpassword === "") {
      setEmptyconfirmpassword(true);
    }
    if (confirmpassword !== "") {
      setEmptyconfirmpassword(false);
    }
    if (contact === "") {
      setEmptycontact(true);
    }
    if (contact !== "") {
      setEmptycontact(false);
    }
    if (address === "") {
      setEmptyaddress(true);
    }
    if (address !== "") {
      setEmptyaddress(false);
    }

    if (password === confirmpassword && password !== "") {
      axios
        .post("/api/register", {
          fullname: fullname,
          email: email,
          password: password,
          contact: contact,
          address: address,
        })
        .then((response) => {
          if (response.data.message === "User added") {
            setRegistersuccess(true);
          } else {
            setAccountalreadyexist(true);
          }
        });
    }
    event.preventDefault();
  };

  return (
    <div className="hold-transition register-page">
      <div
        hidden={!registersuccess}
        className="alert alert-success alert-dismissible"
      >
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-hidden="true"
        >
          &times;
        </button>
        <h5>
          <i className="icon fas fa-check"></i> Alert!
        </h5>
        Account Registration Successful.
      </div>
      <div
        hidden={!accountalreadyexist}
        className="alert alert-danger alert-dismissible"
      >
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-hidden="true"
        >
          &times;
        </button>
        <h5>
          <i className="icon fas fa-check"></i> Alert!
        </h5>
        Account Already Exists.
      </div>
      <div style={{ width: "480px" }} className="register-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <a href="../../index2.html" className="h1">
              <b>Moneypool</b>
            </a>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Register a new membership</p>
            <form>
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full name"
                      onChange={(e) => {
                        setFullname(e.target.value);
                      }}
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-user" />
                      </div>
                    </div>
                  </div>
                  <span
                    hidden={!emptyfullname}
                    style={{
                      color: "red",
                      position: "absolute",
                      marginTop: "-17px",
                      marginLeft: "10px",
                      fontSize: "11px",
                    }}
                  >
                    Please provide a fullname
                  </span>
                </div>
                <div className="col-sm-12 col-md-6">
                  <div className="input-group mb-3">
                    <input
                      className="form-control"
                      placeholder="Contact No."
                      onChange={(e) => {
                        setContact(e.target.value);
                      }}
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-lock" />
                      </div>
                    </div>
                  </div>
                  <span
                    hidden={!emptycontact}
                    style={{
                      color: "red",
                      position: "absolute",
                      marginTop: "-17px",
                      marginLeft: "10px",
                      fontSize: "11px",
                    }}
                  >
                    Contact is left empty
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 col-md-12">
                  <div className="input-group mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-envelope" />
                      </div>
                    </div>
                  </div>
                  <span
                    hidden={!emptyusername}
                    style={{
                      color: "red",
                      position: "absolute",
                      marginTop: "-17px",
                      marginLeft: "10px",
                      fontSize: "11px",
                    }}
                  >
                    Please provide a Username
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 col-md-12">
                  <div className="input-group mb-3">
                    <input
                      className="form-control"
                      placeholder="Address"
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-envelope" />
                      </div>
                    </div>
                  </div>
                  <span
                    hidden={!emptyaddress}
                    style={{
                      color: "red",
                      position: "absolute",
                      marginTop: "-17px",
                      marginLeft: "10px",
                      fontSize: "11px",
                    }}
                  >
                    Please provide a Address
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <div className="input-group mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-lock" />
                      </div>
                    </div>
                  </div>
                  <span
                    hidden={!emptypassword}
                    style={{
                      color: "red",
                      position: "absolute",
                      marginTop: "-17px",
                      marginLeft: "10px",
                      fontSize: "11px",
                    }}
                  >
                    Please provide a Password
                  </span>
                </div>
                <div className="col-sm-12 col-md-6">
                  <div className="input-group mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Retype password"
                      onChange={(e) => {
                        setConfirmpassword(e.target.value);
                      }}
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-lock" />
                      </div>
                    </div>
                  </div>
                  <span
                    hidden={!emptyconfirmpassword}
                    style={{
                      color: "red",
                      position: "absolute",
                      marginTop: "-17px",
                      marginLeft: "10px",
                      fontSize: "11px",
                    }}
                  >
                    Password does not match
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="terms"
                      defaultValue="agree"
                    />
                    <label htmlFor="agreeTerms">
                      I agree to the <a href="/">terms</a>
                    </label>
                  </div>
                </div>
                {/* /.col */}
                <div className="col-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={onSubmit}
                  >
                    Register
                  </button>
                </div>
                {/* /.col */}
              </div>
            </form>
            <div className="social-auth-links text-center">
              <a href="/" className="btn btn-block btn-primary">
                <i className="fab fa-facebook mr-2" />
                Sign up using Facebook
              </a>
              <a href="/" className="btn btn-block btn-danger">
                <i className="fab fa-google-plus mr-2" />
                Sign up using Google+
              </a>
            </div>
            <a href="/login" className="text-center">
              I already have a membership
            </a>
          </div>
          {/* /.form-box */}
        </div>
        {/* /.card */}
      </div>
    </div>
  );
}
