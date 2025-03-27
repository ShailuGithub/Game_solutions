const express = require("express");
const router = express.Router();
const {
  SalesInsert,
  viewSales,
  getSalesDetails,
  SalesInsertMain,
} = require("../controller/salescontroller.js");

router.post("/saleinsert", SalesInsert);
router.get("/getViewSales", viewSales);
router.get("/getSalesDetails/:id", getSalesDetails);
router.post("/salesinsertMain", SalesInsertMain);

module.exports = router;
