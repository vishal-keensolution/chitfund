import React from "react";
import { render } from "react-dom";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

export default function DashboardTable() {
  const rowData = [
    {
      "S No": 1,
      Name: "09-09-2020",
      Email: "Company",
      Mobile: 30,
      State: 1000.0,
      City: 16000.0,
      Type: 14000.0,
      Status: 30000.0,
      Groups: "Success",
      Action: "icon",
    },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 400 }}>
      <AgGridReact rowData={rowData}>
        <AgGridColumn field={"S No"} sortable={true} />
        <AgGridColumn field="Name" sortable={true} filter={true} />
        <AgGridColumn field="Email" sortable={true} filter={true} />
        <AgGridColumn field="Mobile" sortable={true} filter={true} />
        <AgGridColumn field="State" sortable={true} filter={true} />
        <AgGridColumn field="City" sortable={true} filter={true} />
        <AgGridColumn field="Type" sortable={true} filter={true} />
        <AgGridColumn field="Status" sortable={true} filter={true} />
        <AgGridColumn field="Groups" sortable={true} filter={true} />
        <AgGridColumn field="Action" sortable={true} filter={true} />
      </AgGridReact>
    </div>
  );
}
