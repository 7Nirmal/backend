import {mongoose} from "mongoose";

const fileschema = new mongoose.Schema({
    file:{type:String, required:true}
});


export const filedb =   new mongoose.model("files",fileschema);