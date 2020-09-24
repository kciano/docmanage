const mongoose = require('mongoose');
const Schema = mongoose.Schema

const appointmentSchema = new Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },

    Date: {
        type: Date
    }

}, { timestamps: true })

module.exports = mongoose.model('Appointment', appointmentSchema);