const express = require("express");

const fs = require("fs");

const path = require("path");


const app = express();

const PORT = 3000;


// Middleware
app.use(express.json());

app.use(express.static(__dirname));


// Location of JSON file
const filePath = path.join(__dirname, "students.json");


// GET all students
app.get("/students", function(req, res) {

    fs.readFile(filePath, "utf8", function(err, data) {

        if (err) {

            return res.status(500).json({
                message: "Could not read students file"
            });

        }


        const students = JSON.parse(data);

        res.json(students);

    });

});


// ADD a student
app.post("/students", function(req, res) {

    const newStudent = req.body;


    fs.readFile(filePath, "utf8", function(err, data) {

        if (err) {

            return res.status(500).json({
                message: "Could not read students file"
            });

        }


        const students = JSON.parse(data);


        // Check duplicate roll number
        const alreadyExists = students.some(function(student) {

            return student.roll === newStudent.roll;

        });


        if (alreadyExists) {

            return res.status(400).json({
                message: "Roll number already exists!"
            });

        }


        // Add student
        students.push(newStudent);


        // Save to JSON
        fs.writeFile(
            filePath,
            JSON.stringify(students, null, 4),
            function(err) {

                if (err) {

                    return res.status(500).json({
                        message: "Could not save student"
                    });

                }


                res.json({
                    message: "Student added successfully"
                });

            }
        );

    });

});


// Start server
app.listen(PORT, function() {

    console.log(`Server running at http://localhost:${PORT}`);

});