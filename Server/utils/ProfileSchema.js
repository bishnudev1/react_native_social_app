const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    residence: {
        type: String,
        required: true
    },
});

const Profile = mongoose.model('Profiles', ProfileSchema);

module.exports = Profile;