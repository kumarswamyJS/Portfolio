import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index.ejs");
});

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/mail", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await resend.emails.send({
      from: "Your Website <onboarding@resend.dev>", // or a verified domain
      to: process.env.EMAIL_USER,
      subject: "New Contact Form Submission",
      text: `
        You have a new message:
        -----------------------
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    });
    res
      .status(200)
      .json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});
// --- END ---

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
