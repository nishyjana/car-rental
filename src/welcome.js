import React, { Component } from 'react';
import axios from 'axios';
import {
  Card,CardLink, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';




class Welcome extends Component {
    state = {
        cars:[]
      }
    componentWillMount() {
        this._refreshbooks();
    }
    _refreshbooks(){
        axios.get('http://localhost:8080/cars').then((response) => {
          this.setState({
            cars: response.data
          })
        });
       }
       constructor(props){
         super(props);
       }
       
  
    render() { 
        let cars = this.state.cars.map(car => {
          
          

            
           
            return(
              
                <div className="App">

                 
                
              
                 <Card style={{direction:'row', display: 'flex',flexDirection: 'row'}}>
                  <img top width="30%" height="20%" src={car.imgURl} alt="Card image cap" />
                 <CardBody>
                    <CardTitle>Car Model: {car.carModel}</CardTitle>
                  <CardSubtitle>Car Rental for One Day: {car.price}</CardSubtitle>
            <CardText>  Car Type : {car.carType}</CardText>
                     
                     <Button onClick="" >Book</Button>
                   
                     
             </CardBody>
                     </Card>
                 </div>
            );
                
             
          });
          return(
              <div>
               
                
                  {cars}
              </div>
          );
    }
}
 
export default Welcome;