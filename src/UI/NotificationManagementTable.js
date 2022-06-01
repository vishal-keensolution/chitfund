/* import React, { useState } from "react";
import { render } from "react-dom";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

export default function DashboardTable() {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const onGridReady = (params) => {
    console.log(params);
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    axios.get("/api/getNotificationData").then((response) => {
      if (response.data.data !== "No Data") {
        console.log(response.data);
        params.api.applyTransaction({ add: response.data.data });
      }
    });
  };

  const columnDefs = [
    { headerName: "S No", field: "idNotifications" },
    { headerName: "Name", field: "notificationName" },
    { headerName: "Description", field: "detailMessage" },
    { headerName: "Type", field: "notificationType" },
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
  const Filter = () => {
    console.log("g : ", gridApi);
    console.log("g2 : ", gridColumnApi);
  };
  return (
    <div className="ag-theme-alpine" style={{ height: 400 }}>
      <input type="text" onChange={Filter} />
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

/* import React, { useState, useEffect } from "react";
import axios from "axios";
import Datatable from "./DataTable";

require("es6-promise").polyfill();
require("isomorphic-fetch");

export default function DashboardTable() {
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");
  const [searchColumns, setSearchColumns] = useState(["firstName", "lastName"]);

  useEffect(() => {
    axios.get("/api/getNotificationData").then((response) => {
      console.log(response.data.data);
      if (response.data.data.length > 0) {
        setSearchColumns(Object.keys(response.data.data[0]));
        setData(response.data.data);
      }
    });
  }, []);

  function search(rows) {
    return rows.filter((row) =>
      searchColumns.some(
        (column) =>
          row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
      )
    );
  }

  const columns = data[0] && Object.keys(data[0]);

  console.log(columns);
  return (
    <div>
      <div>
        {columns &&
          columns.map((column) => (
            <>
              <input
                type="text"
                
                key={column}
                placeholder={column}
                onChange={(e) => {
                  setSearchColumns((prev) =>
                    true
                      ? prev.filter((sc) => sc !== column)
                      : [...prev, column]
                  );
                }}
              />
            </>
          ))}
      </div>
      <div>
        <Datatable data={search(data)} />
      </div>
    </div>
  );
} */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./TableContainer";
import { SelectColumnFilter } from "./Filter";

require("es6-promise").polyfill();
require("isomorphic-fetch");

export default function DashboardTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/getNotificationData").then((response) => {
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
      accessor: "idNotifications",
    },
    {
      Header: "Detail Message",
      accessor: "detailMessage",
    },
    {
      Header: "Medium",
      accessor: "medium",
      Filter: SelectColumnFilter,
      filter: "includes",
    },
    {
      Header: "Notification Name",
      accessor: "notificationName",
      Filter: SelectColumnFilter,
      filter: "includes",
    },
    {
      Header: "Notification Type",
      accessor: "notificationType",
      Filter: SelectColumnFilter,
      filter: "includes",
    },
    {
      Header: "Status",
      accessor: "status",
      Filter: SelectColumnFilter,
      filter: "includes",
    },
  ];

  return (
    <div>
      <h1>
        <center>Notifications</center>
      </h1>
      {!data && <h3>No Data to Display</h3>}
      {data && <Table columns={columns} data={data} name={"Notification"} />}
    </div>
  );
}
