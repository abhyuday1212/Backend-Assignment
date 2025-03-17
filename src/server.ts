import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import logger from "./utils/logger.js";
import { Connection } from "./config/db.js";
import { errorHandler } from "./middlewares/error.middleware.js";

// "dev": "nodemon --watch src --ext ts --ignore dist/ --exec \"tsc --build && node dist/src/server.js\""

dotenv.config();

const app = express();

// #1 Middlewares -->
app.use(cors());

// #2 Important Middlewares
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(helmet()); // for security

// #3 security -->
// #3.1 Rate limiter
const limiter = rateLimit({
  max: 100, // limit each IP to 100 requests per windowMs
  windowMs: 10 * 60 * 1000, // 10 minutes
  message: "Too many requests from this IP, please try again after 10 minutes.",
});

app.use(limiter);

// #4 loggers
const morganFormat = ":method :url :status - :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// # 5.1 Import all routes
import userRouter from "./routes/form.routes.js";

// #5 Setup All routes
app.use("/api/v1/form", userRouter);

// #6 Global error handling
app.use(errorHandler);

// #7 PORT
const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    // connect to DB
    await Connection();
    app.listen(PORT, () =>
      console.log(`Server is running successfully on PORT ${PORT}`)
    );
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

if (process.env.NODE_ENV !== "test") {
  startServer();
}

// exporting app for running test cases
export { app };
