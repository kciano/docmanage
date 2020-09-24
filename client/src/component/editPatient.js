import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';
import axios from 'axios'

const EditPatient = (props) => {

    const { id, name, Contact, Address, Emergency_contact, Insurance, Appointments} = props.values
   

    

    const handleClose = (e) => {
        e.preventDefault();
        
        axios({
            method: 'PUT',
            url: `/api/patient/${id}`,
            data: { 
                name: e.target.name.value,
                Contact: e.target.Contact.value,
                Address: e.target.Address.value,
                Emergency_contact: e.target.Emergency_contact.value,
                Insurance: e.target.Insurance.value
             },
        })
     
        .then((response) => {
            toast.success(response.data.message);
        })
        
        .catch((error) => {
            toast.error(error.response.data.error)
        });
    
        alert("Patient has been updated")
        window.location.reload(false);
    }

    const handleDelete = (e) => {
        e.preventDefault();
        
        axios({
            method: 'DELETE',
            url: `/api/patient/${id}`
        })
     
        .then((response) => {
            toast.success(response.data.message);
        })
        
        .catch((error) => {
            toast.error(error.response.data.error)
        });
    
        alert("Patient has been deleted")
        window.location.reload(false);
    }

    return (
        <div>
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
                     <Form onSubmit={handleClose}>
                         <Form.Group controlId="name">
                             <Form.Label>Name: </Form.Label>                      
                             <Form.Control type="text" name='name' defaultValue = {name} required placeholder='Name' />
                         </Form.Group>

                         <Form.Group controlId="Contact">
                             <Form.Label>Contacts: </Form.Label>
                             <Form.Control type="text" name='Contact' defaultValue = {Contact} required placeholder='Contact'  />
                         </Form.Group>

                         <Form.Group controlId="Address">
                             <Form.Label>Address: </Form.Label>
                             <Form.Control type="text" name='Address' defaultValue = {Address} required placeholder='Address' />
                         </Form.Group>

                         <Form.Group controlId="Emergency_contact">
                             <Form.Label>Emergency contact: </Form.Label>
                             <Form.Control type="text" name='Emergency_contact' defaultValue = {Emergency_contact} required placeholder='Emergency contact'  />
                         </Form.Group>

                         <Form.Group controlId="Insurance">
                             <Form.Label>Insurance: </Form.Label>
                             <Form.Control type="text" name='Insurance' defaultValue = {Insurance} required placeholder='Insurance' />
                         </Form.Group>


                         
                         <Form.Group>
                            <Button type="submit">Submit</Button>
                         </Form.Group>

                     
                     </Form>

               
                                    
                     
                 </Col>
             </Row>
        </Modal.Body>
        <Modal.Footer>  
            <Button className="btn btn-danger" onClick={handleDelete}>Delete</Button>
            <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
        </div>
    );
};

export default EditPatient;