import mongoose from "mongoose";

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
        enum: ['Article', 'Booklet', 'Conference Paper', 'Dissertation', 'Editorial', 'Magazine Article', 'Newspaper Article', 'Research Paper', 'Report', 'Thesis', 'Unpublished Work' , 'cd' , 'other']
      }
    },
    {
        timestamps: true
    }
)


export const Journal_Article_Other = mongoose.model("Journal_Article_Other", journal_Article_OtherSchema);