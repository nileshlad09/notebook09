import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
    const context = useContext(noteContext)
    const {addNote} = context;
    const [note,setNote] = useState({title:"",description:"",tag:""});
    const handleClick =(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
        props.showAlert("success","Note Added successfully")
    }
    const onChange=(e)=>{
       setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div className="component">
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
            required
            value={note.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            required
            value={note.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
            value={note.tag}
          />
        </div>
        <button disabled={note.title.length < 3 || note.description.length <5} type="submit" className="btn btn-primary btn-lg" onClick={handleClick}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddNote;
