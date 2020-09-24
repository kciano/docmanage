const express = require('express');
const router = express.Router();

const { viewAppointments, addAppointment, cancelAppointment } = require('../controller/appointment.controller')

router.get('/appointments', viewAppointments)
router.post('/appointments/:patientId', addAppointment)
router.delete('/appointments/:appointmentId', cancelAppointment)

module.exports = router