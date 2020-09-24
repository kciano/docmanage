const express = require('express');
const router = express.Router();

// const { requireSignin } = require('../controller/auth.controller');

const { viewPatient, addPatient, updatePatient, deletePatient } = require('../controller/patient.controller')

router.get('/patient', viewPatient)
router.post('/patient/new', addPatient)
router.put('/patient/:patientId', updatePatient)
router.delete('/patient/:patientId', deletePatient)

module.exports = router