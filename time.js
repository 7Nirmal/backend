// var currentdate = new Date(); 
// var datetime = "applied on: " + currentdate.getDate() + "/"
//                 + (currentdate.getMonth()+1)  + "/" 
//                 + currentdate.getFullYear() + " at "
//                 + currentdate.getHours() + ":"  
//                 + currentdate.getMinutes() 


                
// console.log(datetime);

import moment from "moment";
const date  = moment().format ("MMM DD yyy");
console.log(date);