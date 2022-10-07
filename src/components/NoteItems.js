import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItems = (props) => {
  const { note, updateNote } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;
  return (
    <div className="col-md-3 ">
      <div className="card my-3 noteBox">
        <div className="card-body ">
          <div className="d-flex align-items-center">
            <h4 className="card-title">{note.title}</h4>
            <i
              className="fas fa-trash-alt mx-2"
              onClick={() => {
                deleteNote(note._id);
                props.showAlert("success", "Note Deleted successfully");
              }}
            ></i>
            <i
              className="fas fa-edit mx-2"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
          <div className="tag">
            <i className="fas fa-tag"></i>
            <p>{note.tag?note.tag:"general"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItems;
