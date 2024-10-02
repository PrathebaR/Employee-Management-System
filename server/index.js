const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const router = express.Router();
const fileupload = require('express-fileupload');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileupload());
app.use('/images', express.static(path.join(__dirname, 'images')));

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"ems"
});

db.connect(err =>{
    if(err){
      console.error("Connection Error",err);
    }
    else{
        console.log("Connection Made Successfully");
    }
})

app.get('/empdisplay', (req, res)=>{
    const sql = "SELECT * FROM employees";

    db.query(sql, (err,result)=>{
        if(err){
            console.error("Error Occurred during GET",err);
        }
        else{
            res.send(result);
        }
    });
});

app.get('/viewemp/:empid', (req, res) => {
    const empid = req.params.empid;
    const sql = "SELECT * FROM employees WHERE empid=?";
    db.query(sql, [empid], (err, result) => {
        if (err) {
            console.error("Error Occurred during Displaying", err);
            res.status(500).send("Error Occurred");
        } 
        else if (result.length === 0) {
            res.status(404).send("Employee not found");
        } 
        else {
            console.log("Employee's Details Shown Successfully!!!");
            res.json(result[0]);
        }
    });
});

app.post('/addemp', (req, res)=>{
   if(!req.files){
    return res.status(400).send("No Content");
   } 

   const file = req.files.image;
   const uploadPath = path.join(__dirname, '/images/', file.name);

   file.mv(uploadPath, (err)=>{
    if(err){
        console.error(err);
    }
   });
   
   const employees = {
    imagePath: `images/${file.name}`,
    empname: req.body.empname,
    empid: req.body.empid,
    department: req.body.department,
    designation: req.body.designation,
    project: req.body.project,
    status: req.body.status,
    type: req.body.type
   };

   const sql = `INSERT INTO employees (imagePath, empname, empid, department, designation, project, type, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
   const values = [employees.imagePath, employees.empname, employees.empid, employees.department, employees.designation, employees.project, employees.type, employees.status];

   db.query(sql, values, (err,result)=>{
    if(err){
        console.error("Error Occured",err);
    }
    else{
        console.log("Employee's Details Added Successfully!!!");
    }
   });

});

app.put('/updemp/:empid', (req, res) => {
    const empid = req.params.empid;
    const { empname, department, designation, project, type, status } = req.body;

    let imagePath = null;
    
    if (req.body.image) {
        const base64Data = req.body.image.replace(/^data:image\/\w+;base64,/, "");
        const fileName = `${Date.now()}-employee.png`;

        fs.writeFileSync(path.join(__dirname, '/images/', fileName), base64Data, 'base64');
        imagePath = path.join('/images/', fileName);
    }

    const sql = "UPDATE employees SET imagePath=?, empname=?, department=?, designation=?, project=?, type=?, status=? WHERE empid=?";
    const values = [imagePath, empname, department, designation, project, type, status, empid]; 
    
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error Occurred during Updation", err);
            return res.status(500).json({ error: "Error Occurred during Updation" });
        }
        console.log("Employee's Details Updated Successfully!!!");
        res.json({ message: "Employee's Details Updated Successfully!!!" });
    });
});

app.delete('/delemp/:empid', (req,res)=>{
    const {empid} = req.params;

    const sql = "DELETE FROM employees WHERE empid=?";
    
    db.query(sql, [empid], (err,result)=>{
        if(err){
            console.error("Error Occurred",err)
        }
        else{
            if(result.affectedRows === 1){
                console.log("Employee's details deleted")
            }
            else{
            console.log("Employee not found");
            }
        }
    })
});

app.listen(3030,()=>console.log("3030 is Running"));