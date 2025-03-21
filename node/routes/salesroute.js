import express from "express"; //keeping the master routes together
const router = express.Router();
import { SalesInsert, viewSales } from "../controller/salescontroller.js";
router.post("/saleinsert", SalesInsert);
router.get("/getViewSales", viewSales);
export default router;
