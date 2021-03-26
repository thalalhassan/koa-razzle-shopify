import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

function Reports(props) {
  const [data, setdata] = useState("");
  useEffect(() => {
    axios
      .get("/category")
      .then((data) => {
        console.log({ data });
        setdata(data);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);
  return (
    <div>{`Hoooi data comes next =============== ${JSON.stringify(data)}`}</div>
  );
}

// export
export default Reports;
