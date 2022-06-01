import React, { useState } from "react";
import RedirectNavbar from "./RedirectNavbar";
import { Card, Button, Row, Col, Toast } from "react-bootstrap";
import axios from "axios";

export default function ChangePassword() {
  const [show, setShow] = useState(false);

  function DisplayMessage({ msg }) {
    return (
      <Row>
        <Col xs={6}>
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={3000}
            bg={msg === "Password Update" ? "success" : "warning"}
            autohide
          >
            <Toast.Body>{msg}</Toast.Body>
          </Toast>
        </Col>
      </Row>
    );
  }

  const [OldPassword, setOldPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState();
  const changePassword = async () => {
    console.log("\n", OldPassword, "\n", NewPassword, "\n", ConfirmPassword);
    axios
      .post("/api/changePassword", {
        oldPassword: OldPassword,
        newPassword: NewPassword,
      })
      .then((response) => {
        setMsg(response.data.message);
      });
  };
  return (
    <div>
      <RedirectNavbar />{" "}
      <div className="row" style={{ placeContent: "center" }}>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Change Password</Card.Title>
            <Card.Text>
              <label>Old Password</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
              />
              <label>New Password</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
              <label>Confirm Password</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </Card.Text>
            <Button
              variant="secondary"
              onClick={(e) => {
                changePassword();
                setShow(true);
              }}
            >
              Submit
            </Button>
          </Card.Body>
        </Card>
        <DisplayMessage msg={msg} />
      </div>
    </div>
  );
}
