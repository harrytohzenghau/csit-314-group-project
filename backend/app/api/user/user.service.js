const Student = require("./student.model");
const Staff = require("./staff.model");

module.exports = {
    userLogin: async (status, body) => {
        if (status == "student") {
            const student = await Student.findOne({
                username: body.username,
            });
            if (student.student_details.password == body.password) {
                return student;
            }
        }
        if (status == "staff") {
            const staff = await Staff.findOne({
                username: body.username,
            });
            if (staff.staff_details.password == body.password) {
                return staff;
            }
        }
    },
};
