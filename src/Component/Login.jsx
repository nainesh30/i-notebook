import React ,{ useState}  from 'react'
import {useNavigate} from "react-router-dom"

export const Login = () => {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({email:"" , password:"" })
  const OnChangeHndler = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  }
const startlogin = async (email,password) => {
  const response = await fetch(`http://localhost:5000/api/auth/login`, {
    method: 'POST',
    body: JSON.stringify({email,password}),
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
    startlogin(credentials.email,credentials.password)
  
  }
  return (
    <div className='container py-3'>


      <form onSubmit={handleclick}  className='my-2'>
        <div className="form-outline mb-2">
          <label className="form-label" htmlFor="form2Example1">Email address</label>
          <input type="email" required={true}  id="email" onChange={OnChangeHndler}  className="form-control" />
        </div>

        <div className="form-outline mb-2">
          <label className="form-label" htmlFor="form2Example2">Password</label>
          <input type="password" required={true} id="password" onChange={OnChangeHndler}  className="form-control" />
        </div>

        <div className="row mb-2">
          <div className="col d-flex justify-content-center">


          </div>


        </div>

        <button type="submit" className="btn btn-primary btn-block mb-2">Sign in</button>


      </form>

    </div>
  )
}
