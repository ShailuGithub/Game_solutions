import { useEffect, useState } from "react";
import axiosinstance from "../../utils/axiosinstance";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../NavBar";

const Receipt = () => {
  const [formData, setFormData] = useState({
    Email: "",
    ContactNo: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form refresh

    // Validate if customer is selected
    if (selectedCustomer === "0") {
      toast.error("Please select a customer");
      return; // Stop form submission
    }

    // Validate amount field
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount");
      return; // Stop form submission
    }

    try {
      const response = await axiosinstance.post("master/client", FormData);

      if (response.status === 200) {
        toast.success("Client insertion successful");
        setFormData({
          Name: "",
          Address: "",
          ContactNo: "",
          Email: "",
          UserId: "",
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Error inserting client data");
    }
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

                    <div className="col-md-2">
                      <label htmlFor="inputState" className="form-label">
                        Amount
                      </label>
                      <input type="text" className="form-control" required />
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <button
                      type="submit"
                      className="btn btn-outline-success"
                      style={{ marginRight: "10px" }}
                    >
                      Save
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
      <ToastContainer />
    </div>
  );
};

export default Receipt;
