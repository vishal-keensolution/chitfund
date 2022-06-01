

import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./../TableContainer";
import { SelectColumnFilter } from "./../Filter";

require("es6-promise").polyfill();
require("isomorphic-fetch");

export default function DashboardTable() {
  const [data, setData] = useState([]);
  useEffect(() => { 
    
    if (localStorage.getItem('role_id') === '1')
    {
       axios.post("/api/getSchemeDataForgUser", {users_id:localStorage.getItem('userid')}).then((response) => {
         console.log('role_id--here222',response.data.data);
          if (response.data.data !== "No Data" && response.data.data.length > 0) {
            setData(response.data.data);
          } else {
            setData(false);
          }
        });
    }
    else if(localStorage.getItem('role_id') === '2')
    {
      
      axios.post("/api/getSchemeDataForgUser", {users_id:localStorage.getItem('userid')}).then((response) => {
        
        if (response.data.data !== "No Data" && response.data.data.length > 0) {
          setData(response.data.data);
        } else {
          setData(false);
        }
      });
    }
    else if(localStorage.getItem('role_id') === '3')
    {
      axios.get("/api/getSchemeData").then((response) => {
        
        if (response.data.data !== "No Data" && response.data.data.length > 0) {
          setData(response.data.data);
        } else {
          setData(false);
        }
      });
    }
    
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
    <div className="user" style={{ overflowX: "auto" }}>
      {!data && <h3>No Data to Display</h3>}
      {data && <Table className="user" columns={columns} data={data} name={"Schemes"} />}
    </div>
  );
}
