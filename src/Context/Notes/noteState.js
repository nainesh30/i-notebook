import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) =>{
const host = "http://localhost:5000"
const notesInitial = [ ]
const [notes, setNotes] = useState(notesInitial)

const getallnotes = async (token)=>  {
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: 'GET',
    headers: {
       'Content-type': 'application/json',
       'auth-token': token
    },
    }) 
    const json = await response.json()
    // console.log(json);
    setNotes(json)

}

  const AddNoteFnction = async (title,description,tag)=>  {
    const note = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      body: JSON.stringify({title,description,tag}),
      headers: {
         'Content-type': 'application/json',
         'auth-token': localStorage.getItem('token')
      },
      })   
      const addnotenew = await note.json()
      setNotes(notes.concat(addnotenew))
 
  }
 

  const deleteFunction = async (id)=>  {
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
         'Content-type': 'application/json',
         'auth-token':   localStorage.getItem('token')
      },
      })
    const newNotes = notes.filter((note)=>{return note._id!==id})
  setNotes(newNotes)
  }

  const editnote = async  (id,title,description,tag)=>{
    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      body: JSON.stringify({title,description,tag}),
      headers: {
         'Content-type': 'application/json',
         'auth-token': localStorage.getItem('token')
      },
      })
      getallnotes(localStorage.getItem('token'))
  }





  
    return (

        <NoteContext.Provider value = {{notes,setNotes  , AddNoteFnction,deleteFunction , editnote , getallnotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;