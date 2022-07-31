import express, { response } from 'express';
import { MongoClient } from "mongodb";
import cors from "cors";
export const app = express()
import {userRouter} from"./Router/users.js";
import {recruiterRouter} from"./Router/recruiter.js";
import dotenv from "dotenv";
import {auth} from "./middleware/auth.js"
import { ObjectId } from "mongodb"
 app.use (express.json());


 dotenv.config();
const PORT = process.env.PORT;
// const MONGO_URL = "mongodb://127.0.0.1";
const MONGO_URL = process.env.MONGO_URL;
const jobdata = [
  {
     "position":"Java Lead",
     "company":"Dynamic Systems Advanced Technology",
     "location":"chennai",
     "CTC":"9,00,000-12,00,000",
     "experience":"6-10",
     "skills":"java,github,springboot,MongoDB,microservices"
  },
  {
     "position":"SENIOR ARCHITECT - MDM",
     "company":"Lennox India Technology",
     "location":"chennai",
     "CTC":"",
     "experience":"5-10",
     "skills":"senior architect,programming"
  },
  {
     "position":"Engineering Manager",
     "company":"Global english",
     "location":"Bangalore",
     "CTC":"",
     "experience":"5-11",
     "skills":"testing,MI,cloud,AWS,.NET"
  },
  {
     "position":"Backend ARCHITECT",
     "company":"Spectral Consultants",
     "location":"pune",
     "CTC":"",
     "experience":"5-18",
     "skills":"Business process,Networking,XML,MySQL"
  },
  {
     "position":"Consultant",
     "company":"Virtusua",
     "location":"Mumbai",
     "CTC":"",
     "experience":"5-10",
     "skills":"core java,metadata,"
  },
  {
     "position":"Consultant",
     "company":"Virtusua",
     "location":"Mumbai",
     "CTC":"",
     "experience":"5-10",
     "skills":"core java,metadata"
  },
  {
    "positon":"Front End Developer",
    "company":"psiog",
    "location":"gurugaon",
    "CTC":"5,00,000",
    "experience":"0-2",
    "skills":"HTML,CSS,Javascript,React"
  }
]


app.use(cors());

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected");
  return client;
}

export const client = await createConnection();

app.get('/', function (req, res) {
  res.send("hello world");
})

// app.get('/movies', async function (req, res) {
//   const result = await client.db("movies").collection("movies").find({}).toArray();
//   res.send(result);
// })
app.post("/jobdetails",async function (request, response){
  const data = request.body;
  console.log(data);
  const result = await client.db("jobseeker").collection("jobdetails").insertOne(data);
  console.log(result);
  response.send(result);
})


app.get("/jobdetails", async function (req, res) {
  const result = await client.db("jobseeker").collection("jobdetails").find({}).toArray();
  res.send(result);
})

app.get("/candidatedetails",  async function (req, res) {
  const result = await client.db("jobseeker").collection("candidate").find({}).toArray();
  res.send(result);
})
app.post("/candidate",async function (request, response){
  const data = request.body;
  console.log(data);
  const result = await client.db("jobseeker").collection("candidate").insertOne(data);
  console.log(result);
  response.send(result);
})

app.get("/jobdetails/:id",async  function (request, response) {
  const {id} = request.params;
  const job =  await client.db("jobseeker").collection("jobdetails").findOne({_id:ObjectId(id)}); // connecting from mongoDB
  job ? response.send(job) : response.status(404).send({msg:"job not found"})
  })


  app.delete("/jobdetails/:id",async  function (request, response) {
    const {id} = request.params;
    const job =  await client.db("jobseeker").collection("jobdetails").deleteOne({_id:ObjectId(id)}); // connecting from mongoDB
    job ? response.send(job) : response.status(404).send({msg:"job not found"})
    })

app.use("/user",userRouter);
app.use("/recruiter",recruiterRouter);

app.listen(PORT,()=>{console.log(`app listening at ${PORT}`)});