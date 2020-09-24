import React from 'react';
import { withRouter } from 'react-router-dom';


const PageNotFound = () => (
   
    <div
        className="text-center d-flex"
        style={{ height: '90vh', justifyContent: 'center', alignItems: 'center' }}
    >
        <h1>Oof! This page does not exists</h1>
    
    </div>
)




export default withRouter(PageNotFound);