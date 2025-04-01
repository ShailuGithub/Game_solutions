import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import axiosinstance from "../../utils/axiosinstance";

const ViewMainSales = () => {
  const [rowData, setRowData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosinstance
      .get("sales/getMainViewSales")
      .then((response) => {
        console.log("Fetched Data:", response.data);
        setRowData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sales details:", error);
      });
  }, []);

  const onRowClicked = (event) => {
    // Handle row click if needed
    console.log("Row Clicked: ", event.data);
  };

  const columnDefs = [
    { headerName: "ID", field: "id", width: 70 },
    { headerName: "Tran No", field: "Tran_No", width: 90 },
    {
      headerName: "Tran Date",
      field: "Tran_Date",
      width: 110,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return `${date.getDate().toString().padStart(2, "0")}-${(
          date.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${date.getFullYear()}`;
      },
    },
    { headerName: "Customer Name", field: "Name", width: 200 },
    { headerName: "Contact No", field: "ContactNo", width: 120 },
    { headerName: "Net Amount", field: "Net_Amount", width: 150 },
  ];

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh" }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ width: "80%", maxWidth: "1000px" }}
      >
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Sales List</h3>
          <button
            className="btn btn-outline-light"
            onClick={() => navigate("/Sales")}
          >
            ⬅ Back to Sales
          </button>
        </div>
        <div className="card-body">
          <div
            className="ag-theme-alpine"
            style={{ height: "500px", width: "100%" }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              pagination={true}
              onRowDoubleClicked={onRowClicked}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMainSales;
