import app from "./app";
import connectDB from "./config/db";
import { config } from "./config/env";


const startServer = async () => {
  try {
    await connectDB();
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

// mizanurcsegub_db_user
// q0If5soJQy7YXSQv

startServer();
