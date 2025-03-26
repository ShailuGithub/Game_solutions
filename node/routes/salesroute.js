import express from "express";
const router = express.Router();
import {
  SalesInsert,
  viewSales,
  getSalesDetails,
  SalesInsertMain,
} from "../controller/salescontroller.js";
router.post("/saleinsert", SalesInsert);
router.get("/getViewSales", viewSales);
router.get("/getSalesDetails/:id", getSalesDetails);
router.post("/salesinsertMain", SalesInsertMain);
export default router;
