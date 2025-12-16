import mongoose from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';



const videoSchema = new mongoose.Schema({
  videoFile : {
    type : String,
    required : true, //URL from our bucket
  },
  thumbnail : {
    type : String ,//URL from our bucket
    required : true,
  },
  title : {
    type : String,
    required : true
  },
 description : {
    type : String,
    required : true
  },
  duration : {
    type : Number, // Coming from cloudinary in seconds
    default : 0,
  },
  views : {
    type : Number,
    default : 0,
  },
  isPublished : 
  {
    type : Boolean ,
    required : true,
    default : true,
  },
  ownder : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    required : true,
  }
}, {timestamps:true});



videoSchema.plugin(mongooseAggregatePaginate); // Now we can write aggregate paginations








export const Video = mongoose.model("Video", videoSchema);