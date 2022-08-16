import {mongoose} from "mongoose";


const userschema = new mongoose.Schema({  
firstname: {type:String, required:true}, 
lastname: {type:String, required:true}, 
age:{type:String, required:true},
number:{type:Number, required:true}, 
email:{type:String, required:true},
qualification:{type:String, required:true,uppercase:true},
degree:{type:String, required:true},
department:{type:String, required:true},
university:{type:String, required:true},
batch:{type:String, required:true},
type:{type:String, required:true},
role:{type:String, required:true},
CTC:{type:String, required:true},
appliedjobs:{type:[], required:true}
},
{
    timestamps:true,
});

export const candidatedb = new mongoose.model("candidates",userschema);