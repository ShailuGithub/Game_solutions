const pool = require("../connection.js").pool;

const SalesInsertWait = async (req, res) => {
  const { customerId, email, contactNo, User_Id, products } = req.body;
  console.log(req.body);

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
      const [itemResult] = await connection.execute(
        `SELECT Item_Id FROM product_master WHERE Name = ?`,
        [product.product]
      );
      itemId = itemResult[0].Item_Id;
      await connection.execute(
        `INSERT INTO tb_se_item_wait 
        (Main_Id, Item_Id, Quantity, Rate, Amount, CheckIn, CheckOut)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          mainId,
          itemId,
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
const viewSales = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT a.id, RIGHT(CONCAT('00000', CAST(a.id AS CHAR)), 5) AS Tran_No, a.Tran_Date, b.Name, b.ContactNo, a.Net_Amount 
       FROM tb_se_main_wait a 
       JOIN client_master b ON a.Customer_Id = b.Customer_Id`
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching sales data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSalesDetails = async (req, res) => {
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

const SalesInsertMain = async (req, res) => {
  const {
    customerId,
    email,
    contactNo,
    User_Id,
    products,
    selectedId,
    Amount,
  } = req.body;
  console.log(req.body);

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
      `INSERT INTO tb_se_main 
      (Tran_Date, Tran_No, Customer_Id, Net_Amount, User_id, Entry_Date, Cash, Upi, Credit)
      VALUES (NOW(), UUID(), ?, ?, ?, NOW(), ?, ?, ?)`,
      [
        customerId,
        Amount.NetAmount, // Net_Amount not proper
        1,
        Amount.cash,
        Amount.upi,
        Amount.credit,
      ]
    );
    const mainId = mainRes.insertId;
    for (const product of products) {
      const [itemResult] = await connection.execute(
        `SELECT Item_Id FROM product_master WHERE Name = ?`,
        [product.product]
      );
      itemId = itemResult[0].Item_Id;
      await connection.execute(
        `INSERT INTO tb_se_item 
        (Main_Id, Item_Id, Quantity, Rate, Amount, CheckIn, CheckOut)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          mainId,
          itemId,
          product.quantity,
          product.Rate,
          product.amount,
          product.checkIn,
          product.checkOut,
        ]
      );
    }

    //Delete Main
    await connection.execute(`DELETE FROM tb_se_item_wait WHERE Main_Id = ?`, [
      selectedId,
    ]);

    await connection.execute(`DELETE FROM tb_se_main_wait WHERE Id = ?`, [
      selectedId,
    ]);
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

const SalesUpdateWait = async (req, res) => {
  const { customerId, email, contactNo, User_Id, products, selectedId } =
    req.body;
  console.log(req.body);

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

    //Delete Main
    await connection.execute(`DELETE FROM tb_se_item_wait WHERE Main_Id = ?`, [
      selectedId,
    ]);

    await connection.execute(`DELETE FROM tb_se_main_wait WHERE Id = ?`, [
      selectedId,
    ]);

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
      const [itemResult] = await connection.execute(
        `SELECT Item_Id FROM product_master WHERE Name = ?`,
        [product.product]
      );
      itemId = itemResult[0].Item_Id;
      await connection.execute(
        `INSERT INTO tb_se_item_wait 
        (Main_Id, Item_Id, Quantity, Rate, Amount, CheckIn, CheckOut)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          mainId,
          itemId,
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
const ReceiptInsert = async (req, res) => {
  if (
    !req.body ||
    !req.body.customerId ||
    !req.body.Amount ||
    !req.body.User_Id
  ) {
    return res.status(400).json({
      Valid: false,
      message: "Please enter the mandatory fields",
    });
  }
  console.log(req.body);
  // Extract fields from request body
  const { customerId, Balance, Amount, User_Id } = req.body;

  try {
    // Insert client data into database
    const [result] = await pool.query(
      `INSERT INTO tb_receipt (customer_Id, Balance, Amount, UserId , Entry_Date) 
       VALUES (?, ?, ?, ?, NOW())`,
      [customerId, Balance, Amount.Amount, User_Id]
    );
    if (result.affectedRows > 0) {
      console.log("Receipt insertion successful");
      return res.json({
        Valid: true,
        message: "Receipt insertion successful",
      });
    } else {
      console.log("Receipt insertion failed");
      return res.status(400).json({
        Valid: false,
        message: "Receipt insertion failed",
      });
    }
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      Valid: false,
      message: "Internal Server Error",
    });
  }
};

const getReceiptDetails = async (req, res) => {
  console.log(req);
  const { id } = req.params; // Get selected transaction ID
  try {
    const [rows] = await pool.execute(
      `SELECT b.Name,b.ContactNo,a.Amount,a.Entry_date,a.Balance FROM node.tb_receipt a,client_master b where a.Customer_Id=b.Customer_Id and a.customer_id=? order by a.entry_date desc;`,
      [id]
    );
    console.log(rows);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching Receipt details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const GetSalesRegister = async (req, res) => {
  const { id } = req.params; // Get selected transaction ID
  const { fromdate, todate } = req.query; // Extract fromdate and todate from query parameters

  // Validate if fromdate and todate are provided
  if (!fromdate || !todate) {
    return res
      .status(400)
      .json({ error: "Both fromdate and todate are required" });
  }

  try {
    // SQL query will vary based on whether Customer_Id is provided or not
    let query = `SELECT a.Tran_Date, RIGHT(CONCAT('00000', CAST(a.id AS CHAR)), 5) AS Tran_No, b.Name, b.ContactNo, a.Net_Amount, a.Cash, a.Upi, a.Credit 
                 FROM tb_se_main a
                 JOIN client_master b ON a.Customer_Id = b.Customer_Id
                 WHERE DATE(a.Tran_Date) BETWEEN ? AND ?`;

    // If id (Customer_Id) is provided, add the condition to filter by Customer_Id
    let queryParams = [fromdate, todate];
    if (id && id !== "0") {
      query += ` AND a.Customer_Id = ?`;
      queryParams.push(id); // Add the id to the query parameters
    }

    const [rows] = await pool.execute(query, queryParams);

    console.log(rows);
    res.json(rows); // Send the results as the response
  } catch (error) {
    console.error("Error fetching Sales Register details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const viewMainSales = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT a.id,RIGHT(CONCAT('00000', CAST(a.id AS CHAR)), 5) AS Tran_No,a.Tran_Date,b.Name,b.ContactNo,a.Net_Amount FROM node.tb_se_main a,node.client_master 
      b where a.Customer_Id=b.Customer_Id;`
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching sales data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const GetSalesTodayCount = async (req, res) => {
  console.log("GetSalesTodayCount");
  try {
    // SQL query will vary based on whether Customer_Id is provided or not
    let query = `SELECT SUM(SalesTodayCount) AS SalesTodayCount
FROM (
    SELECT count(*) AS SalesTodayCount 
    FROM node.tb_se_main 
    WHERE DATE(Tran_Date) = CURDATE()
    UNION ALL
    SELECT count(*) AS SalesTodayCount 
    FROM node.tb_se_main_wait 
    WHERE DATE(Tran_Date) = CURDATE()
) AS CombinedCounts;
`;

    const [rows] = await pool.execute(query);

    if (rows.length > 0) {
      console.log("Sales Today Count fetched successfully");
      return res.json({
        Valid: true,
        SalesTodayCount: rows[0].SalesTodayCount,
      });
    } else {
      console.log("No Sales Today Count found");
      return res.status(404).json({
        Valid: false,
        message: "No Sales Today Count found",
      });
    } // Send the results as the response
  } catch (error) {
    console.error("Error fetching Sales Today Count", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const GetSalesTodayLiveCount = async (req, res) => {
  console.log("GetSalesTodayLiveCount");
  try {
    // SQL query will vary based on whether Customer_Id is provided or not
    let query = `SELECT count(*) as SalesTodayLiveCount FROM node.tb_se_main_wait where DATE(Tran_Date)= CURDATE()`;

    const [rows] = await pool.execute(query);

    if (rows.length > 0) {
      console.log("Sales Today Live Count fetched successfully");
      return res.json({
        Valid: true,
        SalesTodayLiveCount: rows[0].SalesTodayLiveCount,
      });
    } else {
      console.log("No Sales Today Live Count found");
      return res.status(404).json({
        Valid: false,
        message: "No Sales Today Live Count found",
      });
    } // Send the results as the response
  } catch (error) {
    console.error("Error fetching Sales Today Count", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const GetSalesTodayCompletedCount = async (req, res) => {
  console.log("GetSalesTodayCompletedCount");
  try {
    // SQL query will vary based on whether Customer_Id is provided or not
    let query = `SELECT count(*) as SalesTodayCompletedCount FROM node.tb_se_main where DATE(Tran_Date)= CURDATE()`;

    const [rows] = await pool.execute(query);

    if (rows.length > 0) {
      console.log("Sales Today Live Count fetched successfully");
      return res.json({
        Valid: true,
        SalesTodayCompletedCount: rows[0].SalesTodayCompletedCount,
      });
    } else {
      console.log("No Sales Today Live Count found");
      return res.status(404).json({
        Valid: false,
        message: "No Sales Today Live Count found",
      });
    } // Send the results as the response
  } catch (error) {
    console.error("Error fetching Sales Today Count", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
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
};
