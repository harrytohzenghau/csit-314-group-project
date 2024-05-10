let users = [
    {
        user_admin: true,
        user_agent: false,
        user_details: {
            first_name: "first",
            last_name: "last",
            username: "admin",
            mobile_number: 97563284,
            password: "123",
            email_address: "admin@gmail.com",
        },
        user_finance: {},
    },
    {
        user_admin: false,
        user_agent: true,
        user_details: {
            first_name: "first",
            last_name: "last",
            username: "agent",
            mobile_number: 97563284,
            password: "123",
            email_address: "agent@gmail.com",
        },
        user_finance: {},
    },
    {
        user_admin: false,
        user_agent: false,
        user_details: {
            first_name: "first",
            last_name: "last",
            username: "user",
            mobile_number: 97563284,
            password: "123",
            email_address: "agent@gmail.com",
        },
        user_finance: {},
    },
];

module.exports = users;
