import {mongoose} from "mongoose";


const recruiterschema = new mongoose.Schema({
    email: {type:String, required:true},
    password:{type:String, required:true}
})

export const recruiterdb = new mongoose.model("recruiters",recruiterschema)