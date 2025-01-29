const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoute = require("./src/routes/userRoute");

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors({ origin: '*' })); // Allow all origins, adjust as needed
app.use(express.json()); // Built-in JSON body parsing

// API Routes
app.use("/api", userRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
