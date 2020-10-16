import React,{Component} from 'react';
import {Card, CardColumns,Form,Button} from 'react-bootstrap';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import './contact.css'

const mapStyles = {
  width: '90%',
  height: '65%',
};


export class contact  extends Component{

    render(){
        return(
          <div className="contactus">
            <div className="cHeading">
              <h4><br/>Contact Us </h4><br/>
            </div>
            <div className="details">
            <CardColumns>
            <Card bg="light" style={{ width: '50rem' }}>
    
    <Card.Body>
      
      <Card.Text>
      <Form>
  <Form.Group controlId="formName">
    <Form.Label>Name :</Form.Label>
    <Form.Control type="text"/>
  </Form.Group>

  <Form.Group controlId="formMail">
    <Form.Label>Email :</Form.Label>
    <Form.Control type="email"/>
  </Form.Group>

  <Form.Group controlId="formSubject">
    <Form.Label>Subject:</Form.Label>
    <Form.Control type="text"/>
  </Form.Group>

    <Form.Group controlId="fromTextarea">
    <Form.Label>Message:</Form.Label>
    <Form.Control as="textarea" rows="3" />
  </Form.Group>
 
  
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>

      </Card.Text>
    </Card.Body>
  </Card>
 <div className="cDetails">
            <Card bg="light" style={{ width: '18rem' }}>
    
    <Card.Body>
      <Card.Title>Address:</Card.Title>
      <Card.Text>
      <strong>No 93,   Fussesl Lane, <br/> Colombo 06, <br/>   
      Sri Lanka. 
      </strong>
      </Card.Text>
    </Card.Body>
  </Card>
  <br />
  <br/>
  
 <Card bg="light" style={{ width: '18rem' }}>
  <Card.Body>
      <Card.Title>Phone:</Card.Title>
      <Card.Text>
      <strong>+94 77 7125 043</strong>
      </Card.Text>
    </Card.Body>
  </Card>
  <br />
  <br/>
  <br/>

  <Card bg="light"style={{ width: '18rem' }}>
  <Card.Body>
      <Card.Title>Email:</Card.Title>
      <Card.Text>
      <strong>nishyjana6435@gmail.com</strong>
      </Card.Text>
    </Card.Body>
  </Card>
  <br />
  </div>
  
  </CardColumns>
            </div>
            <br /><br />
            <Map
                      google={this.props.google}
                      zoom={8}
                      style={mapStyles}
                      initialCenter={{ lat: 47.444, lng: -122.176}}
                    />
                 <br/> <br/> <br/> <br/> <br/> <br/>
                 <br/> <br/> <br/> <br/> <br/> <br/>
                 <br/> <br/> <br/> <br/> <br/> <br/> 
         </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ''
})(contact);