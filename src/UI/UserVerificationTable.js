/* import React from "react";
import { render } from "react-dom";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

export default function UserVerificationTable() {
  var filterParams = { textFormatter: replaceAccents };
 
  const rowData = [
    {
      "S No": 1,
      Date: "09-09-2020",
      Name: "Company",
      Email: 30,
      Mobile: 1000.0,
      State: 16000.0,
      City: 14000.0,
      Type: 30000.0,
      Status: "Success",
      Group: "Den,Needs",
      Action: "icons",
    },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 400 }}>
      <AgGridReact rowData={rowData}>
        <AgGridColumn field={"S No"} sortable={true} />
        <AgGridColumn field="Date" sortable={true} filter={true} />
        <AgGridColumn field="Name" sortable={true} filter={true} />
        <AgGridColumn field="Email" sortable={true} filter={true} />
        <AgGridColumn field="Mobile" sortable={true} filter={true} />
        <AgGridColumn field="State" sortable={true} filter={true} />
        <AgGridColumn field="City" sortable={true} filter={true} />
        <AgGridColumn field="Type" sortable={true} filter={true} />
        <AgGridColumn field="Status" sortable={true} filter={true} />
        <AgGridColumn field="Group" sortable={true} filter={true} />
        <AgGridColumn field="Action" sortable={true} filter={true} />
      </AgGridReact>
    </div>
  );
}
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./TableContainer";
import { SelectColumnFilter } from "./Filter";

require("es6-promise").polyfill();
require("isomorphic-fetch");

export default function DashboardTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/getCompanyUsersData").then((response) => {
      if (response.data.data !== "No Data" && response.data.data.length > 0) {
        setData(response.data.data);
      } else {
        setData(false);
      }
    });
  }, []);

  const columns = [
    {
      Header: "S No",
      accessor: "userid",
    },
    {
      Header: "Date",
      accessor: "createdAt",
    },
    {
      Header: "Name",
      accessor: "fullname",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Mobile",
      accessor: "cellphone",
    },
    {
      Header: "State",
      accessor: "state",
      Filter: SelectColumnFilter,
    },

    {
      Header: "City",
      accessor: "city",
      Filter: SelectColumnFilter,
    },

    {
      Header: "Type",
      accessor: "type",
      Filter: SelectColumnFilter,
    },

    {
      Header: "Status",
      accessor: "status",
      Filter: SelectColumnFilter,
    },
    {
      Header: "Group",
      accessor: "group",
      Filter: SelectColumnFilter,
    },
  ];

  return (
    <div>
      {!data && <h3>No Data to Display</h3>}
      {data && (
        <Table columns={columns} data={data} name={"User Verification"} />
      )}{" "}
    </div>
  );
}
