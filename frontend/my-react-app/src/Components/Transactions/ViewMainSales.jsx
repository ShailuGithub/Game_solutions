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
    { headerName: "ID", field: "id", width: 70 }, 
    { headerName: "Tran No", field: "Tran_No", width: 90 },
    {
      headerName: "Tran Date", field: "Tran_Date", width: 110, valueFormatter: function (params) {
        const date = new Date(params.value);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      }
    },
    { headerName: "Customer Name", field: "Name", width: 200 },
    { headerName: "Contact No", field: "ContactNo", width: 120 },
    { headerName: "Net Amount", field: "Net_Amount", width: 150 },
  ];
  return (
      <div> 
        {isOpen && (
          <div className="modal fade show" id="largeModal" tabIndex="-1" style={{ display: 'block' }} aria-labelledby="largeModalLabel">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="largeModalLabel">Sales List </h5>
                  <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div
                    className="ag-theme-alpine"
                    style={{ height: "400px", width: "100%" }}
                  >
                    <AgGridReact
                      rowData={rowData}
                      columnDefs={columnDefs}
                      pagination={true}
                      onRowDoubleClicked={onRowClicked}
                    />
                  </div>
                </div>
                {/* <div className="modal-footer"> 
                </div> */}
              </div>
            </div>
          </div>
        )}
      </div>
    );
};

export default ViewMainSales;
