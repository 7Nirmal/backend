import express, { response } from 'express';
import {candidatedb} from "./Models/candidatemodel.js";
import {jobseeker} from "./Models/jobmodel.js";

import {mongoose} from "mongoose";


const router = express.Router();

//api to get resume

router.get("/getresume/:userid",async function (req,res){
  try{
const {userid} = req.params;
const candidate = await candidatedb.findOne({_id:mongoose.Types.ObjectId(userid)})
const resume = candidate.resume;
res.send({resume});
  }
   catch(err){
    res.send({messgae: err.message});
   }
});

router.post("/getcandidate", async function (req, res) {

  try{
    const { mail } = req.body;
    console.log(mail);
    const candidate = await candidatedb.findOne({ email: mail });
   candidate? res.status(200).send({candidate,message:true}): res.status(400).send({message:false})
  }
  catch (err){
    res.status(400).send({message: err.message});
  }
 
});


router.post("/candidate",async function (request, response){
try{
  const {data} = request.body;
  const {resume} = request.body;
   const newcandidate = await candidatedb({data,resume});
 await newcandidate.save();
response.send(newcandidate);
} 
catch(err){
  response.status(400).send({message: err.message});
}
})

router.post("/updatecandidate/:id",  async function (req, res) {

  try{
    const {id} = req.params
    // const objid = mongoose.Types.ObjectId(id);
    // console.log(objid);
  //  //console.log(`"${id}"`);
  const updatecandidate = await candidatedb.findOneAndUpdate(
    {_id:mongoose.Types.ObjectId(id)},{data: req.body},{new: true}
  )
  res.send({message:"sucessfully updated"});
  }

  catch (err){
    res.status(400).send({message:err.message})
  }
  })


  router.get("/userjobs/:id",async function(req, res) {

    const {id} = req.params;
    const userdata =await candidatedb.findOne({_id:mongoose.Types.ObjectId(id)});
    const userjobs = userdata.appliedjobs;
    res.send(userjobs);
  })


export const candidaterouter = router;