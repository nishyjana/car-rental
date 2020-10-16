import React,{Component} from 'react';
import {
    Card,CardLink, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import axios from 'axios';
import './ohterRates.css'


class otherrates extends Component {
    state = {
        Rates:[]
       
    }
    componentDidMount() {
        this._refreshRates();
   
     
    
      }
    _refreshRates() {
    
        axios.get("http://localhost:8082/carDetails").then(response => {
          this.setState({
            Rates: response.data
          });
        });
      }
 render() { 
        let Rates = this.state.Rates.map(rate => {
          return(
              
                <div className="OtherRates">
              
                 
              
                <Card style={{ display: 'flex',flexDirection: 'row'}}>
                 
                 <CardBody>
                   
                    <CardText>Car Model: {rate.carModel} </CardText>
                    <CardText>Car rate: {rate.price} </CardText>
            
             </CardBody>
                     </Card><br/>

                
                     
                 </div>
            );
                
             
          });
          return(
              <div className="heading">
                    
                <h1 align='center' title >Rates of vehicles </h1>
                  {Rates}
              </div>
          );
    }
}
 
export default otherrates;