import React, { useState } from "react";
import { useNavigate ,Link} from "react-router-dom";


const Login = (props) => {
    
    const [crediantial, setCrediantial] = useState({email:"",password:""});
    const navigate = useNavigate();
    const handleclick = async (e)=>{
        e.preventDefault();
        const response = await fetch(`https://notebook09.herokuapp.com/api/auth/login`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:crediantial.email,password:crediantial.password})
      });
      const json = await response.json()
      if(json.success){
        localStorage.setItem('token', json.authToken);
        navigate("/");        
        props.showAlert("success","You are successfully logged in")
        
      }
      else{
        props.showAlert("danger","Invalid crediantial")
      }
    }

    const onChange=(e)=>{
      setCrediantial({ ...crediantial, [e.target.name]: e.target.value });
    }
    

    return (
    <>
      <form className="container login_container" onSubmit={handleclick}>
        
        <div className="mb-3 ">
        <h1 className="text-center mb-4">Login</h1>
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            value={crediantial.email}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            value={crediantial.password}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <p className="mt-3">Don't have an Account?
          <Link to="/signup" className="acc px-3">Create Account</Link>
        </p>
      </form>
    </>
  );
};

export default Login;
