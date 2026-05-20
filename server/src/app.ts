import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes";

const app = express();

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use("/api", routes);

app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "LeadFlow CRM API Running",
  });
});

export default app;