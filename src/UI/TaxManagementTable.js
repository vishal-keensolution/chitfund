/* import React from "react";
import { render } from "react-dom";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

export default function DashboardTable() {
  const onGridReady = (params) => {
    axios.get("/api/getTaxData").then((response) => {
      if (response.data.data !== "No Data") {
        console.log(response.data);
        params.api.applyTransaction({ add: response.data.data });
      }
    });
  };

  const columnDefs = [
    { headerName: "ID", field: "idTaxes" },
    { headerName: "Name", field: "taxName" },
    { headerName: "Rate", field: "taxRate" },
    { headerName: "Start Date", field: "startDate" },
    { headerName: "End Date", field: "endDate" },
    { headerName: "Type", field: "taxType" },
    { headerName: "Status", field: "status" },
    { headerName: "Action", field: "Icon" },
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
      ></AgGridReact>{" "}
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
    axios.get("/api/getTaxData").then((response) => {
      console.log(response.data.data);
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
      accessor: "idTaxes",
    },
    {
      Header: "Name",
      accessor: "taxName",
    },
    {
      Header: "Rate",
      accessor: "taxRate",
      Filter: SelectColumnFilter,
    },
    {
      Header: "Start Date",
      accessor: "startDate",
      Filter: SelectColumnFilter,
    },
    {
      Header: "End Date",
      accessor: "endDate",
      Filter: SelectColumnFilter,
    },
    {
      Header: "Type",
      accessor: "taxType",
      Filter: SelectColumnFilter,
    },
    {
      Header: "Exclusive/Inclusive",
      accessor: "exclusive_inclusive",
      Filter: SelectColumnFilter,
    },
    {
      Header: "Status",
      accessor: "status",
      Filter: SelectColumnFilter,
    },
  ];

  return (
    <div>
      {!data && <h3>No Data to Display</h3>}
      {data && <Table columns={columns} data={data} name={"Taxes"} />}
    </div>
  );
}
