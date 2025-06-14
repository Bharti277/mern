const express = require("express");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const connectDB = require("./utils/db");
const dotenv = require("dotenv");
const errorMiddleware = require("./middleware/error-middleware");
const cors = require("cors");

dotenv.config(); // Load environment variables from .env file

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions)); // Enable CORS for all routes

app.use(express.json()); //middleware JSON request bodies

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);

app.use(errorMiddleware);

// app.get("/", (req, res) => {
//   res.status(200).send("Hello, World!");
// });

const PORT = 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is up & running on http://localhost:5000");
  });
});
