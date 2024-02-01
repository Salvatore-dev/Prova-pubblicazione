"use client"
import { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';

import NewHeader from '../newHeader';

function NavBarBootstap() {
    const [show, setShow] = useState(false)
  return (
    <>
    <style type="text/css">
        {`
    .btn-flat {
      background-color: purple;
      color: white;
    }

    .btn-xxl {
      padding: 1rem 1.5rem;
      font-size: 1.5rem;
    }
    `}
      </style>
     <Alert show={show} dismissible variant="success">
      <Alert.Heading>Il mio avviso</Alert.Heading>
      <p>La casa e morbida, non conviene piangere, a meno che non si tratti diuna piccola compagnia aerea, ne ha bisogno</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close me
          </Button>
        </div>
    
    </Alert>
    {!show && <Button size='lg' variant='flat' onClick={() => setShow(true)}>Show Alert</Button>}
    <NewHeader/>
    </>
  )
}

export default NavBarBootstap