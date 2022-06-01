import { React, useState } from "react";
import { useTable, useFilters, useGlobalFilter } from "react-table";
import { GlobalFilter, DefaultFilterForColumn } from "./Filter";
import { Table, Modal, Button } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Tables({ columns, data, name }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    state,
    visibleColumns,
    prepareRow,
    setGlobalFilter,
    preGlobalFilteredRows,
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultFilterForColumn },
    },
    useFilters,
    useGlobalFilter
  );

  function ViewDataModal({ data, name }) {
    const [show, setShow] = useState(false);
    return (
      <>
        <i
          style={{ marginLeft: "5px" }}
          className="far fa-eye"
          onClick={() => setShow(true)}
        ></i>
        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              View Data
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
              {Object.entries(data).map(([key, value]) => (
                <div className="row" style={{ paddingTop: "10px" }}>
                  <div className="col-sm-4 col-md-4">
                    <label>{key}</label>{" "}
                  </div>
                  <div className="col-sm-8 col-md-8">
                    <input className="form-control" value={value} disabled />
                  </div>
                </div>
              ))}
            </>
          </Modal.Body>
        </Modal>
      </>
    );
  }

  function EditDataModal({ data, name }) {
    const [show, setShow] = useState(false);
    var disabledInput = [
      "userid",
      "idSchemes",
      "idGroups",
      "idTaxes",
      "idNotifications",
      "taxName",
      "startDate",
      "endDate",
      "createdAt",
      "fullname",
      "schemeName",
      "groupName",
    ];
    return (
      <>
        <i
          style={{ marginLeft: "5px" }}
          className="far fa-edit"
          onClick={() => setShow(true)}
        ></i>

        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Edit Data
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
              <form>
                {Object.entries(data).map(([key, value]) => (
                  <div className="row" style={{ paddingTop: "10px" }}>
                    <div className="col-sm-4 col-md-4">
                      <label>{key}</label>{" "}
                    </div>
                    <div className="col-sm-8 col-md-8">
                      {key !== "status" &&
                        key !== "notificationType" &&
                        key !== "medium" &&
                        key !== "exclusive_inclusive" &&
                        key !== "taxType" && (
                          <input
                            className="form-control"
                            defaultValue={value}
                            onChange={(e) => {
                              data[key] = e.target.value;
                            }}
                            disabled={
                              disabledInput.includes(key) ? true : false
                            }
                          />
                        )}
                      {key === "notificationType" && name === "Notification" && (
                        <select
                          className="form-control"
                          defaultValue={value}
                          onChange={(e) => {
                            console.log(e.target.value);
                            data[key] = e.target.value;
                          }}
                        >
                          <option>Special</option>
                          <option>Regular</option>
                        </select>
                      )}
                      {key === "medium" && name === "Notification" && (
                        <select
                          className="form-control"
                          defaultValue={value}
                          onChange={(e) => {
                            console.log(e.target.value);
                            data[key] = e.target.value;
                          }}
                        >
                          <option>SMS</option>
                          <option>Email</option>
                        </select>
                      )}
                      {key === "status" && name !== "Taxes" && (
                        <select
                          className="form-control"
                          defaultValue={value}
                          onChange={(e) => {
                            console.log(e.target.value);
                            data[key] = e.target.value;
                          }}
                        >
                          <option>Active</option>
                          <option>Inactive</option>
                          <option>Verified</option>
                        </select>
                      )}
                      {key === "status" && name === "Taxes" && (
                        <select
                          className="form-control"
                          defaultValue={value}
                          onChange={(e) => {
                            console.log(e.target.value);
                            data[key] = e.target.value;
                          }}
                        >
                          <option>Active</option>
                          <option>Inactive</option>
                        </select>
                      )}
                      {key === "exclusive_inclusive" && name === "Taxes" && (
                        <select
                          className="form-control"
                          defaultValue={value}
                          onChange={(e) => {
                            console.log(e.target.value);
                            data[key] = e.target.value;
                          }}
                        >
                          <option>Exclusive</option>
                          <option>Inclusive</option>
                        </select>
                      )}
                      {key === "taxType" && name === "Taxes" && (
                        <select
                          className="form-control"
                          defaultValue={value}
                          onChange={(e) => {
                            console.log(e.target.value);
                            data[key] = e.target.value;
                          }}
                        >
                          <option>Fixed</option>
                          <option>Percentage</option>
                        </select>
                      )}
                    </div>
                  </div>
                ))}
                <div className="row">
                  <button
                    style={{ marginTop: "15px" }}
                    className="btn btn-secondary"
                    onClick={(e) => {
                      HandleEdit(e, name, data);
                    }}
                  >
                    Apply
                  </button>
                </div>
              </form>
            </>
          </Modal.Body>
        </Modal>
      </>
    );
  }

  const HandleEdit = async (e, name, data) => {
    e.preventDefault();
    if (name === "User Verification") {
      await axios
        .post("/api/editCompanyUser", {
          data: data,
        })
        .then((response) => {
          console.log(response.data);
        });
      window.location.reload();
    }
    if (name === "Schemes") {
      await axios
        .post("/api/editScheme", {
          data: data,
        })
        .then((response) => {
          console.log(response.data);
        });
      window.location.reload();
    }

    if (name === "Group") {
      await axios
        .post("/api/editGroup", {
          data: data,
        })
        .then((response) => {
          console.log(response.data);
        });
      window.location.reload();
    }
    if (name === "Taxes") {
      await axios
        .post("/api/editTax", {
          data: data,
        })
        .then((response) => {
          console.log(response.data);
        });
      window.location.reload();
    }
    if (name === "Notification") {
      await axios
        .post("/api/editNotification", {
          data: data,
        })
        .then((response) => {
          console.log(response.data);
        });
      window.location.reload();
    }
  };

  const DeleteData = async (name, data) => {
    if (name === "User Verification") {
      await axios
        .post("/api/deleteCompanyUser", {
          userid: data.userid,
        })
        .then((response) => {
          console.log(response.data);
        });
      window.location.reload();
    }
    if (name === "Schemes") {
      await axios
        .post("/api/deleteScheme", {
          idSchemes: data.idSchemes,
        })
        .then((response) => {
          console.log(response.data);
        });
      window.location.reload();
    }

    if (name === "Group") {
      await axios
        .post("/api/deleteGroup", {
          idGroups: data.idGroups,
        })
        .then((response) => {
          console.log(response.data);
        });
      window.location.reload();
    }

    if (name === "Report") {
      /* await axios
        .post("/api/deleteReport", {
          idReports: data.idReports,
        })
        .then((response) => {
          console.log(response.data);
        }); */
      window.location.reload();
    }

    if (name === "Taxes") {
      await axios
        .post("/api/deleteTax", {
          idTaxes: data.idTaxes,
        })
        .then((response) => {
          console.log(response.data);
        });
      window.location.reload();
    }

    if (name === "Notification") {
      await axios
        .post("/api/deleteNotification", {
          idNotifications: data.idNotifications,
        })
        .then((response) => {
          console.log(response.data);
        });
      window.location.reload();
    }
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <Table responsive="sm" {...getTableProps()}>
        <thead>
          {/* <tr>
          <th
            colSpan={visibleColumns.length}
            style={{
              textAlign: "center",
            }}
          > */}
          {/* rendering global filter */}
          {/*  <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            /> */}
          {/* </th>
        </tr> */}
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th style={{ minWidth: "100px" }} {...column.getHeaderProps()}>
                  {/* rendering column filter */}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                  <span style={{ whiteSpace: "nowrap" }}>
                    {column.render("Header")}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
                <td>
                  <div className="row" style={{ minInlineSize: "max-content" }}>
                    <div className="col-sm-12 col-md-12">
                      <ViewDataModal data={row.values} name={name} />
                      <EditDataModal data={row.values} name={name} />
                      <i
                        style={{ marginLeft: "5px" }}
                        className="far fa-trash-alt"
                        onClick={(e) => {
                          DeleteData(name, row.values);
                        }}
                      ></i>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
