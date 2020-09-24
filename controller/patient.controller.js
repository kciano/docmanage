const { request } = require('express');
const Patient = require('../models/Patient.model')

 exports.viewPatient = async (req, res) => {


    try {
        const posts =  await Patient.find().find().populate('Appointments', 'Date');
        
        res.json(posts);
    } catch (err) {
        res.json({message: err});
    }

 


}

exports.addPatient = async (req, res) => {

    const post = new Patient({
        name: req.body.name,
        Contact: req.body.Contact,
        Address: req.body.Address,
        Emergency_contact: req.body.Emergency_contact,
        Insurance: req.body.Insurance
    })

    try {
        const savedPost =  post.save();
        res.json(savedPost);
    } catch(err) {
        res.json({ message: err })
    }
}

exports.updatePatient = async (req, res) => {
    try {
        const updatedPatient = await Patient.updateOne({ _id: req.params.patientId }, {$set: {name: req.body.name, Contact: req.body.Contact, Address: req.body.Address, Emergency_contact: req.body.Emergency_contact, Insurance: req.body.Insurance}});
        console.log(updatedPatient);
        res.json(updatedPatient);
    } catch(err) {
        res.json({message: err});

    }
}

exports.deletePatient = async (req, res) => {
    try {
        const removePatient = await Patient.remove({ _id: req.params.patientId });
        res.json(removePatient);
    } catch (err) {
        res.json({message: err})
    }
}





