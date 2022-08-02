
import {checkrecruiter, createrecruiter} from "./functions.js"
import express from "express";
import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

async function hashedpassword(password){
const no_of_rounds = 10;
const salted = await bcrypt.genSalt(no_of_rounds);
const hashed = await bcrypt.hash(password,salted);
return hashed;
}

router.post("/logup", async function (req, res) {
  const { email, password } = req.body;
  console.log(email, password);
  const userDB = await checkrecruiter (email);
  console.log(userDB);

  if (userDB){
    res.status(400).send({message: "User already exists"})
  }
else{
  const hashedpass = await hashedpassword(password);
  const result = await createrecruiter(email, hashedpass);
  res.send(result);
}
});

router.post("/login",async function(req, res) {
  const { email, password } = req.body;
  const userDB = await checkrecruiter (email);
  if(!userDB){
    res.status(401).send({message: "Invalid username or password"});
  }
else{
const storedpassword = userDB.password;
const ispassword = await bcrypt.compare(password, storedpassword);
if(ispassword){
  const token = jwt.sign({id:userDB._id},process.env.SECRET_KEY);
  res.send({message:"sucessfully signed in",token:token});
}
else{
  res.status(401).send({message:"invalid username or password"});
}

}
})

export const recruiterRouter = router;