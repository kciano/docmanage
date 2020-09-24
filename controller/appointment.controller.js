const Appointment = require('../models/appointment.model');
const Patient = require('../models/Patient.model')

exports.viewAppointments = async (req, res) => {

    try {
        const post =  await Appointment.find().populate('name', 'name');
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }   
}

exports.addAppointment = async (req, res) => {

    const patientId = await req.params.patientId;
    const postAppointment = await req.body;
    const newAppointment = new Appointment(postAppointment);

    await Patient.findOne({ _id: patientId }, async (err, foundPatient) => {
        if (!foundPatient) {
            return err;
        }
        
        foundPatient.Appointments.push(newAppointment);

        newAppointment.name = foundPatient;
        
        await newAppointment.save((error, savedAppointment) => {
            if (error) {
                return error;
            }
            
            return res.json(savedAppointment);
        });
        await foundPatient.save((error, savedPatient) => {
            if (error) {
                return error;
            }
            // return res.json(savedPatient);
        });
        return foundPatient;

        
    });
};

exports.cancelAppointment = async (req, res) => {
    try {
        const removeAppointment = await Appointment.remove({ _id: req.params.appointmentId });
        res.json(removeAppointment);
    } catch (err) {
        res.json({message: err})
    }
    
}




