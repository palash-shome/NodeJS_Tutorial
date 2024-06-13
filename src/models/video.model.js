import mongoose, {Schema, model} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile : {
            type : String, // Cloudinary Url
            required : true,
            },

            thumbnail : {
                type : String, // Cloudinary Url
                required : true,
            },

            title : {
            type : String, 
            required : true,
            },

            description : {
                type : String, 
                required : true,
            },
            duration : {
                type : Number,  // From Cloudinary 
                required : true,
            },
            views : {
                type : Number, 
                default : 0
            },

            ispublished : {
                type : Boolean, 
                default : true,
                
            },
            owner : {
                type : Schema.Types.ObjectId,
                ref : "User"
            }

    },
    {
        timestamps:true
    }
)

//aggregation pipelines
videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video",videoSchema)