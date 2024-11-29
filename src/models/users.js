const { Schema, model } = require("mongoose");
const { hash, compare, genSalt } = require("bcrypt");

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password : {
        type: String,
        require: true,
    },
    races: [{
        raceNumber: {
            type: Number,
            require: true
        },
        bestTime: {
            type: Number,
            require: true
        }
    }],
    avatar: {
        type: String,
        require: false,
        default: 'Margaret'
    },
    variant: {
        type: String,
        require: false,
        default: 'marble'
    },

    created_at: {
        type: Date,
        require: true,
        default: Date.now
    },
    updated_at: {
        type: Date,
        require: true,
        default: Date.now
    }
}, { versionKey: false });


userSchema.methods.encryptPassword = async (password) => {
    const salt = await genSalt(10);
    return hash(password, salt);
};

userSchema.methods.validatePassword = function (password) {
    return compare(password, this.password);
}


const User = model('User', userSchema);

module.exports = User;