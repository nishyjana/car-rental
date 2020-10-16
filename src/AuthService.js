import axios from "axios";
import { SelectPicker } from "rsuite";

export function isAuthenticated( userData) {   
  return function(dispatch) {
           
     let url =  'http://localhost:8080/authenticate'
    
    }  
    
}



export async function doLogin(username, password) {
 if(username!=="" && password!=='') {
    let url =  'http://localhost:8080/authenticate';
     let obj={
       username:username,
       password:password
     }
     axios.post(url, obj,username)
        .then((response) => {  
          localStorage.removeItem( "token" ) 
          localStorage.setItem( "token", response.data.jwt );
          if(isAuthenticated = true ){
             if(obj.username=="admin")
             window.location='/AdminUserDetails'
            else{
                        window.location='/'
                      }
          } 
          else{
            window.location='/'
          }
         })
        .catch((err) => {
          
          alert("please login again")
          
        })
         
      
      
      
    
   
 
   
   
     
  }
  else{
    alert(" provide the correct uername and password")
  }
   return {
     type: "LOGIN_EMPTY",
     payload: {
     message : "Empty username or password.",
    }
  }

}


  


 

