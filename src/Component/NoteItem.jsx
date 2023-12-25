import React  ,{useContext} from 'react'
import NoteContext from '../Context/Notes/noteContext'

export const NoteItem = (props) => {
    
  const Context = useContext(NoteContext);
  const { deleteFunction} = Context;
    const { note , updatenote} = props;

    
    return (
        <>
    <div className="col-md-3 ">
            <div className="card my-3 mx-3" >                               
                <div className="card-body">

                    <div className="d-flex align-items-center">
                    <h5 className="card-title">{note.title}</h5>
                    <i className="fa-sharp fa-solid fa-pen mx-2" onClick={()=>{updatenote(note)}}  style={{"color": " rgb(8 99 96)"}}></i>
                    <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteFunction(note._id)}} style={{"color": "rgb(139 53 53)"}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                    <h6 className="card-subtitle  text-body-secondary">{note.tag}</h6>
                </div>
            </div>
            </div>
        </>
    )
}
