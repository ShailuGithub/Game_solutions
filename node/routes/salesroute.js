import express from "express"; //keeping the master routes together
const router = express.Router();
import SalesInsert from "../controller/salescontroller.js";
router.post("/saleinsert", SalesInsert);
export default router;
