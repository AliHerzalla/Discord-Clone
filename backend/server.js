import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/database.js";

/* -------------------------------------------------------------------------- */
/*                                   Routes                                   */
/* -------------------------------------------------------------------------- */
import profileRoutes from "./routes/ProfileRoutes.js";
import serverRoutes from "./routes/ServerRoutes.js";
import memberRoutes from "./routes/MemberRoutes.js";

/* -------------------------------------------------------------------*/

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use("/uploads", express.static("uploads"));


const PORT = 3000 || process.env.PORT;

// DB connection
connectDB();

app.use("/", profileRoutes);
app.use("/", serverRoutes);
app.use("/", memberRoutes);

// server connection
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
