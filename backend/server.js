

const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sendEmail = require("./utils/sendEmail");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Email API",
      version: "1.0.0",
      description: "API for sending emails",
      contact: {
        name: "Developer",
        email: "baudoinvicbolingo@gmail.com",
      },
      servers: [
        {
          url: "http://localhost:5000",
        },
      ],
    },
  },
  apis: ["./server.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Home route
app.get("/", (req, res) => {
  res.send("Home Page");
});

/**
 * @swagger
 * /api/sendemail:
 *   post:
 *     summary: Send an email to a subscriber
 *     description: Sends an email to a user who subscribed.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the subscriber
 *                 example: example@example.com
 *     responses:
 *       200:
 *         description: Email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 */
app.post("/api/sendemail", async (req, res) => {
  const { email,message } = req.body;
  try {
       const send_to = process.env.EMAIL_USER; // Your email to receive the message
       const sent_from = email; 
       const reply_to = email;
       const subject = "";
       const content = `
      <p>new subscribe :</p>
      <p> ${message}</p>
      <p>has subscribing to our newsletter.</p>
    `;

    await sendEmail(subject, message, send_to, sent_from, reply_to);
    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Send a message via the contact form
 *     description: Sends an email with the user's contact information and message.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: First name of the user
 *                 example: John
 *               lastname:
 *                 type: string
 *                 description: Last name of the user
 *                 example: Doe
 *               email:
 *                 type: string
 *                 description: Email of the user
 *                 example: john.doe@example.com
 *               message:
 *                 type: string
 *                 description: Message content from the user
 *                 example: "This is a message from the contact form."
 *     responses:
 *       200:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 */
app.post("/api/contact", async (req, res) => {
  const { firstname, lastname, email, message } = req.body;
  try {
    const send_to = process.env.EMAIL_USER; 
    const reply_to = email;
    const subject = "";
    const content = `

      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    await sendEmail(subject, content, send_to, sent_from, reply_to);
    res.status(200).json({ success: true, message: "Message Sent" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
