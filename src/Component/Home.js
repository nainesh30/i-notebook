import React from 'react'
import { Notes } from './Notes'
import { AddNote } from './AddNote'
import { Loginmsg } from './Loginmsg'

export const Home = () => {
  return (
    <>
  
{localStorage.length===0?<Loginmsg></Loginmsg> :
  <AddNote></AddNote>}
{localStorage.length===0?"":
<Notes></Notes>}
    </>
  )
}
