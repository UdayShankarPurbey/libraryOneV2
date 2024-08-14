import mongoose from "mongoose";
import { departmentTagType } from "../utils/typeEnum.js";

const bookSchema = new mongoose.Schema(
    {
      title : {
        type : String,
        required : true,
      },
      author : {
        type : String,
        required : true,
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
      tag : [
        {
          type : String,
          enum: departmentTagType,
        }
      ],
      price : {
        type : Number,
        required : true,
      },
      description : {
        type : String,
      },
      bookCoverImage : {
        type : String,
      },

    },
    {
        timestamps: true
    }
)


export const Book = mongoose.model("Book", bookSchema);