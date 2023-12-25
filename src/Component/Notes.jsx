import React ,{useContext, useEffect, useRef,useState} from 'react'
import NoteContext from '../Context/Notes/noteContext'
import { NoteItem } from './NoteItem';


export const Notes = () => {
    
  const Context = useContext(NoteContext);
  const {notes,getallnotes,editnote} = Context;
  const [note, setNote] = useState({title:"" , description:"" , tag: "Default"})

  const OnChangeHndler = (e)=> {
    setNote({...note,[e.target.id]:e.target.value});
  }
 
  const handleclick = ()=> {
    console.log("updating the note " , note);
    editnote(note._id,note.title,note.description,note.tag)
  }
 
  useEffect(() => {
   const token =  localStorage.getItem('token')
 getallnotes(token)
 // eslint-disable-next-line
  }, [])

  const ref = useRef(null)
const updatenote = (currentnote) => {
  console.log("update note");
  setNote(currentnote)
  ref.current.click()
}
  return (
    <>
    <h2>Your Notes</h2>

<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Notes</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className='my-3'>
<div className="mb-3">
  <label className="form-label">Enter Title</label>
  <input type="text" className="form-control" id="title" value={note.title} onChange={OnChangeHndler} aria-describedby="emailHelp"/>
  <div id="emailHelp" className="form-text"></div>
</div>
<div className="mb-3">
  <label  className="form-label">Description</label>
  <input type="text" className="form-control" id="description" value={note.description}  onChange={OnChangeHndler} />
</div>
<div className="mb-3">
  <label  className="form-label">Tag</label>
  <input type="text" className="form-control" id="tag" value={note.tag}  onChange={OnChangeHndler}/>
</div>
</form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" onClick={handleclick} data-bs-dismiss="modal" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    
    <div className="row ">
      <div className="container">
        {notes.length===0 && 'No notes found try logging with your account'}
      </div>
    {notes.map((note)=>{
      return <NoteItem  key = {note._id} updatenote={updatenote} note = {note}/>
    })}
    </div>
    </>
  )
}
