import express from "express";
import folderRouter from "./routes/folder.route.js";
import dbConnection from "./config/dbConnection.js";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/folder", folderRouter);

async function main() {
  await dbConnection();

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}

main();
