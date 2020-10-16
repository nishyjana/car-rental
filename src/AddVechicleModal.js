import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap'

export class AddVechicleModal extends Component{
  
    
  

    render(){
        return(
            <Modal
    
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Vehicle
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
  <Form.Group controlId="formBasicModel">
    <Form.Label>Car Model</Form.Label>
    <Form.Control type="text" placeholder="Enter Car model" />
    <Form.Text className="text-muted">
   
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicTransmission">
    <Form.Label>Transmission</Form.Label>
    <Form.Control type="text" placeholder="Enter Transmission type" />
  </Form.Group>
  
  <Form.Group controlId="formBasicColor">
    <Form.Label>Color</Form.Label>
    <Form.Control type="text" placeholder="Enter Color" />
  </Form.Group>

  <Form.Group controlId="formBasicFuel">
    <Form.Label>Fuel</Form.Label>
    <Form.Control type="text" placeholder="Enter Fuel type" />
  </Form.Group>

  <Form.Group controlId="formBasicFuel">
    <Form.Label>Availabilty</Form.Label>
    <Form.Control type="text" placeholder="Enter Fuel type" />
  </Form.Group>

  <Form.Group controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>


  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant='danger' onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
        );
    }
}

export default AddVechicleModal;