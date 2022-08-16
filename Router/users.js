
import {createuser} from "./functions.js"
import express from "express";
import bcrypt, { compare } from "bcrypt";
import {checkuser} from "./functions.js";
import jwt from "jsonwebtoken";
const router = express.Router();

async function hashedpassword(password){
const no_of_rounds = 10;
const salted = await bcrypt.genSalt(no_of_rounds);
const hashed = await bcrypt.hash(password,salted);
return hashed;
}

router.post("/logup", async function (req, res) {
  const {password,email } = req.body;
  const userDB = await checkuser (email);
  console.log(userDB);

  if (userDB){
    res.status(400).send({message: "User already exists"})
  }
else{
  const hashedpass = await hashedpassword(password);
  const result = await createuser( hashedpass,email);
  res.send(result);
}
});

router.post("/login",async function(req, res) {
  const { password,email } = req.body;
  const userDB = await checkuser (email) ;
  console.log(userDB);
  if(!userDB){
    res.status(401).send({message: "Invalid username or password"});
  }
else{
const storedpassword = userDB.password;
const ispassword = await bcrypt.compare(password, storedpassword);
if(ispassword){
  const token = jwt.sign({id:userDB._id},process.env.SECRET_KEY);
  res.send({message:"sucessfully signed in",token:token,email:email,id:userDB._id});
}
else{
  res.status(401).send({message:"invalid username or password"});
}

}
})


router.post("/token-valid",async (req, res)=>{
try{
  const token  = req.header("x-auth-token");
  if (!token) return res.status(401).send(false);
  const verified =   jwt.verify(token, process.env.SECRET_KEY);
 return res.send({message:"valid token"});
}
catch(err)
  {
    res.status(500).send({message:err.message})
  }

})

export const userRouter = router;