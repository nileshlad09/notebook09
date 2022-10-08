import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) =>{
    const host ="https://notebook09.herokuapp.com"
    const noteInitial = []
    const [notes ,setNotes]= useState(noteInitial)
 
    const getNotes= async()=>{
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token') 
        }
      });
      const json = await response.json()
      setNotes(json)
    }    

    
    const addNote= async (title,description,tag)=>{
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag})
      });
      const json = await response.json()
      setNotes(notes.concat(json))
    }

    const deleteNote=async(id)=>{
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
        }
      });
      const json = await response.json()
      console.log(json);
       console.log("note delete",id);
       const newnote = notes.filter((note)=>{return note._id!==id});
       setNotes(newnote)
    }

    const editNote =async(id,title, description, tag)=>{
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
         'auth-token':localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag})
      });
      const json = await response.json()
      
      const newNotes = JSON.parse(JSON.stringify(notes))
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id===id){
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes)
    }
    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    );
}
export default NoteState