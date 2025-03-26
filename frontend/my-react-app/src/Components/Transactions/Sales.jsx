import { useEffect, useState } from "react";
import axiosinstance from "../../utils/axiosinstance";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../NavBar";
import { AgGridReact } from "ag-grid-react";
import { data, useNavigate } from "react-router-dom";
import {
  ClientSideRowModelModule,
  ModuleRegistry,
  TextFilterModule,
  ValidationModule,
  createGrid,
} from "ag-grid-community";
import ViewSales from "./ViewSales";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  TextFilterModule,
  ValidationModule /* Development Only */,
]);
const Sales = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Email: "",
    ContactNo: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [productForm, setProductForm] = useState({
    product: "",
    checkIn: "",
    checkOut: "",
    quantity: 0,
    Rate: 0,
    amount: 0,
  });
  const [AmountForm, setAmountForm] = useState({
    upi: 0,
    cash: 0,
    credit: 0,
    NetAmount: 0,
  });
  const [clients, setClients] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [gridData, setGridData] = useState([]);
  const [products, setProducts] = useState([]);
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
          Customer_Id: selectedClient.Customer_Id,
        });

        if (response.status === 200 && response.data.Valid) {
          // Assuming 'credit' is returned inside the 'data' object in the response
          const credit = response.data.data[0]?.credit; // Access the 'credit' value from the response

          // You can now use this 'credit' value as needed
          console.log("Fetched credit:", credit);
          const finalCredit =
            credit !== null && credit !== undefined && credit !== ""
              ? credit
              : 0;
          // You can update the formData or handle the credit value in any other way
          setFormData({
            Email: selectedClient.Email,
            ContactNo: selectedClient.ContactNo,
            Balance: finalCredit,
          });
        } else {
          console.error(
            "Failed to fetch customer balance:",
            response.data.message
          );
        }
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

  const handleProChange = (e) => {
    const { name, value } = e.target;

    setProductForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProductChange = (e) => {
    const itemId = e.target.value;

    if (!products || products.length === 0) {
      console.warn("Products are not defined or empty");
      return;
    }
    const selectedProduct = products.find(
      (product) => product.Item_Id.toString() === itemId
    );

    if (selectedProduct) {
      setProductForm((prev) => ({
        ...prev,
        product: itemId,
        Rate: selectedProduct.Rate,
        amount: selectedProduct.amount,
      }));
      console.log(productForm);
    }
  };

  const handleCombinedChange = (e) => {
    handleProChange(e);
    handleProductChange(e);
  };

  const fetchProduct = async () => {
    try {
      const response = await axiosinstance.get("product/getProduct");
      if (response.status === 200 && response.data.Valid) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching Product data:", error);
    }
  };

  const handleSubmit = () => {};

  useEffect(() => {
    const userId = sessionStorage.getItem("UserId");
    if (!userId) {
      navigate("/"); // Redirect to login if UserId is not found
    }
    fetchClients();
    fetchProduct();
  }, []);
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleQuantityAndRateChange = (e) => {
    const { name, value } = e.target;

    setProductForm((prev) => {
      // Convert values to numbers htmlFor calculation
      const quantity =
        name === "quantity" ? Number(value) : Number(prev.quantity);
      const rate = name === "Rate" ? Number(value) : Number(prev.Rate);

      const updatedForm = {
        ...prev,
        [name]: value,
        amount: !isNaN(quantity) && !isNaN(rate) ? quantity * rate : 0, // Calculate amount
      };

      return updatedForm;
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const { product, checkIn, checkOut, quantity, Rate, amount } =
        productForm;

      if (!product || !checkIn || !checkOut || !quantity || !Rate || !amount) {
        alert("Please fill all product fields");
        return;
      }
      console.log(products);
      setGridData((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          product,
          checkIn,
          checkOut,
          quantity,
          Rate,
          amount,
        },
      ]);

      console.log(gridData);

      // Clear product form after adding
      setProductForm((prev) => ({
        ...prev,
        product: "",
        checkIn: "",
        checkOut: "",
        quantity: "",
        Rate: "",
        amount: "",
      }));

      // setSelectedProduct(""); // Reset product dropdown
    }
  };

  const columnDefs = [
    { headerName: "Product", field: "product", width: 200 },
    { headerName: "Check In", field: "checkIn", width: 120 },
    { headerName: "Check Out", field: "checkOut", width: 120 },
    { headerName: "Quantity", field: "quantity", width: 120 },
    { headerName: "Rate", field: "Rate", width: 120 },
    { headerName: "Amount", field: "amount", width: 120 },
  ];
  const gridOptions = {
    onGridReady: (params) => {
      // Automatically adjust the columns when the grid is ready
      params.api.sizeColumnsToFit();

      // Use params.columnApi.getAllColumns() instead of params.api.getAllColumns()
      const allColumns = params.columnApi.getAllColumns();

      if (allColumns) {
        allColumns.forEach((column) => {
          params.columnApi.autoSizeColumn(column.getColId());
        });
      }
    },
  };
  const handleTempSubmit = async (e) => {
    e.preventDefault(); // Prevent form default submission

    // Validate that required fields are filled
    if (!selectedCustomer || !gridData.length) {
      toast.error("Please select a customer and add at least one product!");
      return;
    }

    const payload = {
      User_Id: sessionStorage.getItem("UserId"),
      customerId: selectedCustomer,
      email: formData.Email,
      contactNo: formData.ContactNo,
      products: gridData, // Sending the gridData array as products
    };

    console.log("Payload:", payload);

    try {
      const response = await axiosinstance.post("sales/saleinsert", payload);

      if (response.status === 200 && response.data.Valid) {
        toast.success("Sales entry created successfully!");
        // Clear form data and grid after successful submission
        setFormData({ Email: "", ContactNo: "" });
        setGridData([]);
        setSelectedCustomer("");
      } else {
        toast.error(response.data.Message || "Failed to create sales entry");
      }
    } catch (error) {
      console.error("Error creating sales entry:", error);
      toast.error("Failed to create sales entry");
    }
  };
  const handleTransactionSelect = (id) => {
    axiosinstance
      .get(`sales/getSalesDetails/${id}`)
      .then((response) => {
        setGridData(response.data);
        if (response.data.length > 0) {
          const custdetail = {
            Email: response.data[0].Email || "",
            ContactNo: response.data[0].ContactNo || "",
          };
          setFormData(custdetail);
          setSelectedCustomer(response.data[0].Customer_Id || "");
        }
      })
      .catch((error) => {
        console.error("Error fetching sales details:", error);
      });
  };
  const handleRowClick = (event) => {
    const rowData = event.data;
    const selectedProduct = products.find((p) => p.Name === rowData.product);
    console.log(rowData.Item_Id);
    setProductForm({
      product: selectedProduct ? selectedProduct.Item_Id : "",
      checkIn: rowData.checkIn,
      checkOut: rowData.checkOut,
      quantity: rowData.quantity,
      Rate: rowData.Rate,
      amount: rowData.amount,
    });
    // setGridData((prevData) => prevData.filter((row) => row.id != rowData.id));
    // console.log("Updated Grid Data:", gridData);
  };
  const handleAmountChange = (e) => {
    const { name, value } = e.target;
    setAmountForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleMainSubmit = async (e) => {
    e.preventDefault(); // Prevent form default submission

    // Validate that required fields are filled
    if (!selectedCustomer || !gridData.length) {
      toast.error("Please select a customer and add at least one product!");
      return;
    }

    const payload = {
      User_Id: sessionStorage.getItem("UserId"),
      customerId: selectedCustomer,
      email: formData.Email,
      contactNo: formData.ContactNo,
      products: gridData, // Sending the gridData array as products
      Amount: AmountForm,
    };

    console.log("Payload:", payload);

    try {
      const response = await axiosinstance.post(
        "sales/salesinsertMain",
        payload
      );

      if (response.status === 200 && response.data.Valid) {
        toast.success("Sales entry created successfully!");
        // Clear form data and grid after successful submission
        setFormData({ Email: "", ContactNo: "" });
        setGridData([]);
        setSelectedCustomer("");
        setAmountForm([]);
      } else {
        toast.error(response.data.Message || "Failed to create sales entry");
      }
    } catch (error) {
      console.error("Error creating sales entry:", error);
      toast.error("Failed to create sales entry");
    }
  };
  useEffect(() => {
    if (productForm.checkIn && productForm.checkOut) {
      const newQuantity = calculateTimeDifference(
        productForm.checkIn,
        productForm.checkOut
      );

      setProductForm((prev) => ({
        ...prev,
        quantity: newQuantity,
      }));
    }
  }, [productForm.checkIn, productForm.checkOut]);
  const calculateTimeDifference = (checkIn, checkOut) => {
    const [checkInHours, checkInMinutes] = checkIn.split(":").map(Number);
    const [checkOutHours, checkOutMinutes] = checkOut.split(":").map(Number);

    let checkInTime = checkInHours * 60 + checkInMinutes; // Convert to minutes
    let checkOutTime = checkOutHours * 60 + checkOutMinutes;

    if (checkOutTime < checkInTime) {
      // Handle overnight case (e.g., Check-In: 23:30, Check-Out: 01:00)
      checkOutTime += 24 * 60;
    }

    return checkOutTime - checkInTime; // Return difference in minutes
  };

  return (
    <div className="container">
      <NavBar />
      <main id="main" className="main">
        <div className="row pagetitle">
          <div className="col-md-3">
            <h1>Sales</h1>
            <nav>
              <ol className="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="#">
                    <i class="bi bi-house-door"></i>
                  </a>
                </li>
                <li className="breadcrumb-item active">Transactions</li>
                <li className="breadcrumb-item active">Sales</li>
              </ol>
            </nav>
          </div>
          <div className="col-md-9 d-flex justify-content-end">
            <button type="reset" className="btn btn-outline-primary">
              Sales List
            </button>
          </div>
        </div>
        <section className="section">
          <div className="row">
            <div className="card">
              <div className="card-body">
                <form className="row g-3 mt-3" onSubmit={handleSubmit}>
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
                          <option
                            key={client.Customer_Id}
                            value={client.Customer_Id}
                          >
                            {client.Name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-3">
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
                        name="ContactNo"
                        placeholder="Contact No"
                        value={formData.Balance}
                        onChange={handleChange}
                        required
                        readOnly
                      />
                    </div>
                    <div className="col-md-1">
                      <label
                        htmlFor="inputState"
                        className="form-label"
                      ></label>
                      <div>
                        <button
                          type="button"
                          className="btn btn-outline-warning"
                          style={{ marginRight: "5px" }}
                          onClick={handleTempSubmit}
                        >
                          Wait
                        </button>
                      </div>
                    </div>
                    <div className="col-md-1">
                      <label
                        htmlFor="inputState"
                        className="form-label"
                      ></label>
                      <div>
                        <button
                          type="button"
                          className="btn btn-outline-info"
                          onClick={() => setModalIsOpen(true)}
                        >
                          View
                        </button>
                        {modalIsOpen && (
                          <ViewSales
                            isOpen={modalIsOpen}
                            onClose={() => setModalIsOpen(false)}
                            onSelectTransaction={handleTransactionSelect}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-2">
                      <label htmlFor="inputNanme4" className="form-label">
                        Product
                      </label>

                      <select
                        id="inputState"
                        className="form-select"
                        name="product"
                        value={productForm.product || ""}
                        onChange={handleCombinedChange}
                      >
                        <option value="">Select</option>
                        {products.map((product, index) => (
                          <option
                            key={product.Item_Id ?? index}
                            value={product.Item_Id}
                          >
                            {product.Name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-2">
                      <label htmlFor="inputTime" className="form-label">
                        Check In
                      </label>
                      <input
                        type="time"
                        className="form-control"
                        name="checkIn"
                        value={productForm.checkIn || ""}
                        onChange={handleCombinedChange}
                      />
                    </div>
                    <div className="col-2">
                      <label htmlFor="inputTime" className="form-label">
                        Check Out
                      </label>
                      <input
                        type="time"
                        className="form-control"
                        name="checkOut"
                        value={productForm.checkOut || ""}
                        onChange={handleCombinedChange}
                      />
                    </div>
                    <div className="col-2">
                      <label htmlFor="inputNanme4" className="form-label">
                        Quantity
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="quantity"
                        value={productForm.quantity}
                        onChange={handleQuantityAndRateChange}
                      />
                    </div>
                    <div className="col-2">
                      <label htmlFor="inputNanme4" className="form-label">
                        Rate
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="Rate"
                        value={productForm.Rate}
                        onChange={handleQuantityAndRateChange}
                      />
                    </div>
                    <div className="col-2">
                      <label htmlFor="inputNanme4" className="form-label">
                        Amount
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="amount"
                        value={productForm.amount}
                        onChange={handleProductChange}
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div
                      className="ag-theme-alpine custom-ag-grid"
                      style={{ height: "300px", width: "100%" }}
                    >
                      <AgGridReact
                        key={gridData.length} // React will re-render the grid when gridData changes
                        rowData={gridData}
                        columnDefs={columnDefs}
                        gridOptions={gridOptions}
                        onRowDoubleClicked={handleRowClick}
                      />
                    </div>
                  </div>
                  <div className="col-2">
                    <label htmlFor="inputNanme4" className="form-label">
                      Cash
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="cash"
                      value={AmountForm.cash}
                      onChange={handleAmountChange}
                    />
                  </div>
                  <div className="col-2">
                    <label htmlFor="inputNanme4" className="form-label">
                      UPI
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="upi"
                      value={AmountForm.upi}
                      onChange={handleAmountChange}
                    />
                  </div>
                  <div className="col-2">
                    <label htmlFor="inputNanme4" className="form-label">
                      Credit
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="credit"
                      value={AmountForm.credit}
                      onChange={handleAmountChange}
                    />
                  </div>
                  <div className="col-2">
                    <label htmlFor="inputNanme4" className="form-label">
                      Net Amount
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="NetAmount"
                      value={AmountForm.NetAmount}
                      onChange={handleAmountChange}
                    />
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <button
                      type="submit"
                      className="btn btn-outline-success"
                      style={{ marginRight: "10px" }}
                      onClick={handleMainSubmit}
                    >
                      Submit
                    </button>
                    <button type="reset" className="btn btn-outline-secondary">
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Sales;
