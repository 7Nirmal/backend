import { auth } from "./middleware/auth.js";
import express, { request, response } from "express";
import {jobseeker} from "./Models/jobmodel.js";
import { candidatedb } from "./Models/candidatemodel.js";
import {mongoose} from "mongoose";
import moment from "moment";
const router =express.Router();


router.post("/jobdetails", async function (request, response) {
  try{
    const newjob = await jobseeker(request.body);
    await newjob.save();
    console.log(newjob);
    response.send(newjob);
  }
  catch (err){
    console.log(err.message);
    response.send(err.message);
  }

});


router.get("/jobdetails", auth,async function (req, res) {
  const result = await jobseeker.find();
  res.send(result);
})


router.post("/applyjob",async function (req, res) {

  try{
  const {job,user} = req.body;
const jobdata = await jobseeker.findOne({_id:mongoose.Types.ObjectId(job._id)});

const appliedcandidate = {
  firstname:user.firstname,
  lastname:user.lastname,
  email:user.email,
  contact:user.number,
  degree:user.degree,
  department:user.department,
  university:user.university,
  batch:user.batch,
  role:user.role,
  show:true,
  status:"",
  on:"",
  appliedDate: moment().format('YYYY-MM-DD')
}
jobdata.appliedcandidates.push(appliedcandidate);
await jobdata.save();

const userdata = await candidatedb.findOne({_id:mongoose.Types.ObjectId(user._id)});

const appliedjob = {
  jobid:job._id,
  position : job.position,
  company: job.company,
  location: job.location,
  CTC: job.CTC,
  status:"",
  appliedDate: moment().format('YYYY-MM-DD')
}

userdata.appliedjobs.push(appliedjob);
await userdata.save();

res.send({message:"job applied successfully"})
  }
  catch(err){
    res.status(400).send({message:err.message})
  }
})
router.get("/getjob/:id",async function(req, res) {
  const {id} = req.params;
  const job = await jobseeker.findOne({_id:mongoose.Types.ObjectId(id)});
  res.send(job);

})

router.post ("/editjob/:id",auth,async function (req,res){
  const {id} = req.params;
  const editjob = await jobseeker.findOneAndUpdate({_id:mongoose.Types.ObjectId(id)},req.body);
  res.send({message:"job edited sucessfully"});
})

router.post ("/reject/:id/:index",async function (req,res){
  const {id,index} = req.params;
  const job = await jobseeker.findOne({_id:mongoose.Types.ObjectId(id)});
  const result = job.appliedcandidates.slice(index, index+1);
  job.appliedcandidates.splice(index, 1);
  
  result[0].show = false;
  result[0].status= "R";

   job.appliedcandidates.push(result[0]);
  await job.save();
  const {email} = req.body;
   const seeker = await candidatedb.findOne({email:email});
const reject = seeker.appliedjobs;

reject.forEach((obj,index)=>{
  if(obj.jobid==id){
    seeker.appliedjobs.splice(index, 1);
     obj.status = "REJECTED";
   seeker.appliedjobs.push(obj);
  }
})
await seeker.save();
  res.send(seeker);0

 
})

router.post("/schedule/:id/:index",async function (req, res){
  const{id,index} = req.params;
const {time,email} = req.body;
const fulldate = new Date (`${time}`)
 const date = fulldate.getDate()+":"+(fulldate.getMonth()+1)+":"+fulldate.getFullYear()+" at "+fulldate.getHours()+":"+fulldate.getMinutes();
const job = await jobseeker.findOne({_id:mongoose.Types.ObjectId(id)});
const result = job.appliedcandidates.slice(index, index+1);
await job.appliedcandidates.splice(index, 1);
result[0].show = false;
result[0].status = "S" ;
result[0].on = date;

 job.appliedcandidates.push(result[0]);
await job.save();
const seeker = await candidatedb.findOne({email:email});
 const schedule = seeker.appliedjobs;
schedule.forEach((obj)=>{
  if(obj.jobid==id){
     obj.status ="SCHEDULED ON" +"  " + date;
   seeker.appliedjobs.push(obj);
  }
})
await seeker.save();
res.send(seeker);
 })


 router.get("/scheduledcandidates",async function(req, res) {
  const jobs = await jobseeker.find({});
  const schedule = [];
  jobs.forEach((obj)=>{
    obj.appliedcandidates.forEach((cand)=>{if(cand.status === "S"){schedule.push(obj)}}) 
  })
  res.send(schedule);

 })

router.delete("/jobdetails/:id",async  function (request, response) {
  const {id} = request.params;
  const job =  await jobseeker.findOneAndDelete({_id:mongoose.Types.ObjectId(id)})
  job ? response.send(job) : response.status(404).send({msg:"job not found"})
  })





export const jobrouter = router;