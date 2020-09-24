import React, { useState, useEffect } from 'react';
import {Button, Table, Row, Col} from 'react-bootstrap' 
import AddPatient from './addPatient'
import EditPatient from './editPatient'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';
import axios from 'axios'
import {isAuth, getCookie, signout, updateUser } from '../auth/Helper'

const PatientsAdmin = ({ history }) => {
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShowEdit, setModalShowEdit] = React.useState(false);

    const [ values, setValues ] = useState({
        patients: [],
        id: '',
        name: '',
        Contact: '',
        Address: '',
        Emergency_contact: '',
        Insurance: '',
        Appointments: '',
        loading: true
    })

        useEffect(() => {
        loadPatients();
    }, []);

    const { id, patients, name, Contact, Address, Emergency_contact, Insurance, Appointments, loading } = values;
    
    const token = getCookie('token');

    
    const loadPatients = () => {
        axios({
            method: 'GET',
            url: '/api/patient'
        })

            .then((response) => {
                const patients = response.data;
                setValues({ ...values, patients, loading: false})
                
            })

            .catch((error) => {
                if (error.response.status === 401) signout(() => history.push('/'));
            });
    }


  return (
   
        <div className="col-md-6 offset-md-3">
             <ToastContainer />
             <h1 className="pt-5 text-center">Patients Page</h1>
             <br /><br /> 
            {isAuth() && isAuth().role === 'admin' && (
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    Add Patient
                </Button>
            )}
            <AddPatient
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
  
              <br /><br />
             {loading == true ? (
                <h1 className="pt-5 text-center">Loading...</h1>
            ) : patients.length == 0 ? (
                <React.Fragment>
                    <h3 className="pt-5 text-center">No Patients!</h3>
                    <p className="lead text-center">Add new patients by clicking the button above</p>
                </React.Fragment>
            ) : (
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                            {patients.map((patient) => (
                                <tr>
                                  {/* {JSON.stringify(patient)} */}
                                    <td>{patient.name}</td>
                                    
                                    <td>
                                    {isAuth() && isAuth().role === 'admin' && (
                                    <Button variant="primary" onClick={() => {
                                      setModalShowEdit(true) 
                                      setValues({ ...values, id: patient._id, name: patient.name, Contact: patient.Contact, Address: patient.Address, Emergency_contact: patient.Emergency_contact, Insurance: patient.Insurance, Appointments: patient.Appointments })}
                                    }
                                      >
                                    
                                      
                                      Edit
                                    </Button>
                                    )}
                                    <EditPatient
                                      show={modalShowEdit}
                                      onHide={() => setModalShowEdit(false)}
                                      values = {values}

                                    />
        
                                    </td>
                                    
                                </tr>    
                            ))}
                        
                    </tbody>
                </Table>
            )}
    </div>
  )
    
};

export default PatientsAdmin;























// const PatientsAdmin = ({ history }) => {








    


//     const handleCloseEdit = (e) => {

//     }









//     return (

           
         
//                 <Button
//                     variant='primary'
//                     onClick={() => setModalShow(true)}
//                 >
//                     Add Patient
//                 </Button>
//                 <addPatient 
//                     show={modalShow}
//                     onHide={() => setModalShow(false)}
//                 />
        

            

//         </div>
//     );
// };


// // return (
// //     <div className="col-md-6 offset-md-3">
// //         <ToastContainer />
// //         <h1 className="pt-5 text-center">Patients Page</h1>
// //         <br /><br /> 
// //         <Button variant="primary" onClick ={handleShow}>
// //             Add Patient
// //         </Button>

// //         <Modal show={show} onHide={Close}>
        
// //         <Modal.Header closeButton>
// //             <Modal.Title>Patient Form</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //             
// //         </Modal.Body>
// //         <Modal.Footer>
// //             <Button variant="secondary" onClick={Close}>
// //                 Close
// //             </Button>
// //             <Button variant="primary" onClick={handleClose}>
// //                 Submit
// //             </Button>
// //         </Modal.Footer>
// //     </Modal>

// //         {/* <button className="action-buttons btn btn-primary">Add Patient</button> */}
// //         <br /><br />
// //         {loading == true ? (
// //             <h1 className="pt-5 text-center">Loading...</h1>
// //         ) : patients.length == 0 ? (
// //             <React.Fragment>
// //                 <h3 className="pt-5 text-center">No Patients!</h3>
// //                 <p className="lead text-center">Add new patients by clicking the button above</p>
// //             </React.Fragment>
// //         ) : (
// //             <Table striped bordered hover variant="dark">
// //                 <thead>
// //                     <tr>
// //                         <th>Patient Name</th>
// //                         <th>Details</th>
// //                     </tr>
// //                 </thead>
// //                 <tbody>
                    
// //                         {patients.map((patients) => (
// //                             <tr>
// //                                 <td>{patients.name}</td>
// //                                 <td>
// //                                     <Button variant="primary" onClick ={handleShow}>
// //                                         Edit
// //                                     </Button>

// //                                     <Modal show={show} onHide={Close}>
                                        
// //                                         <Modal.Header closeButton>
// //                                             <Modal.Title>Patient Form</Modal.Title>
// //                                         </Modal.Header>
// //                                         <Modal.Body>

// //                                         </Modal.Body>
// //                                         <Modal.Footer>
// //                                             <Button variant="secondary" onClick={Close}>
// //                                                 Close
// //                                             </Button>
// //                                             <Button variant="primary" onClick={handleCloseEdit}>
// //                                                 Submit
// //                                             </Button>
// //                                         </Modal.Footer>
// //                                     </Modal>
    
// //                                 </td>
                                
// //                             </tr>    
// //                         ))}
                    
// //                 </tbody>
// //             </Table>
// //         )}
// //     </div>
// // );
// // };
// export default PatientsAdmin;