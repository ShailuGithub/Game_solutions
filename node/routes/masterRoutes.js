const express = require("express"); // Keeping the master routes together
const router = express.Router();
const masterController = require("../controller/masterController.js");

router.post("/master", masterController.Clientinsert);
router.get("/", masterController.getCustomer);
router.put("/updatemaster", masterController.ClientUpdate);
router.post("/getCustomerBalance", masterController.GetCustomerBalance);

module.exports = router;
