import mongoose from "mongoose";
import { materialType } from "../utils/typeEnum.js";

const materialSchema = new mongoose.Schema(
    {
      title : {
        type : String,
        required : true,
      },
      author : {
        type : String,
      },
      publicationYear : {
        type : String,
      },
      editionYear : {
        type : String,
      },
      quantity : {
        type : Number,
        required : true,
      },
      genre : {
        type : String,
      },
      type : {
        type : String,
        enum: materialType,
      },
      price : {
        type : Number,
        required : true,
      },
      description : {
        type : String,
      },
      coverImage : {
        type : String,
      }
    },
    {
        timestamps: true
    }
)


export const Material = mongoose.model("Material", materialSchema);