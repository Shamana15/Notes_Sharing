import { useParams } from "react-router-dom";

function ViewPDF(){

  const { file } = useParams();

  return(
    <div style={{padding:"20px"}}>

      <h2>PDF Viewer</h2>

      <iframe
        src={`http://localhost:5000/${file}`}
        width="100%"
        height="800px"
        title="PDF Viewer"
        style={{border:"none"}}
      />

    </div>
  );
}

export default ViewPDF;
