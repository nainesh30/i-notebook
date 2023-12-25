import React ,{useContext, useEffect, useState} from 'react'
import NoteContext from '../Context/Notes/noteContext'
 

export const AddNote = () => {

  const Context = useContext(NoteContext);
  const { AddNoteFnction } = Context;
const [note, setNote] = useState({title:"" , description:"" , tag: "Default"})
const [data, setData] = useState({name:""})

  const OnChangeHndler = (e)=> {
  
    setNote({...note,[e.target.id]:e.target.value});
  }
  const handleclick = (e)=> {
    e.preventDefault();
    AddNoteFnction(note.title,note.description,note.tag);
    setNote({title:"" , description:"" , tag: ""})
  
  }

  const fetchuserdata = async ()=>  {
    const fetchdata = await fetch(`http://localhost:5000/api/auth/getuser`, {
      method: 'POST',
      headers: {
         'Content-type': 'application/json',
         'auth-token': localStorage.getItem('token')
      },
      })   
      const datajson = await fetchdata.json()
      setData({...data,name:datajson.name})
      console.log(data);
      
 
  }
  useEffect(() => {
    fetchuserdata()
 // eslint-disable-next-line
  },[])
  
  return ( 
    
    <div className="container my-3">
<h3>Welcome to iNotebok {data.name}</h3>
  <h2>Add a Note </h2>
  <form  onSubmit={handleclick} className='my-3'>
<div className="mb-3">
  <label className="form-label" id='form'>Enter Title</label>
  <input type="text" className="form-control" id="title" required={true} minLength={5}  value={note.title} onChange={OnChangeHndler} aria-describedby="emailHelp"/>
  <div id="emailHelp" className="form-text"></div>
</div>
<div className="mb-3">
  <label  className="form-label">Description</label>
  <input type="text" className="form-control" id="description"required={true} value={note.description} minLength={5} onChange={OnChangeHndler} />
</div>
<div className="mb-3">
  <label  className="form-label">Tag</label>
  <input type="text" className="form-control" id="tag" required={true} value={note.tag}onChange={OnChangeHndler}/>
</div>

<button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
  )
}
