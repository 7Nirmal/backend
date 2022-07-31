import { app, client } from './index';

app.post("/user/logup", async function (req, res) {
  const { username, password } = req.body;
  console.log(username, password);
  const result = await client.db("jobseeker").collection("users").insertOne({ username: username, password: password });
  res.send(result);
});
