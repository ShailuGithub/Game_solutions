import { pool } from "../connection.js";

const SalesInsert = async (req, res) => {
  const { customerId, email, contactNo, User_Id, products } = req.body;

  if (!customerId || !products || products.length === 0) {
    return res.status(400).json({ error: "Invalid request data" });
  }
  const netAmount = parseFloat(
    products.reduce((sum, product) => sum + Number(product.amount), 0)
  );

  console.log(netAmount, User_Id);

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [mainRes] = await connection.execute(
      `INSERT INTO tb_se_main_wait 
      (Tran_Date, Tran_No, Customer_Id, Net_Amount, User_id, Entry_Date, Cash, Upi, Credit)
      VALUES (NOW(), UUID(), ?, ?, ?, NOW(), 0, 0, 0)`,
      [
        customerId,
        netAmount, // Net_Amount not proper
        1,
      ]
    );
    const mainId = mainRes.insertId;
    for (const product of products) {
      await connection.execute(
        `INSERT INTO tb_se_item_wait 
        (Main_Id, Item_Id, Quantity, Rate, Amount, CheckIn, CheckOut)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          mainId,
          product.product,
          product.quantity,
          product.Rate,
          product.amount,
          product.checkIn,
          product.checkOut,
        ]
      );
    }
    await connection.commit();

    res.status(200).json({
      Valid: true,
      message: "Data inserted successfully",
      mainId,
    });
  } catch (error) {
    await connection.rollback();
    console.error("Error:", error);
    res.status(500).json({
      Valid: false,
      error: "Internal Server Error",
      details: error.message,
    });
  }
};
export default SalesInsert;
