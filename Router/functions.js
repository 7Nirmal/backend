import { client } from "../index.js";



export function createuser( password,email) {
    return client.db("jobseeker").collection("users").insertOne({ password: password,email:email});
}

export function createrecruiter(email, password) {
    return client.db("jobseeker").collection("recruiters").insertOne({ email: email, password: password });
}

export  function checkrecruiter (email) {

    return client.db("jobseeker").collection("recruiters").findOne({ email: email});

}

export  function checkuser (email) {

    return client.db("jobseeker").collection("users").findOne({ email: email});

}