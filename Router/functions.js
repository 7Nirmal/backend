import {userdb} from "../Models/usermodel.js"
import {recruiterdb} from "../Models/recruitermodel.js";



export function createuser( password,email) {
    //return client.db("jobseeker").collection("users").insertOne({ password: password,email:email});
    const newuser =  userdb({email,password})
    newuser.save();
return newuser;
}

export function createrecruiter(email, password) {
    //return client.db("jobseeker").collection("recruiters").insertOne({ email: email, password: password });
    const newrecruiter = recruiterdb({email,password});
    newrecruiter.save();
    return newrecruiter;
}

export  function checkrecruiter (email) {

   // return client.db("jobseeker").collection("recruiters").findOne({ email: email});

   const check = recruiterdb.findOne({email: email});
   return check;

}

export  function checkuser (email) {
    
    const check = userdb.findOne({email: email});
    return check;


  //  return client.db("jobseeker").collection("users").findOne({ email: email});

}