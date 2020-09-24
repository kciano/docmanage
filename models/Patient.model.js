const mongoose = require('mongoose');
const Schema = mongoose.Schema

const patientSchema = new Schema({
    name: {
        type: String
    },

    Contact: {
        type: String
    },

    Address: {
        type: String
    },

    Emergency_contact: {
        type: String
    },

    Insurance: {
        type: String
    },

    Appointments: [{
        type: Schema.Types.ObjectId,
        ref: 'Appointment'
    }],

}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);