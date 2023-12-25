import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Navbar = () => {
  let location = useLocation();
  const navigate = useNavigate()
  const logouthanlder = () => {
    localStorage.removeItem('token')
    navigate('/signup')
  }
  return (
    <>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">iNotebook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ""}`} aria-current="page" to="/about">About us</Link>
              </li>



            </ul>
            <form className="d-flex" role="search">
            {location.pathname === '/signup' ?'':
              <button className="btn btn-danger mx-2" onClick={logouthanlder} type="submit"> Log out</button>}
              {location.pathname === '/signup' ?
                <Link to='/login'>  <button className="btn btn-primary mx-2" type="submit">Login </button></Link> : ""
              }
              <Link to='/signup'>  <button className="btn btn-primary mx-2" type="submit">Sign up</button></Link>
            </form>
          </div>
        </div>
      </nav>
    </>
  )
}
