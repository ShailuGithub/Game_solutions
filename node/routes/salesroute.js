import express from "express"; //keeping the master routes together
const router = express.Router();
import {
  SalesInsert,
  viewSales,
  getSalesDetails,
} from "../controller/salescontroller.js";
router.post("/saleinsert", SalesInsert);
router.get("/getViewSales", viewSales);
router.get("/getSalesDetails/:id", getSalesDetails);
export default router;
