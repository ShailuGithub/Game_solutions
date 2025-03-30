import { useEffect, useState } from "react";
import axiosinstance from "../../utils/axiosinstance";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../NavBar";
import { AgGridReact } from "ag-grid-react";

const GetSalesRegister = () => {
    const [gridData, setGridData] = useState([]);
    const [formData, setFormData] = useState({
        Email: "",
        ContactNo: "",
        customerId: 0,
        Balance: 0,
        Amount: 0,
    });
    const [clients, setClients] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState("");

    const fetchClients = async () => {
        try {
            const response = await axiosinstance.get("client");
            if (response.status === 200 && response.data.Valid) {
                setClients(response.data.data);
                console.log(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching client data:", error);
        }
    };

    const handleCustomerChange = async (e) => {
        const custid = e.target.value;
        setSelectedCustomer(custid);
    };


    useEffect(() => {
        fetchClients();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form refresh

        const userId = sessionStorage.getItem("UserId");
        const customerId = selectedCustomer === "" ? 0 : selectedCustomer;
        const fromdate = formData.fromdate;
        const todate = formData.todate;

        // Validate if customer is selected
        if (selectedCustomer === "0") {
            toast.error("Please select a customer");
            return; // Stop form submission
        }

        try {
            //Fill grid 
            axiosinstance
                .get(`sales/GetSalesRegister/${customerId}?fromdate=${fromdate}&todate=${todate}&User_Id=${userId}`)
                .then((response) => {
                    setGridData(response.data);
                    if (response.data.length > 0) {
                        console.log(response.data);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching Receipt details:", error);
                });

        } catch (error) {
            console.error("Error:", error.message);
            toast.error("Error inserting Receipt data");
        }
    };

    const columnDefs = [
        // { 
        //   headerName: "Serial No", 
        //   valueGetter: "node.rowIndex + 1",  // Adds serial number based on row index
        //   width: 100 
        // },
        {
            headerName: "Tran Date",
            field: "Tran_Date",
            width: 120,
            valueFormatter: function (params) {
                const date = new Date(params.value);
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
                const year = date.getFullYear();
                return `${day}-${month}-${year}`;
            }
        },
        {
            headerName: "Tran No",
            field: "Tran_No",
            width: 120
        },
        {
            headerName: "Name",
            field: "Name",
            width: 150
        },
        // {
        //     headerName: "Contact No",
        //     field: "ContactNo",
        //     width: 150
        // },
        {
            headerName: "Cash",
            field: "Cash",
            width: 100
        },
        {
            headerName: "UPI",
            field: "Upi",
            width: 100
        },
        {
            headerName: "Credit",
            field: "Credit",
            width: 100
        },
        {
            headerName: "Net Amount",
            field: "Net_Amount",
            width: 120
        },

    ];

    const gridOptions = {
        onGridReady: (params) => {
            // Automatically adjust the columns when the grid is ready
            params.api.sizeColumnsToFit();
            params.api.getAllColumns().forEach((column) => {
                column.getColDef().autoSize = true;
            });
            params.api.autoSizeColumns(params.columnApi.getAllColumns());
        },
    };
    return (
        <div className="container">
            <NavBar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Sales Register</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="#">Reports</a>
                            </li>
                            <li className="breadcrumb-item active">Sales Register</li>
                        </ol>
                    </nav>
                </div>

                <section className="section">
                    <div className="row">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Sales Register</h5>

                                <form className="row g-3" onSubmit={handleSubmit}>
                                    <div className="row mb-3">
                                        {/* Customer Dropdown */}
                                        <div className="col-md-4">
                                            <label htmlFor="inputState" className="form-label">
                                                Customer
                                            </label>
                                            <select
                                                id="inputState"
                                                className="form-select"
                                                value={selectedCustomer}
                                                onChange={handleCustomerChange}
                                            >
                                                <option value="">Select</option>
                                                {clients.map((client) => (
                                                    <option key={client.Customer_Id} value={client.Customer_Id}>
                                                        {client.Name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* From Date Input */}
                                        <div className="col-md-3">
                                            <label htmlFor="fromdate" className="form-label">
                                                From Date:
                                            </label>
                                            <input
                                                type="date"
                                                id="fromdate"
                                                name="fromdate"
                                                value={formData.fromdate}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, fromdate: e.target.value })
                                                }
                                                className="form-control"
                                                required
                                            />
                                        </div>

                                        {/* To Date Input */}
                                        <div className="col-md-3">
                                            <label htmlFor="todate" className="form-label">
                                                To Date:
                                            </label>
                                            <input
                                                type="date"
                                                id="todate"
                                                name="todate"
                                                value={formData.todate}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, todate: e.target.value })
                                                }
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-2 d-flex justify-content-between align-items-end">
                                            <button
                                                type="submit"
                                                className="btn btn-outline-success" 
                                            >
                                                Search
                                            </button>
                                        </div>
                                    </div>

                                    {/* Data Grid */}
                                    <div className="row mb-3">
                                        <div
                                            className="ag-theme-alpine custom-ag-grid"
                                            style={{ height: "300px", width: "100%" }}
                                        >
                                            <AgGridReact
                                                key={gridData.length}
                                                rowData={gridData}
                                                columnDefs={columnDefs}
                                                gridOptions={gridOptions}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <ToastContainer />
        </div>
    );

};

export default GetSalesRegister;
