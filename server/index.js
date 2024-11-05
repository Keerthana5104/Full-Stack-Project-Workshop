const express = require("express");
const morgan = require("morgan");
const pg = require("pg");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({extended:true}));

const db = new pg.Client({
    host : "localhost",
    port : 5432 ,
    database : "finance_tracker",
    user : "postgres",
    password : "Rec124.edu.in"
})

db.connect().then(()=>{
    console.log("Database Connected!");
})
app.post("/add",async(req,res)=>{
    const data=req.body;
    console.log(data.descr);
    await db.query('INSERT INTO history(descr,mode,amt) values($1,$2,$3)' , [data.descr , data.mode,data.amt]);
    res.status(201).send("Record Inserted!");
})

app.get("/", (req,res)=>{
    res.send("Hello World!");
})

app.listen(3001, ()=> {
    console.log('Server started at port 3001');
})