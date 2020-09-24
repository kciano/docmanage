import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';
import axios from 'axios'
const AddPatient = (props) => {

  const [ values, setValues ] = useState({
    patients: [],
    name: '',
    Contact: '',
    Address: '',
    Emergency_contact: '',
    Insurance: ''
  })

  const { patients, name, Contact, Address, Emergency_contact, Insurance, loading } = values;

  const handleChange = (name) => e => {
      setValues({ ...values, [name]: e.target.value })
  }

  const handleClose = (e) => {
    e.preventDefault();

    axios({
        method: 'POST',
        url: `/api/patient/new`,
        data: { name, Contact, Address, Emergency_contact, Insurance },
    })
 
    .then((response) => {
        toast.success(response.data.message);
    })
    
    .catch((error) => {
        toast.error(error.response.data.error)
    });

    alert("Patient has been added")
    window.location.reload(false);
}
    
    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Patient Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
                                           
            <Col sm={6}>
              <Form>
                <Form.Group controlId="editname">
                  <Form.Label>Names: </Form.Label>
                  <Form.Control type="text" name='name' required placeholder='Name' onChange = {handleChange('name')}  />
                </Form.Group>

                <Form.Group controlId="editContact">
                  <Form.Label>Contact: </Form.Label>
                  <Form.Control type="text" name='Contact' required placeholder='Contact' onChange = {handleChange('Contact')}/>
                </Form.Group>

                <Form.Group controlId="editAddress">
                  <Form.Label>Address: </Form.Label>
                  <Form.Control type="text" name='Address' required placeholder='Address' onChange = {handleChange('Address')}/>
                </Form.Group>

                <Form.Group controlId="editEmergency_contact">
                  <Form.Label>Emergency contact: </Form.Label>
                  <Form.Control type="text" name='Emergency_contact' required placeholder='Emergency contact' onChange = {handleChange('Emergency_contact')}/>
                </Form.Group>

                <Form.Group controlId="editInsurance">
                  <Form.Label>Insurance: </Form.Label>
                  <Form.Control type="text" name='Insurance' required placeholder='Insurance' onChange = {handleChange('Insurance')}/>
                </Form.Group>

              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Submit</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
};

export default AddPatient;




// import React, { Component } from 'react';
// import { Modal, Button, Row, Col, Form } from 'react-bootstrap'

// const addPatient = (props) => {
//     return (
//         <Modal
//             {...props}
//             size="lg"
//             aria-labelledby="contained-modal-title-vcenter"
//             centered
//         >
//         <Modal.Header closeButton>
//             <Modal.Title id="contained-modal-title-vcenter">
//             Modal heading
//             </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//             <h4>Centered Modal</h4>
//             <p>
//             Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
//             dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
//             consectetur ac, vestibulum at eros.
//             </p>
//         </Modal.Body>
//         <Modal.Footer>
//             <Button onClick={props.onHide}>Close</Button>
//         </Modal.Footer>
//         </Modal>
//     );
// };

// export default addPatient;




