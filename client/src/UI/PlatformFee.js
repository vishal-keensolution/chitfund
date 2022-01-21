import React from "react";
import Navbar from "./Navbar";
import RedirectNavbar from "./RedirectNavbar";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function PlatformFee() {
  return (
    <div>
      <RedirectNavbar />
      <div className="row" style={{ placeContent: "center" }}>
        <Card
          className="text-center"
          style={{ width: "18rem", marginRight: "10px" }}
        >
          <Card.Body>
            <Card.Text>
              <span>
                <h5>₹ 5000</h5>
              </span>
              <span>
                <h5>Basic</h5>
              </span>
              <br />
              <p>10 Users</p>
              <p>Feature one</p>
              <p>Feature two</p>
              <p>Feature three</p>
              <p>Feature four</p>
              <p>Feature five</p>
              <p>Feature six</p>
              <p>Feature seven</p>
            </Card.Text>
            <Button variant="secondary">Current Plan</Button>
          </Card.Body>
        </Card>
        <Card
          className="text-center"
          style={{ width: "18rem", marginRight: "10px" }}
        >
          <Card.Body>
            <Card.Text>
              <span>
                <h5>₹ 9999.0</h5>
              </span>
              <span>
                <h5>Standard</h5>
              </span>
              <br />
              <p>50 Users</p>
              <p>Feature one</p>
              <p>Feature two</p>
              <p>Feature three</p>
              <p>Feature four</p>
              <p>Feature five</p>
              <p>Feature six</p>
              <p>Feature seven</p>
            </Card.Text>
            <Button variant="secondary">Upgrade Plan</Button>
          </Card.Body>
        </Card>
        <Card
          className="text-center"
          style={{ width: "18rem", marginRight: "10px" }}
        >
          <Card.Body>
            <Card.Text>
              <span>
                <h5>₹ 19900.00</h5>
              </span>
              <span>
                <h5>Enterprise</h5>
              </span>
              <br />
              <p>unlimited Users</p>
              <p>Feature one</p>
              <p>Feature two</p>
              <p>Feature three</p>
              <p>Feature four</p>
              <p>Feature five</p>
              <p>Feature six</p>
              <p>Feature seven</p>
            </Card.Text>
            <Button variant="secondary">Upgrade Plan</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
