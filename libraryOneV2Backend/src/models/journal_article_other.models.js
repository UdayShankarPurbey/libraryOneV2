import mongoose from "mongoose";
import { materialType } from "../utils/typeEnum.js";

const journal_Article_OtherSchema = new mongoose.Schema(
    {
      name : {
        type : String,
        required : true,
      },
      author : {
        type : String,
      },
      publicationYear : {
        type : Number,
      },
      editionYear : {
        type : Number,
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
        required : true,
        enum: materialType,
      }
    },
    {
        timestamps: true
    }
)


export const Journal_Article_Other = mongoose.model("Journal_Article_Other", journal_Article_OtherSchema);