import { useEffect,useState } from "react";
import API from "../api";

function Profile(){

  const [user,setUser] = useState({});

  useEffect(()=>{
    fetchProfile();
  },[]);

  const fetchProfile = async()=>{
    const res = await API.get("/auth/profile");
    setUser(res.data);
  };

  return(
    <div style={{padding:"20px"}}>

      <h2>User Profile</h2>

      <div
        style={{
          border:"1px solid #ccc",
          padding:"20px",
          borderRadius:"10px",
          width:"300px",
          background:"white"
        }}
      >

        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>

      </div>

    </div>
  );
}

export default Profile;
