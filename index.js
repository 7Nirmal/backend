import express, { response } from 'express';

import {mongoose} from "mongoose"
import cors from "cors";
export const app = express()
import {userRouter} from"./Router/users.js";
import {recruiterRouter} from"./Router/recruiter.js";
import { jobrouter } from './jobdetails.js';
import{candidaterouter} from "./candidaterouter.js";
import dotenv from "dotenv";
import {auth} from "./middleware/auth.js"
import { ObjectId } from "mongodb";
import moment from "moment";
import multer from "multer";
import {filedb} from "./Models/Filemodel.js"

 app.use (express.json());
 

 dotenv.config();
const PORT = process.env.PORT;
// const MONGO_URL = "mongodb://127.0.0.1";
const MONGO_URL = process.env.MONGO_URL;
app.use(cors());





async function dbConnect() {
  try {
    await mongoose.connect(MONGO_URL,
      { useNewUrlParser: true }
    );
    console.log("MongoDb connected successfully");
  } catch (error) {
    console.log("MongoDb connection failed");
  }
}

export const mongoosedb = await dbConnect();

const upload = multer({ dest: 'uploads/' })





  // app.post("/upload",upload.single("file"),async  function (request, response) {
  //   try{
  //     console.log(request.file);

  //   response.send(request.file);
  //   }
  //   catch(err){
  //     response.send({message:err.message});
  //   }
    
  //   })


  



app.use("/user",userRouter);
app.use("/recruiter",recruiterRouter);
app.use(jobrouter);
app.use(candidaterouter);

app.listen(PORT,()=>{console.log(`app listening at ${PORT}`)});