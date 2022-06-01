import axios from "axios";
import React, { useEffect, useState } from "react";

export default function AssignForm() {
  const [Data, setData] = useState("");
  useEffect(async () => {
    await axios.get("/api/getSchemeData").then((response) => {
      setData(response.data.data[0]);
    });
  }, []);
  const fields = [];
  return (
    <div>
      Form
      <div>
        {Object.entries(Data).map(([key, value]) => (
          <>
            <h1>{key}</h1>
            <h1>{value}</h1>
          </>
        ))}
      </div>
    </div>
  );
}
