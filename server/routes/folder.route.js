import { Router } from "express";
import folderModel from "../models/folder.model.js";
const folderRouter = Router();

folderRouter.post("/create", async (req, res) => {
  try {
    const { folderName, parentFolder } = req.body;

    const folder = new folderModel({
      folderName,
      parentFolder: parentFolder || null,
    });
    await folder.save();

    res.status(201).json({
      message: "Folder Created",
      folder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

folderRouter.get("/", async (req, res) => {
  try {
    const { parent } = req.query;
    const folders = await folderModel.find({ parentFolder: parent || null });
    res.json(folders);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

export default folderRouter;
