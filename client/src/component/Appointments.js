import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';

import axios from 'axios';
import {isAuth, getCookie, signout, updateUser } from '../auth/Helper'
import Appointment from './Appointment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'



const AppointmentsAdmin = ({ history }) => {
    const [ values, setValues ] = useState({
        appointment: '',
        appointments: [],
        patients:[],
        patientID: '',
        loading: true
    });

    const { appointment, appointments, patients, patientID, loading } = values;

    const token = getCookie('token');

    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        loadPatients();
        
        
    }, [appointments]);

    useEffect(() => {
        
        loadAppointments();
        
    }, []);

    const loadAppointments = () => {
        axios({
            method: 'GET',
            url: `/api/appointments`,
            // headers: {
            //     Authorization: `Bearer ${token}`
            // }
        })
            .then((responseAppointment) => {
                const appointments = responseAppointment.data;
                setValues({ ...values, appointments, appointment: '', loading: false });
                
            })
            
            .catch((error) => {
                if (error.response.status === 401) signout(() => history.push('/'));
            });
    };



    const loadPatients = () => {
        axios({
            method: 'GET',
            url: `/api/patient`
        })
            .then((responsePatients) => {
                const patients = responsePatients.data;
                setValues({ ...values, patients, loading: false }); 
                console.log(true);   
            })
            
            .catch((error) => {
                if (error.response.status === 401) signout(() => history.push('/'));
            });
    };
    const addAppointment = (e) => {
        e.preventDefault();

        axios({
            method: 'POST',
            url: `/api/appointments/${patientID}`,
            data: { "Date": selectedDate },

        })
     
        .then((response) => {
            setValues({ ...values, appointment: ' ' });
            toast.success(response.data.message);
        })
        .then(loadAppointments)
        
        
        .catch((error) => {
            toast.error(error.response.data.error)
        });
        alert("Appointment has been added")
        window.location.reload(false);

       
    };
    
  

    const cancelAppointment = (id) => {
        axios({
            method:'DELETE',
            url: `/api/appointments/${id}`,
            data: { appointment }
        })
        
        .then(loadAppointments)
        .catch((error) => {
            toast.error(error.response.data.error);
        });

        alert("Appointment has been cancelled")
        window.location.reload(false); 
    }

    const appointmentForm = () => (
        

        <form onSubmit={addAppointment}>
            <div className="form-group">
                <label className="text-muted">Select patient</label>
                
                    <select value={patientID} onChange = {(e) => setValues({ ...values, patientID: e.target.value})}>
                        {patients.map(patients => (
                            
                            <option value={patients._id}>{patients.name}</option>
                            
                        ))}
                    </select>
          
                        
              
                <br />

                <label className="text-muted">Enter Date  </label><br />
                <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} 
                minDate={new Date()} 
                isClearable 
                showTimeInput 
                timeInputLabel="Time:" 
                dateFormat="MM/dd/yyyy h:mm aa"
                />
                <br /><br />
                <button className="action-buttons btn btn-primary">Create Appointment</button>

                
            </div>
        </form>
    )

    
    return (

        
        <div className="col-md-6 offset-md-3">
            <ToastContainer />
            <h1 className="p-5 text-center">Appointment Page</h1>
            {isAuth() && isAuth().role === 'admin' && (
                <React.Fragment>
                    {appointmentForm()}
                </React.Fragment>
                
            )}
            

            {loading == true ? (
                <h1 className="pt-5 text-center ">Loading...</h1>
            ) : appointments.length == 0 ? (
                <React.Fragment>
                    <h3 className="pt-5 text-center">No Appointments!</h3>
                    <p className="lead text-center">Add an appointment by completing the form</p>
                </React.Fragment>
            ) : (
                <ul className="list-group list-group-flush">
                    {appointments.map((appointmentObject) => (
                        <Appointment
                            appointmentObject={appointmentObject}
                            key={appointmentObject._id}
                            cancelAppointment={cancelAppointment}
                        />
                    ))}
                </ul>
            )}
            
        </div>
    );
};

export default AppointmentsAdmin;