const express = require("express");
const router = express.Router();
const {
  SalesInsert,
  viewSales,
  getSalesDetails,
  SalesInsertMain,
  ReceiptInsert,
  getReceiptDetails, 
  GetSalesRegister
} = require("../controller/salescontroller.js");

router.post("/saleinsert", SalesInsert);
router.get("/getViewSales", viewSales);
router.get("/getSalesDetails/:id", getSalesDetails);
router.post("/salesinsertMain", SalesInsertMain);
router.post("/ReceiptInsert", ReceiptInsert);
router.get("/getReceiptDetails/:id", getReceiptDetails);
router.get("/GetSalesRegister/:id", GetSalesRegister);

module.exports = router;
