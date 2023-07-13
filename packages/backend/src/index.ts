import bodyParser from "body-parser";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cron from "node-cron";
import { processSendRequest } from "./controllers/SendRequestController";
import { validateSendRequest } from "./controllers/validators";
import { AppDataSource } from "./data-source";
import { sendEmails } from "./workers/SendEmail";

// Async functions are not allowed at top level, so we use a wrapper
async function main() {
  // Load environment
  dotenv.config();

  // Initialize the DB connection
  await AppDataSource.initialize();

  // Schedule email job every 15 seconds
  cron.schedule("*/15 * * * * *", sendEmails);

  // Start REST API
  const app: Express = express();
  const port = process.env.PORT;

  // Accept requests with body in json
  app.use(bodyParser.json());

  // Set up POST endpoint
  app.post("/sendRequest", async (req: Request, res: Response) => {
    try {
      await validateSendRequest(req.body);
      await processSendRequest(req.body);
      res.json({ result: `Request processed correctly` });
    } catch (e: unknown) {
      if (e instanceof Error) res.json({ result: e.toString() });
      res.status(400).end();
    }
  });

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
}

main().catch((error) => console.error(error));
