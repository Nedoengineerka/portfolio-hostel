const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    login: {type: String, unique: true},
    password: String,
    nameSurname: String,
    phoneNumber: {type: String, unique: true},
    passportNumber: String,
    role: Number
});

const User = mongoose.model('user', userSchema);

module.exports = User;