const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const sendMailer = async (email, subject, text) => {
  try {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "cheatcodes1115@gmail.com",
        pass: process.env.APP_PASS_KEY,
      },
    });

    const mailOptions = {
      from: "cheatcodes1115@gmail.com",
      to: email,
      subject: subject,
      html: text,
    };
    console.log(email);
    const info = await transport.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error(" Error:", error.message);
    return { success: false, error: error.message };
  }
};

module.exports = sendMailer;
