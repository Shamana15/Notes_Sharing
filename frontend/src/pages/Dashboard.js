import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

function Dashboard(){

  const [notes,setNotes] = useState([]);
  const [search,setSearch] = useState("");

  useEffect(()=>{
    fetchNotes();
  },[]);

  const fetchNotes = async()=>{
    const res = await API.get("/notes");
    setNotes(res.data);
  };

  const deleteNote = async(id)=>{
    if(window.confirm("Delete this note?")){
      await API.delete(`/notes/${id}`);
      fetchNotes();
    }
  };

  const filtered = notes.filter(n =>
    n.title.toLowerCase()
    .includes(search.toLowerCase())
  );

  return(
    <div style={{padding:"20px"}}>

      <h2>All Notes</h2>

      {/* Search */}
      <input
        placeholder="Search notes..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        style={{
          padding:"8px",
          width:"100%",
          marginBottom:"20px"
        }}
      />

      {/* Responsive Grid */}
      <div
        style={{
          display:"grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap:"20px"
        }}
      >

        {filtered.map(n=>(
          <div
            key={n._id}
            style={{
              border:"1px solid #ccc",
              padding:"10px",
              borderRadius:"10px",
              background:"white"
            }}
          >

            <h3>{n.title}</h3>
            <p>{n.subject}</p>

            {/* Preview */}
            {n.fileUrl.endsWith(".pdf") ? (

              <iframe
                src={`http://localhost:5000/${n.fileUrl}`}
                width="100%"
                height="200"
                title="preview"
              />

            ) : (

              <img
                src={`http://localhost:5000/${n.fileUrl}`}
                width="100%"
                height="200"
                alt="preview"
              />

            )}

            <br/>

            {/* Buttons */}
            <Link to={`/view/${n.fileUrl}`}>
              <button style={{marginRight:"5px"}}>
                View
              </button>
            </Link>

            <a
              href={`http://localhost:5000/${n.fileUrl}`}
              download
            >
              <button style={{marginRight:"5px"}}>
                Download
              </button>
            </a>

            <button
              onClick={()=>deleteNote(n._id)}
              style={{
                background:"red",
                color:"white"
              }}
            >
              Delete
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Dashboard;
