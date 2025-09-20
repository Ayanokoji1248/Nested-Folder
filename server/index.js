import express from "express";
import folderRouter from "./routes/folder.route.js";
import dbConnection from "./config/dbConnection.js";
const app = express();

app.use(express.json());

app.use("/folder", folderRouter);

async function main() {
  await dbConnection();

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}

main();
