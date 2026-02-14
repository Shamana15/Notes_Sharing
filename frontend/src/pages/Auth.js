import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Auth({ setToken }){

  const [isLogin,setIsLogin] = useState(true);

  const [form,setForm] = useState({
    name:"",
    email:"",
    password:""
  });

  const navigate = useNavigate();

  const submit = async(e)=>{
    e.preventDefault();

    if(isLogin){

      const res = await API.post("/auth/login",form);

      localStorage.setItem("token",res.data.token);
      setToken(res.data.token);
      navigate("/dashboard");

    }else{

      await API.post("/auth/register",form);
      alert("Registered! Please login");
      setIsLogin(true);
    }
  };

  return(
    <div className="d-flex justify-content-center align-items-center vh-100">

      <div className="glass-card p-4" style={{width:"380px"}}>

        <h3 className="text-center mb-3">
          📚 Digital Notes
        </h3>

        <form onSubmit={submit}>

          {!isLogin && (
            <input
              className="form-control mb-2"
              placeholder="Name"
              onChange={(e)=>setForm({...form,name:e.target.value})}
            />
          )}

          <input
            className="form-control mb-2"
            placeholder="Email"
            onChange={(e)=>setForm({...form,email:e.target.value})}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            onChange={(e)=>setForm({...form,password:e.target.value})}
          />

          <button className="btn btn-light w-100">
            {isLogin ? "Login" : "Register"}
          </button>

        </form>

        <p
          className="text-center mt-3"
          style={{cursor:"pointer"}}
          onClick={()=>setIsLogin(!isLogin)}
        >
          {isLogin
            ? "New user? Register"
            : "Already have account? Login"}
        </p>

      </div>
    </div>
  );
}

export default Auth;
