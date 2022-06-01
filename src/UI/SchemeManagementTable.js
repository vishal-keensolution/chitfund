/* import React from "react";
import { render } from "react-dom";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

export default function DashboardTable() {
  const onGridReady = (params) => {
    axios.get("/api/getSchemeData").then((response) => {
      if (response.data.data !== "No Data") {
        console.log(response.data);
        params.api.applyTransaction({ add: response.data.data });
      }
    });
  };

  const columnDefs = [
    { headerName: "ID", field: "idSchemes" },
    { headerName: "Scheme Name", field: "schemeName" },
    { headerName: "Contact Person", field: "contactPerson" },
    { headerName: "Contact Number", field: "contactNumber" },
    { headerName: "Email", field: "email" },
    { headerName: "Max Allowed User", field: "maxAllowedUser" },
    { headerName: "Amount Per User", field: "amountPerUser" },
    { headerName: "Terms", field: "terms" },
    { headerName: "Address", field: "address" },
    { headerName: "Country", field: "country" },
    { headerName: "State", field: "state" },
    { headerName: "City", field: "city" },
    { headerName: "Zipcode", field: "zipcode" },
    { headerName: "Description", field: "description" },
    { headerName: "Start Date", field: "startDate" },
    { headerName: "End Date", field: "endDate" },
    { headerName: "docURL", field: "docURL" },
    { headerName: "Status", field: "status" },
  ];

  const defaultColDef = {
    sortable: true,
    editable: true,
    flex: 2,
    filter: true,
    floatingFilter: true,
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400 }}>
      <AgGridReact
        columnDefs={columnDefs}
        // rowData={rowData}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
      ></AgGridReact>
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
    axios.get("/api/getSchemeData").then((response) => {
      if (response.data.data !== "No Data" && response.data.data.length > 0) {
        setData(response.data.data);
      } else {
        setData(false);
      }
    });
  }, []);

  const columns = [
    {
      Header: "ID",
      accessor: "idSchemes",
    },
    {
      Header: "Scheme Name",
      accessor: "schemeName",
    },
    {
      Header: "Contact Person",
      accessor: "contactPerson",
    },
    {
      Header: "Contact Number",
      accessor: "contactNumber",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Max Allowed User",
      accessor: "maxAllowedUser",
    },
    {
      Header: "Amount Per User",
      accessor: "amountPerUser",
    },
    {
      Header: "Terms",
      accessor: "terms",
    },
    {
      Header: "Address",
      accessor: "address",
    },

    {
      Header: "Country",
      accessor: "country",
    },

    {
      Header: "State",
      accessor: "state",
    },

    {
      Header: "City",
      accessor: "city",
    },

    {
      Header: "Zipcode",
      accessor: "zipcode",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Start Date",
      accessor: "startDate",
    },
    {
      Header: "End Date",
      accessor: "endDate",
    },
    {
      Header: "docURL",
      accessor: "docURL",
    },
    {
      Header: "Status",
      accessor: "status",
    },
  ];

  return (
    <div style={{ overflowX: "auto" }}>
      {!data && <h3>No Data to Display</h3>}
      {data && <Table columns={columns} data={data} name={"Schemes"} />}
    </div>
  );
}
