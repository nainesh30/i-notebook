import React ,{ useState}  from 'react'
import {useNavigate} from "react-router-dom"
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  
}
from 'mdb-react-ui-kit';

export const Signup = () => {
  
  const navigate = useNavigate()
  const [userdata, setUserdata] = useState({name:"", email:"" , password:"" })
  const OnChangeHndler = (e) => {
    setUserdata({ ...userdata, [e.target.id]: e.target.value });
  }

  const startsignup = async (name,email,password) => {
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST',
      body: JSON.stringify({name,email,password}),
      headers: {
         'Content-type': 'application/json'
      },
      })
      const json = await response.json()
      console.log(json);
      console.log(response.status);
      if(response.status===200){
        localStorage.setItem('token', json.authtoken)
        navigate("/")
      }
      else{
        alert("Enter correct credentials")
      }
      // getallnotes()
  }

  const handleclick = (e)=> {
    e.preventDefault();
    startsignup(userdata.name,userdata.email,userdata.password)
    
  
  }
  return (
    <div>
      <form onSubmit={handleclick}>
      <MDBContainer  fluid>

<MDBCard className='text-black m-5'  style={{borderRadius: '25px'}}>
  <MDBCardBody>
    <MDBRow>
      <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

        <div className="d-flex flex-row align-items-center mb-4 ">
          <MDBIcon fas icon="user me-3" size='lg'/>
          <MDBInput label='Your Name' id='name' type='text' onChange={OnChangeHndler}  required={true} className='w-100'/>
        </div>

        <div className="d-flex flex-row align-items-center mb-4">
          <MDBIcon fas icon="envelope me-3" size='lg'/>
          <MDBInput label='Your Email' id='email' onChange={OnChangeHndler} required={true} type='email'/>
        </div>

        <div className="d-flex flex-row align-items-center mb-4">
          <MDBIcon fas icon="lock me-3" size='lg'/>
          <MDBInput label='Password' id='password' onChange={OnChangeHndler}  required={true} type='password'/>
        </div>

       


        
        <button type="submit"  className="btn btn-primary btn-block mb-2">Register</button>

      </MDBCol>

      <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
        <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
      </MDBCol>

    </MDBRow>
  </MDBCardBody>
</MDBCard>

</MDBContainer>
</form>
    </div>
  )
}
