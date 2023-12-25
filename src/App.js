
import './App.css';
import { Navbar } from './Component/Navbar';
import { Home } from './Component/Home';
import { About } from './Component/About';
import { BrowserRouter as Router,Routes,  Route } from 'react-router-dom';
import NoteState from './Context/Notes/noteState';
import { Login } from './Component/Login';
import { Signup } from './Component/Signup';

function App() {
  return (
 <>
 <NoteState>
<Router>
 <Navbar/>
<div className="container">
 <Routes>
 <Route exact path ="/" element={<Home/>}></Route>
 <Route exact path ="/about" element={<About/>}></Route>
 <Route exact path ="/login" element={<Login/>}></Route>
 <Route exact path ="/signup" element={<Signup/>}></Route>
 </Routes>
 </div>
 </Router>
 </NoteState>
 
 </>
  );
}

export default App;
