import React from 'react';
import './Appointment.css';
import moment from 'moment'
import {isAuth} from '../auth/Helper'

const AppointmentAdmin = ({ appointmentObject, cancelAppointment }) => {
    const { _id, name, Date } = appointmentObject;
    const DateConvert = moment(Date).format("dddd, MMMM Do YYYY, h:mm:ss a");
    const displayName = name.name;

    return (
        <div className="list-group-item">
            <div className="appointment-content">
                <p>Appointment for {displayName}</p>
                
                <p>{DateConvert}</p>

                {isAuth() && isAuth().role === 'admin' && (
                    <div className="d-flex icons">
                        <button className="action-buttons btn btn-danger" onClick={cancelAppointment.bind(_id,_id)}>
                            Cancel Appointment
                        </button>
                    </div>
                )}
            </div>
            
        </div>
    );
};

export default AppointmentAdmin;