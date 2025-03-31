import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import Modal from "react-modal";
import axiosinstance from "../../utils/axiosinstance";
const ViewMainSales = ({ isOpen, onClose }) => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    if (isOpen) {
      axiosinstance
        .get("sales/getMainViewSales")
        .then((response) => {
          console.log("Fetched Data:", response.data);
          setRowData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching sales details:", error);
        });
    }
  }, [isOpen]);
  const onRowClicked = (event) => {
    // onSelectTransaction(event.data.id);
    onClose();
  };
  const columnDefs = [
    { headerName: "ID", field: "id", width: 80 },
    { headerName: "Transaction No", field: "Tran_No", width: 200 },
    { headerName: "Transaction Date", field: "Tran_Date", width: 200 },
    { headerName: "Customer Name", field: "Name", width: 200 },
    { headerName: "Contact No", field: "ContactNo", width: 150 },
    { headerName: "Net Amount", field: "Net_Amount", width: 150 },
  ];
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark overlay to reduce transparency
          zIndex: 1000,
        },
        content: {
          backgroundColor: "#fff",
          width: "80%",
          height: "500px",
          margin: "auto",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          zIndex: 1001,
        },
      }}
    >
      <h2>Sales Details</h2>
      <button onClick={onClose}>Close</button>

      <div
        className="ag-theme-alpine"
        style={{ height: "400px", width: "100%" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          onRowClicked={onRowClicked}
        />
      </div>
    </Modal>
  );
};

export default ViewMainSales;
