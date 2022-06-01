import "./App.css";
import Home from "./UI/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TaxManagement from "./UI/TaxManagement";
import Calculator from "./UI/Calculator";
import NotificationManagement from "./UI/NotificationManagement";
import Register from "./UI/Register";
import Login from "./UI/Login";
import Dashboard from "./UI/Dashboard";
import DashboardUser from "./UI/DashboardUser";
import DashboardAdmin from "./UI/DashboardAdmin";
import PlatformFee from "./UI/PlatformFee";
import ChangePassword from "./UI/ChangePassword";
import Bid from "./UI/User/Bid";
import UserProfile from "./UI/UserProfile";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/Register">
          <Register />
        </Route>
        <Route exact path="/Login">
          <Login />
        </Route>
        <Route exact path="/Dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/DashboardUser">
          <DashboardUser />
        </Route>
        <Route exact path="/DashboardAdmin">
          <DashboardAdmin />
        </Route>
        <Route exact path="/Taxmanagement">
          <TaxManagement />
        </Route>
        <Route exact path="/Notificationmanagement">
          <NotificationManagement />
        </Route>
        <Route exact path="/Platformfee">
          <PlatformFee />
        </Route>
        <Route exact path="/OtherSetting">
          <ChangePassword />
        </Route>
        <Route exact path="/Calculator">
          <Calculator />
        </Route>
        <Route exact path="Bid">
          <Bid />
        </Route>
        <Route exact path="/UserProfile">
          <UserProfile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
