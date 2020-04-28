const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require('./db/db');
const User  = db.User;

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());



// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.post("/auth", (req, res) => {
  console.log("auth")
  auth(req.body)
  .then((e) =>{
    console.log(e)
    res.json(e)
  })
});

app.post("/save", (req, res) => {
  console.log("save")
  save(req.body).then(() => {
    res.json({ message: "user saved" });
  });
});


app.get("/getall", (req, res) => {
  console.log("getAll")
  getAll(req.body).then((data) => {
    res.json(data);
  });
});


// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


async function auth({login, pass}){
  console.log(login + " " + pass)
  user = await db.User.findOne({login})
  if (user){
    if(user.pass == pass)
    return user;
  }
   
  return null;
}

async function save(param){
  console.log(param)
  const user = new User(param)
    await user.save()
 
}

async function getAll(){
  return db.User.find()
}
  
 
