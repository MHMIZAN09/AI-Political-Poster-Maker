import express, { Request, Response, type Application } from "express";
import cors from "cors";
import { authRouter } from "./modules/auth/auth.route";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Welcome to the Poster App API!",
  });
});

app.use("/api/auth", authRouter);

export default app;
