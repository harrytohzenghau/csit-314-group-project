const bcrypt = require("bcrypt");

const User = require("../../schemas/User.schema");
const Property = require("../../schemas/Property.schema");

class UserEntity {
    user_details = {};
    user_admin;
    user_agent;

    user = {};

    set user(user) {
        this.user = user;
        return;
    }
    get user() {
        return this.user;
    }

    get username() {
        return this.user.user_details.username;
    }

    get password() {
        return this.user.user_details.password;
    }

    get id() {
        return this.user._id;
    }

    set userDetails(user_details) {
        this.user_details = user_details;
        return;
    }
    get userDetails() {
        return this.user_details;
    }

    set userAdmin(admin) {
        this.user_admin = admin;
    }

    get userAdmin() {
        return this.user_admin;
    }

    set userAgent(agent) {
        this.user_agent = agent;
    }

    get userAgent() {
        return this.user_agent;
    }

    async fetchUserById(id) {
        this.user = await User.findById(id).select("-user_details.password");
        if (!this.user) throw "User not found";
        return this.user;
    }

    async fetchUserByUsername(username) {
        this.user = await User.findOne({
            "user_details.username": username,
        });

        if (!this.user) throw "User does not exist!";
        if (!this.user.user_active) throw "User is Banned!";
        return this.user;
    }

    async createUser(data) {
        const { user_details, user_agent, user_admin } = data;

        const { password } = user_details;
        user_details.password = await bcrypt.hash(password, 10);

        this.user_details = user_details;
        this.user_admin = user_admin;
        this.user_agent = user_agent;

        this.user = new User({
            user_details,
            user_agent,
            user_admin,
        });

        await this.user.save();
        return this.user;
    }

    async updateUserByUsername(data) {
        const { username, password } = data.user_details;

        if (password) {
            data.user_details.password = await bcrypt.hash(password, 10);
        }

        const user = await User.findOne({ "user_details.username": username });

        user.user_details.first_name =
            data.user_details.first_name || user.user_details.first_name;

        user.user_details.last_name =
            data.user_details.last_name || user.user_details.last_name;

        user.user_details.username =
            data.user_details.username || user.user_details.username;

        user.user_details.email_address =
            data.user_details.email_address || user.user_details.email_address;

        user.user_details.mobile_number =
            data.user_details.mobile_number || user.user_details.mobile_number;

        user.user_details.password =
            data.user_details.password || user.user_details.password;

        await user.save();
    }

    async removeUserById(id) {
        await User.findByIdAndDelete(id);
        return;
    }

    async favouriteProperty(data) {
        const { property_id, user_id, favourite } = data;

        this.user = await User.findById(user_id);
        const property = await Property.findById(property_id);

        if (favourite) {
            this.user.user_favourites.push(property._id);
        } else {
            const favourites = this.user.user_favourites;
            this.user.user_favourites = favourites.filter(
                (e) => e.toString() !== property_id
            );
        }

        await this.user.save();

        return;
    }
}

module.exports = UserEntity;
