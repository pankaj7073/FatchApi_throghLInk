const { json } = require('body-parser');
const express = require('express');
const mongoose = require('mongoose')
const requests = require('requests')
const port = process.env.prot || 3000;
const app = express();


app.get("/todos", (req, res)=>{
    requests("https://jsonplaceholder.typicode.com/todos").on("data", (chunk)=>{
        const objData = JSON.parse(chunk)
        // const arrData = [objData]
        res.send(objData)
    }).on("end", (err)=>{
        if(err) return console.log("connection closed due to error", err)
        console.log("end")
    })  
})


app.get("/users/:id", (req, res)=>{
    var result = [];
    const id = req.params.id;
    requests("https://jsonplaceholder.typicode.com/users/"+id).on("data", (chunk)=>{
        const objData = JSON.parse(chunk)
        const arrData = [objData]
        res.send(arrData)
})
    .on("end", (err)=>{
        if(err) return console.log("connection closed due to error", err)
        console.log("end")
    })
} )
app.get("/user/:id", (req, res)=>{
    var result = [];
const id = req.params.id;
    requests(`https://jsonplaceholder.typicode.com/todos/`).on("data",(chunk)=>{
                const secondData = JSON.parse(chunk)
               for(var i=0; i<secondData.length; i++){
                if(secondData[i].userId==id){
                    result.push(secondData[i])
                }
               }
                    res.send(result);
                
            }).on("end", (err)=>{
                if(err) return console.log("connection closed due to error", err)
                console.log("end")
            })
  

     })

app.listen(port, ()=>{
    console.log(" listening i am port number 3000")
})