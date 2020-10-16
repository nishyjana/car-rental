import React, { Component } from 'react';
import axios from 'axios';
import {
  Card,CardDeck, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,Container,Col
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { CardColumns, CardGroup, Row } from 'react-bootstrap';
import Booking from './booking'
import './home.css'
import Footer from './footer'


class Home extends Component {
    state = {
        cars:[],
        suv:[]
      }
    componentWillMount() {
        this._refreshbooks();
        this._refreshSUV();
    }
    _refreshbooks(){
        axios.get('http://localhost:8080/cars',
        {
       
        },
        ).then((response) => {
          this.setState({
            cars: response.data
          })
        });
       }
      
       clicklogin(){
         window.location='/Login'
       }
       clickRegiter(){
        window.location='/Register'
      }
      clickBoooking(){
        window.location='/booking'
      }
      
       
       loginbook(){
         if(localStorage.length == 0){
           return(<div>
           <Button onClick={this.clickRegiter}>REGISTER</Button><br></br>
           <Button onClick={this.clicklogin}>LOGIN TO BOOK</Button></div>)
         }
         else {
           return(
          <div><Button onClick={this.clickBoooking}>BOOK</Button></div>
         );
         }
       }
       _refreshSUV(){
        axios.get('http://localhost:8080/suv').then((response) => {
          this.setState({
            suv: response.data
          })
        });
       }
       renderSUV(){
        let suv = this.state.suv.map(s => {
        return(
             <div className="App">
               
           
              <Card top width="100%"   flex direction="horizontal">
                <CardImg  width="88%" height="88%" src={s.imgURl} alt="Card image cap" />
               <CardBody>
                  <CardTitle  key={s.carModel}> Model: {s.carModel}</CardTitle>
                <CardSubtitle>   Rental for One Day: {s.price}</CardSubtitle>
          <CardText>   Type : {s.carType}</CardText>
                  {this.loginbook()}
                 
           </CardBody>
                   </Card><br/>
        
 
 
               </div>
          );
              
           
        });
        return(
            <div className="heading">
                  <Booking/>
                
              <CardColumns >
              
              {suv}
              
              </CardColumns>
             
      
               
               

            </div>
        );
       }
       rendercars(){
        let cars = this.state.cars.map(car => {
          

            
           
          return(
            
              <div className="App">
            
             
            <CardDeck>
              <Card  style={{ display: 'centre'}}>
                <CardImg top width="%" height="6%" src={car.imgURl} alt="Card image cap" />
               <CardBody>
                  <CardTitle   key={car.carModel}>Car Model: {car.carModel}</CardTitle>
                <CardSubtitle>Car Rental for One Day: {car.price}</CardSubtitle>
          <CardText>  Car Type : {car.carType}</CardText>
                  {this.loginbook()}
                 
           </CardBody>
                   </Card><br/>

              
                   </CardDeck>
                   
               </div>
          );
              
           
        });
        return(
            <div className="heading">
                  <Booking/>
                  <div class="panel-group">
  <div class="panel panel-default">
    <div class="panel-body">Panel Content</div>
  </div>
  <div class="panel panel-default">
    <div class="panel-body">Panel Content</div>
  </div>
</div>
                {cars}
            </div>
        );
       }
       
  
    render() { 
      return(
     <div>
    
     {this.renderSUV()}
  
     </div>
     )
       
    }
}
 
export default withRouter(Home);