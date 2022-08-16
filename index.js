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

 app.use (express.json());
 

 dotenv.config();
const PORT = process.env.PORT;
// const MONGO_URL = "mongodb://127.0.0.1";
const MONGO_URL = process.env.MONGO_URL;
app.use(cors());

// async function createConnection() {
//   const client = new MongoClient(MONGO_URL); 
//   await client.connect();
//   console.log("Mongo is connected");
//   return client;
// }

// export const client = await createConnection();



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


// app.get("/candidatedetails",  async function (req, res) {
//   const result = await client.db("jobseeker").collection("candidate").find({}).toArray();
//   res.send(result);
// })




// app.post("/candidate",async function (request, response){
//   const data = request.body;
//   console.log(data);
//   const result = await client.db("jobseeker").collection("candidate").insertOne({data,appliedjobs:[]});
//   console.log(result);
//   response.send(result);
// })


// app.post("/getcandidate", async function (req, res) {
//   const { mail } = req.body;
//   console.log(mail);
//   const candidate = await client.db("jobseeker").collection("candidates").findOne({ "email": mail });
//   candidate ? res.send(candidate): res.send("");
// });




  app.post("/applied",async  function (request, response) {
    const {job,candidate} = request.body;
    const date  = moment().format ("MMM DD yyy");  
   const result = await client.db("jobseeker").collection("appliedjobs").insertOne({job:job,candidate:candidate,date:date});
   response.send(result);
    })


  

    app.post("/getcandidate/:id",  async function (req, res) {
      const {id} = req.params
      const data =req.body;
      const updatejob = await client.db("jobseeker").collection("jobdetails").updateOne({_id:ObjectId(id)},{$set:{data}});
      res.send(updatejob);
      })



app.use("/user",userRouter);
app.use("/recruiter",recruiterRouter);
app.use(jobrouter);
app.use(candidaterouter);

app.listen(PORT,()=>{console.log(`app listening at ${PORT}`)});