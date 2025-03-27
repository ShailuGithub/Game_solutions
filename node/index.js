const express = require("express");
const { checkconnection } = require("./connection.js");
const cors = require("cors");
const app = express();
const routes = require("./routes/routes.js");
const masterroute = require("./routes/masterRoutes.js");
const productmasterroute = require("./routes/ProductmasterRoutes.js");
const salesroute = require("./routes/salesroute.js");
app.use(express.json()); //middleware

app.use(cors());
app.use("/auth", routes);
app.use("/client", masterroute);
app.use("/product", productmasterroute);
app.use("/sales", salesroute);
const PORT = 3003;
app.listen(PORT, async () => {
  console.log(`server started at ${PORT}`);
  try {
    await checkconnection();
  } catch (error) {
    console.log(error);
  }
});
