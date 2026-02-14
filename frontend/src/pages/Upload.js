import { useState } from "react";
import API from "../api";

function Upload(){

  const [form,setForm] = useState({
    title:"",
    subject:"",
    semester:"",
    file:null
  });

  const submit = async(e)=>{
    e.preventDefault();

    const data = new FormData();
    data.append("title",form.title);
    data.append("subject",form.subject);
    data.append("semester",form.semester);
    data.append("file",form.file);

    await API.post("/notes/upload",data);

    alert("Uploaded successfully");
  };

  return(
    <div className="container mt-4">

      <div className="glass-card p-4">

        <h3>Upload Notes</h3>

        <form onSubmit={submit}>

          <input
            className="form-control mb-2"
            placeholder="Title"
            onChange={(e)=>setForm({...form,title:e.target.value})}
          />

          <input
            className="form-control mb-2"
            placeholder="Subject"
            onChange={(e)=>setForm({...form,subject:e.target.value})}
          />

          <input
            className="form-control mb-2"
            placeholder="Semester"
            onChange={(e)=>setForm({...form,semester:e.target.value})}
          />

          <input
            type="file"
            className="form-control mb-3"
            onChange={(e)=>setForm({...form,file:e.target.files[0]})}
          />

          <button className="btn btn-light">
            Upload
          </button>

        </form>

      </div>
    </div>
  );
}

export default Upload;
