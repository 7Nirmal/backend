import {mongoose} from "mongoose";

const jobschema  = new mongoose.Schema({
    position:{type:String ,required:true},
    company:{type:String,required:true},
    location:{type:String ,required:true},
    CTC:{type:String},
    experience:{type:String},
    skills:{type:String,required:true},
    appliedcandidates:{type:[]}
},
{
    timestamps:true,
})

export const jobseeker = new mongoose.model("jobdetails",jobschema);

