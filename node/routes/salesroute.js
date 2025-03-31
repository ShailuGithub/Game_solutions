const express = require("express");
const router = express.Router();
const {
  SalesInsertWait,
  viewSales,
  getSalesDetails,
  SalesInsertMain,
  ReceiptInsert,
  getReceiptDetails,
  GetSalesRegister,
  viewMainSales,
  SalesUpdateWait,
  GetSalesTodayCount,
  GetSalesTodayLiveCount,
  GetSalesTodayCompletedCount,
} = require("../controller/salescontroller.js");

router.post("/SalesInsertWait", SalesInsertWait);
router.get("/getViewSales", viewSales);
router.get("/getSalesDetails/:id", getSalesDetails);
router.post("/salesinsertMain", SalesInsertMain);
router.post("/ReceiptInsert", ReceiptInsert);
router.get("/getReceiptDetails/:id", getReceiptDetails);
router.get("/GetSalesRegister/:id", GetSalesRegister);
router.get("/getMainViewSales", viewMainSales);
router.post("/SalesUpdateWait", SalesUpdateWait);
router.get("/GetSalesTodayCount", GetSalesTodayCount);
router.get("/GetSalesTodayLiveCount", GetSalesTodayLiveCount);
router.get("/GetSalesTodayCompletedCount", GetSalesTodayCompletedCount);

module.exports = router;
