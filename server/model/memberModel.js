const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const memberSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    passwordConfirm: {
        type: String,
        required: true
    },
    token: {
        type: String
    }
})

memberSchema.pre("save", async function(next) {
    if(this.password && this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    this.passwordConfirm = undefined;
    next();
});

memberSchema.methods.isPasswordCorrect = async function(password, passwordHash) {
   return await bcrypt.compare(password, passwordHash)
}

module.exports = mongoose.model("member", memberSchema);