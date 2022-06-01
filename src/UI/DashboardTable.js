/* import React from "react";
import { render } from "react-dom";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

export default function DashboardTable() {
  var filterParams = { textFormatter: replaceAccents };
  function replaceAccents(value) {
    return value
      .replace(new RegExp("[àáâãäå]", "g"), "a")
      .replace(new RegExp("æ", "g"), "ae")
      .replace(new RegExp("ç", "g"), "c")
      .replace(new RegExp("[èéêë]", "g"), "e")
      .replace(new RegExp("[ìíîï]", "g"), "i")
      .replace(new RegExp("ñ", "g"), "n")
      .replace(new RegExp("[òóôõøö]", "g"), "o")
      .replace(new RegExp("œ", "g"), "oe")
      .replace(new RegExp("[ùúûü]", "g"), "u")
      .replace(new RegExp("[ýÿ]", "g"), "y")
      .replace(new RegExp("\\W", "g"), "");
  }

  const rowData = [
    {
      "S No": 1,
      Date: "09-09-2020",
      "Group Name": "Company",
      "Installment No": 30,
      Amount: 1000.0,
      "Total Deposits": 16000.0,
      "Total Remaining": 14000.0,
      "Total Withdraw": 30000.0,
      Status: "Success",
    },
    {
      "S No": 2,
      Date: "01-09-2020",
      "Group Name": "Company",
      "Installment No": 30,
      Amount: 1000.0,
      "Total Deposits": 16000.0,
      "Total Remaining": 14000.0,
      "Total Withdraw": 30000.0,
      Status: "Success",
    },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 400 }}>
      <AgGridReact rowData={rowData}>
        <AgGridColumn field={"S No"} sortable={true} />
        <AgGridColumn field="Date" sortable={true} filter={true} />
        <AgGridColumn field="Group Name" sortable={true} filter={true} />
        <AgGridColumn field="Installment No" sortable={true} filter={true} />
        <AgGridColumn field="Amount" sortable={true} filter={true} />
        <AgGridColumn field="Total Deposits" sortable={true} filter={true} />
        <AgGridColumn field="Total Remaining" sortable={true} filter={true} />
        <AgGridColumn field="Total Withdraw" sortable={true} filter={true} />
        <AgGridColumn field="Status" sortable={true} filter={true} />
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
  const data = [
    {
      "S No": 1,
      Date: "09-09-2020",
      "Group Name": "Company",
      "Installment No": 30,
      Amount: 1000.0,
      "Total Deposits": 16000.0,
      "Total Remaining": 14000.0,
      "Total Withdraw": 30000.0,
      Status: "Success",
    },
    {
      "S No": 2,
      Date: "01-09-2020",
      "Group Name": "Company",
      "Installment No": 30,
      Amount: 1000.0,
      "Total Deposits": 16000.0,
      "Total Remaining": 14000.0,
      "Total Withdraw": 30000.0,
      Status: "Success",
    },
  ];
  /*  useEffect(() => {
    
  }, []); */

  const columns = [
    {
      Header: "S No",
      accessor: "S No",
    },
    {
      Header: "Date",
      accessor: "Date",
    },
    {
      Header: "Group Name",
      accessor: "Group Name",
      Filter: SelectColumnFilter,
    },
    {
      Header: "Installment No",
      accessor: "Installment No",
    },
    {
      Header: "Amount",
      accessor: "Amount",
    },
    {
      Header: "Total Deposits",
      accessor: "Total Deposits",
    },
    {
      Header: "Total Remaining",
      accessor: "Total Remaining",
    },
    {
      Header: "Total Withdraw",
      accessor: "Total Withdraw",
    },
    {
      Header: "Status",
      accessor: "Status",
      Filter: SelectColumnFilter,
    },
  ];

  return (
    <div>
      <Table columns={columns} data={data} name={"Dashboard"} />
    </div>
  );
}
