import { Link,useNavigate } from "react-router-dom";

function Navbar({ setToken,dark,setDark }){

  const navigate = useNavigate();

  const logout = ()=>{
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  const toggleTheme = ()=>{
    setDark(!dark);
  };

  return(
    <div
      style={{
        background:"#1f2937",
        padding:"10px",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center"
      }}
    >

      <h3 style={{color:"white"}}>
        📚 Digital Notes
      </h3>

      <div>

        <button
          onClick={toggleTheme}
          style={{marginRight:"10px"}}
        >
          {dark ? "Light" : "Dark"}
        </button>

        <Link to="/dashboard">
          <button style={{marginRight:"10px"}}>
            Dashboard
          </button>
        </Link>

        <Link to="/upload">
          <button style={{marginRight:"10px"}}>
            Upload
          </button>
        </Link>
        <Link to="/profile">
  <button style={{marginRight:"10px"}}>
    Profile
  </button>
</Link>


        <button onClick={logout}>
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;
