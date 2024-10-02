
const nodemailer = require("nodemailer");

const sendEmail = async (
  subject,
  message,
  send_to,
  userEmail,
  userName,
  sent_from,
  reply_to
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: "587",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const options = {
    from: `"${userName}" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: userEmail,
    subject: `${subject} - From: ${userEmail}`,
    html: message,
     
  };

  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;

