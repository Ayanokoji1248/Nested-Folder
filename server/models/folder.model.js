import mongoose, { model, Schema } from "mongoose";

const folderSchema = new Schema(
  {
    folderName: String,
    parentFolder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "folder",
      default: null,
    },
  },
  { timestamps: true }
);

const folderModel = mongoose.model("folder", folderSchema);

export default folderModel;
