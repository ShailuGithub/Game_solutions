import { useEffect, useState } from "react";
import axiosinstance from "../../utils/axiosinstance";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../NavBar";
import { AgGridReact } from "ag-grid-react";

const Receipt = () => {
  const [gridData, setGridData] = useState([]);
  const [formData, setFormData] = useState({
    Email: "",
    ContactNo: "",
    customerId: 0,
    Balance: 0,
    Amount: 0,
  });
  const [AmountForm, setAmountForm] = useState({
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

    const selectedClient = clients.find(
      (client) => client.Customer_Id.toString() === custid
    );

    if (selectedClient) {
      try {

        // Make a POST request and send the Customer_Id in the body
        const response = await axiosinstance.post("client/getCustomerBalance", {
          Customer_Id: selectedClient.Customer_Id
        });


        if (response.status === 200 && response.data.Valid) {
          // Assuming 'credit' is returned inside the 'data' object in the response
          const credit = response.data.data[0]?.credit; // Access the 'credit' value from the response

          // You can now use this 'credit' value as needed
          console.log("Fetched credit:", credit);
          const finalCredit = (credit !== null && credit !== undefined && credit !== "")
            ? credit
            : 0;
          // You can update the formData or handle the credit value in any other way
          setFormData({
            Email: selectedClient.Email,
            ContactNo: selectedClient.ContactNo,
            Balance: finalCredit,
          });
        } else {
          console.error("Failed to fetch customer balance:", response.data.message);
        }

        //Fill grid 
        axiosinstance
          .get(`sales/getReceiptDetails/${selectedClient.Customer_Id}`)
          .then((response) => {
            setGridData(response.data);
            if (response.data.length > 0) {
              console(response.data);
            }
          })
          .catch((error) => {
            console.error("Error fetching Receipt details:", error);
          });

      } catch (error) {
        console.error("Error fetching customer balance:", error);

        if (error.response) {
          console.error("Response error:", error.response.data);
          console.error("Request error:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
      }
    }
  };


  useEffect(() => {
    fetchClients();
  }, []);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleAmountChange = (e) => {
    const { name, value } = e.target;
    setAmountForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form refresh

    const payload = {
      User_Id: sessionStorage.getItem("UserId"),
      customerId: selectedCustomer,
      Balance: formData.Balance,
      Amount: AmountForm,
    };
    // Validate if customer is selected
    if (selectedCustomer === "0") {
      toast.error("Please select a customer");
      return; // Stop form submission
    }

    // Validate amount field
    if (!AmountForm.Amount || AmountForm.Amount == 0) {
      toast.error("Please enter a valid amount");
      return; // Stop form submission
    }

    try {
      const response = await axiosinstance.post("sales/ReceiptInsert", payload);

      if (response.status === 200) {
        toast.success("Receipt insertion successful");
        setSelectedCustomer('');
        setAmountForm({
          Amount: 0, // or "" to clear the input
        });
        setGridData([]);
        setFormData({
          customerId: 0,
          Balance: 0,
          Amount: 0,
          Email: '',
          ContactNo: '',
        });
      } else {
        toast.error(response.data.message);
      }
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
      headerName: "Balance", 
      field: "Balance", 
      width: 150 
    },
    { 
      headerName: "Amount", 
      field: "Amount", 
      width: 150 
    },
    { 
      headerName: "Entry_date", 
      field: "Entry_date", 
      width: 200,
      valueFormatter: function(params) {
        const date = new Date(params.value);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      }
    }
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
          <h1>Receipt</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Transactions</a>
              </li>
              <li className="breadcrumb-item active">Receipt</li>
            </ol>
          </nav>
        </div>

        <section className="section">
          <div className="row">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Receipt Entry</h5>

                <form className="row g-3" onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-md-3">
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

                    <div className="col-md-3" hidden>
                      <label htmlFor="inputState" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name="Email"
                        placeholder="Email"
                        value={formData.Email}
                        onChange={handleChange}
                        readOnly
                      />
                    </div>

                    <div className="col-md-2">
                      <label htmlFor="inputState" className="form-label">
                        Contact No
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="ContactNo"
                        placeholder="Contact No"
                        value={formData.ContactNo}
                        onChange={handleChange}
                        required
                        readOnly
                      />
                    </div>

                    <div className="col-md-2">
                      <label htmlFor="inputState" className="form-label">
                        Balance
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="Balance"
                        placeholder="Balance"
                        value={formData.Balance}
                        onChange={handleChange}
                        required
                        readOnly
                      />
                    </div>

                    <div className="col-md-2">
                      <label htmlFor="inputState" className="form-label">
                        Amount
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="Amount"
                        value={AmountForm.Amount}
                        onChange={handleAmountChange}
                        required
                      />
                    </div>

                    {/* Place Save and Reset Buttons in Same Row */}
                    <div className="col-md-3 d-flex justify-content-between align-items-end">
                      <button
                        type="submit"
                        className="btn btn-outline-success"
                        style={{ width: "48%" }}
                      >
                        Save
                      </button>
                      <button
                        type="reset"
                        className="btn btn-outline-danger"
                        style={{ width: "48%" }}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
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

export default Receipt;
