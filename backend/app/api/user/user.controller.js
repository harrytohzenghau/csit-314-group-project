const user = require("./user.service");

module.exports = {
    login: async (req, res) => {
        //Receive body & params from client
        const data = await user.userLogin(req.params.status, req.body);
        if (data) {
            res.json(data);
        } else {
            res.json("Wrong Password");
        }
    },
};
