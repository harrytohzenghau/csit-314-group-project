const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const config = require("./config");

require("dotenv").config();
const PRODUCTION = process.env.NODE_ENV === "production";

main().catch((err) => console.log(err));
async function main() {
    if (PRODUCTION) {
        const uri = `mongodb+srv://${config.mongodb.user}:${config.mongodb.password}@${config.mongodb.port}`;
        await mongoose.connect(uri);
        console.log(`Mongo connected to Atlas`);
        return;
    }
    const uri = `mongodb://${config.mongodb.host}:${config.mongodb.port}/UOW_RBS`;
    await mongoose.connect(uri);
    console.log(`Mongo connected to ${uri}`);
}

const Staff = require("../app/api/user/staff.model");
const Student = require("../app/api/user/student.model");

const staffs = require("./staffs");
const students = require("./students");

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/staff", async (req, res) => {
    await Staff.deleteMany();
    for (let i = 0; i < staffs.length; i++) {
        const newStaff = new Staff({
            staff_details: {
                username: staffs[i].username,
                password: staffs[i].password,
                contact_number: staffs[i].contact_number,
                email_address: staffs[i].email_address,
                staff: staffs[i].staff,
            },
        });
        await newStaff.save();
    }
    res.send("Saved!");
});

app.get("/student", async (req, res) => {
    await Student.deleteMany();
    for (let i = 0; i < staffs.length; i++) {
        const newStudent = new Student({
            student_details: {
                username: students[i].username,
                password: students[i].password,
                contact_number: students[i].contact_number,
                email_address: students[i].email_address,
                student: students[i].staff,
            },
        });
        await newStudent.save();
    }
    res.send("Saved!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
