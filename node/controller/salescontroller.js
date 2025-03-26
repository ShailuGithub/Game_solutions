import { pool } from "../connection.js";

export const SalesInsert = async (req, res) => {
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
export const viewSales = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT a.id, a.Tran_No, a.Tran_Date, b.Name, b.ContactNo, a.Net_Amount 
       FROM tb_se_main_wait a 
       JOIN client_master b ON a.Customer_Id = b.Customer_Id`
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching sales data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSalesDetails = async (req, res) => {
  const { id } = req.params; // Get selected transaction ID
  try {
    const [rows] = await pool.execute(
      `SELECT a.id,a.Tran_No,a.Tran_Date,a.Customer_Id,b.Name,b.ContactNo,b.Email,a.Net_Amount,
              c.Item_Id,d.Name as product,c.CheckIn as checkIn,c.CheckOut as checkOut,c.Quantity as quantity,c.Rate,c.Amount as amount
       FROM tb_se_main_wait a
       JOIN client_master b ON a.Customer_Id = b.Customer_Id
       JOIN tb_se_item_wait c ON a.id = c.Main_Id
       JOIN product_master d ON c.Item_Id = d.Item_id
       WHERE a.id = ?`,
      [id]
    );
    console.log(rows);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching sales details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const SalesInsertMain = async (req, res) => {
  const { customerId, email, contactNo, User_Id, products, Amount } = req.body;

  if (!customerId || !products || products.length === 0) {
    return res.status(400).json({ error: "Invalid request data" });
  }
  const cash = parseFloat(Amount.cash) || 0;
  const upi = parseFloat(Amount.upi) || 0;
  const credit = parseFloat(Amount.credit) || 0;
  // const netAmount = parseFloat(Amount.NetAmount) || 0;
  // if (netAmount !== cash + upi + credit) {
  //   return res
  //     .status(400)
  //     .json({ error: "Net Amount does not match sum of payment methods" });
  // }
  const netAmount = parseFloat(
    products.reduce((sum, product) => sum + Number(product.amount), 0)
  );

  console.log(netAmount, products);

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [mainRes] = await connection.execute(
      `INSERT INTO tb_se_main 
      (Tran_Date, Tran_No, Customer_Id, Net_Amount, User_id, Entry_Date, Cash, Upi, Credit)
      VALUES (NOW(), UUID(), ?, ?, ?, NOW(), ?, ?, ?)`,
      [
        customerId,
        netAmount, // Net_Amount not proper
        1,
        cash,
        upi,
        credit,
      ]
    );
    const mainId = mainRes.insertId;
    for (const product of products) {
      console.log(product.Item_Id);
      await connection.execute(
        `INSERT INTO tb_se_item 
        (Main_Id, Item_Id, Quantity, Rate, Amount, CheckIn, CheckOut)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          mainId,
          product.Item_Id,
          product.quantity,
          product.Rate,
          product.amount,
          product.checkIn,
          product.checkOut,
        ]
      );
    }
    await connection.execute(`DELETE FROM tb_se_item_wait WHERE Main_Id = ?`, [
      mainId,
    ]);

    await connection.execute(`DELETE FROM tb_se_main_wait WHERE Id = ?`, [
      mainId,
    ]);
    console.log("deleted 2 tbs ");
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
// export default { viewSales, SalesInsert };
