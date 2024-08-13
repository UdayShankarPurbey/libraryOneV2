import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
      name : {
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
      }
    },
    {
        timestamps: true
    }
)


export const Book = mongoose.model("Book", bookSchema);