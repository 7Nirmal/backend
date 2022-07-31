import { client } from "../index.js";



export function createuser(username, password) {
    return client.db("jobseeker").collection("users").insertOne({ username: username, password: password });
}

export function createrecruiter(username, password) {
    return client.db("jobseeker").collection("recruiters").insertOne({ username: username, password: password });
}

export  function checkrecruiter (username) {

    return client.db("jobseeker").collection("recruiters").findOne({ username: username});

}

export  function checkuser (username) {

    return client.db("jobseeker").collection("users").findOne({ username: username});

}