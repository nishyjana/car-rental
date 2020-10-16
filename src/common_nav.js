class commonnav extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <Navbar style={{'background-color': 'rgb(190, 60, 49)'}}>
            <Navbar.Brand >Banger and Co.</Navbar.Brand> 
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
            <Nav>
                
            <NavLink className="d-inline p-2  text-dark"
            to="/">Home</NavLink>

            <NavLink className="d-inline p-2 text-dark"
            to="/Register">Register</NavLink>

            <NavLink className="d-inline p-2 text-dark"
            to="/unav">Profile</NavLink>

            <NavLink className="d-inline p-2 text-dark"
            to="/booking">Bookings</NavLink>
                           
            

            <NavLink className="d-inline p-2 text-dark"
            to="/contact">Contact</NavLink>
            

            <NavLink className="d-inline p-2 text-dark"
            to="/login">Login</NavLink>
            
            </Nav>
        </Navbar>
          );
    }
}
 
export default commonnav ;