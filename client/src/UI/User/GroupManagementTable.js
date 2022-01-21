/* import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

export default function DashboardTable() {
  const onGridReady = (params) => {
    axios.get("/api/getGroupData").then((response) => {
      if (response.data.data !== "No Data") {
        console.log(response.data);
        params.api.applyTransaction({ add: response.data.data });
      }
    });
  };

  const columnDefs = [
    { headerName: "ID", field: "idGroups" },
    { headerName: "Group Name", field: "groupName" },
    { headerName: "Contact Person", field: "contactPerson" },
    { headerName: "Contact Number", field: "contactNumber" },
    { headerName: "Email", field: "email" },
    { headerName: "Max Allowed User", field: "maxUserAllowed" },
    { headerName: "Amount Per User", field: "amountPerUser" },
    { headerName: "Terms", field: "terms" },
    { headerName: "Address", field: "address" },
    { headerName: "Country", field: "country" },
    { headerName: "State", field: "state" },
    { headerName: "City", field: "city" },
    { headerName: "Zipcode", field: "zipcode" },
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
import Table from "./../TableContainer";
import { SelectColumnFilter } from "./../Filter";

require("es6-promise").polyfill();
require("isomorphic-fetch");

export default function DashboardTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/getGroupData").then((response) => {
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
      accessor: "idGroups",
    },
    {
      Header: "Group Name",
      accessor: "groupName",
    },
    {
      Header: "Contact Person",
      accessor: "contactPerson",
      Filter: SelectColumnFilter,
    },
    {
      Header: "Contact Number",
      accessor: "contactNumber",
      Filter: SelectColumnFilter,
    },
    {
      Header: "Email",
      accessor: "email",
      Filter: SelectColumnFilter,
    },
    {
      Header: "Max Allowed User",
      accessor: "maxUserAllowed",
      Filter: SelectColumnFilter,
    },
    {
      Header: "Amount Per User",
      accessor: "amountPerUser",
      Filter: SelectColumnFilter,
    },
    {
      Header: "Terms",
      accessor: "terms",
      Filter: SelectColumnFilter,
    },
    {
      Header: "Address",
      accessor: "address",
      Filter: SelectColumnFilter,
    },
    {
      Header: "Country",
      accessor: "country",
      Filter: SelectColumnFilter,
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
      Header: "Zipcode",
      accessor: "zipcode",
      Filter: SelectColumnFilter,
    },
    {
      Header: "Status",
      accessor: "status",
      Filter: SelectColumnFilter,
    },
  ];

  return (
    <div style={{ overflowX: "auto" }}>
      {!data && <h3>No Data to Display</h3>}
      {data && <Table columns={columns} data={data} name={"Group"} />}
    </div>
  );
}
