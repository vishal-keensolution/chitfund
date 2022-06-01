import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Login() {
  var history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emptyusername, setEmptyusername] = useState(false);
  const [emptypassword, setEmptypassword] = useState(false);

  const onSubmit = (event) => {
    if (email === "") {
      setEmptyusername(true);
      event.preventDefault();
    }
    if (email !== "") {
      setEmptyusername(false);
      event.preventDefault();
    }
    if (password === "") {
      setEmptypassword(true);
      event.preventDefault();
    }
    if (password !== "") {
      setEmptypassword(false);
      event.preventDefault();
    }
    if (password !== "" && email !== "") {
      axios
        .post("/api/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          console.log("response : ",response.data.user.role_id);
          if (response.data.message === "user exists") {
            // history.push("/dashboard");
            // window.location.reload();
            if (response.data.user.role_id === 1)
            {
              history.push("/dashboarduser");
              window.location.reload();
            }
            else if(response.data.user.role_id === 2)
            {
              history.push("/dashboard");
              window.location.reload();
            }
            else if(response.data.user.role_id === 3)
            {
              history.push("/dashboardadmin");
              window.location.reload();
            }else{console.log("User Type Invalid");}
          } else {
            console.log("failed attempt");
          }
        });
    }
  };

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        {/* /.login-logo */}
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <a href="/" className="h1">
              <b>Moneypool</b>
            </a>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            <form>
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
                    Please provide a usename
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 col-md-12">
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
                    Please provide a password
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Remember Me</label>
                  </div>
                </div>
                {/* /.col */}
                <div className="col-4">
                  <button
                    type="submit"
                    onClick={onSubmit}
                    className="btn btn-primary btn-block"
                  >
                    Sign In
                  </button>
                </div>
                {/* /.col */}
              </div>
            </form>
            <div className="social-auth-links text-center mt-2 mb-3">
              <a href="/" className="btn btn-block btn-primary">
                <i className="fab fa-facebook mr-2" /> Sign in using Facebook
              </a>
              <a href="/" className="btn btn-block btn-danger">
                <i className="fab fa-google-plus mr-2" /> Sign in using Google+
              </a>
            </div>
            {/* /.social-auth-links */}
            <p className="mb-1">
              <a href="forgot-password.html">I forgot my password</a>
            </p>
            <p className="mb-0">
              <a href="/register" className="text-center">
                Register a new membership
              </a>
            </p>
          </div>
          {/* /.card-body */}
        </div>
        {/* /.card */}
      </div>
    </div>
  );
}
