import express, { Request, Response } from "express";
import BaseRoute from "./base.route";
const app = express();
const port = 3000;

// Middleware to parse incoming JSON data
app.use(express.json());


app.use("/", new BaseRoute().router);


// Error handling middleware
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});