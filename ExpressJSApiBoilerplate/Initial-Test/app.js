import 'dotenv/config'
import express from "express";
import { homeRoutes } from "./routes/homeRoutes.js";
import { mathRoutes } from "./routes/mathRoutes.js";
import { generalErrorHandler, notFoundHandler } from "./utils/errorUtils.js";

const app = express();
const port = process.env.PORT || 3000;

// Use json body
app.use(express.json());

// Use the routes
app.use("/", homeRoutes);
app.use("/math", mathRoutes);

// Middlewares (Order matters!)
app.use(notFoundHandler);
app.use(generalErrorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
