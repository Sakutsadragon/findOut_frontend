import React ,{ useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import stylerr from "styled-components"
import Logo from"../assets/logoo.png"
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/ReactToastify.css"
import axios from "axios";
import { registerRoute } from '../utils/APIRoutes';
function Register() {


    const navigate = useNavigate()
    const[values,setvalues]=useState({
        username:"",
        email:"",
        password:"",
        confirmpassword:"",
        typerole:"",
    })


    const toastoptions={
        position: "bottom-right",
        autoclose: 4000,
        pauseOnHover: true,
        draggable: true,
    }

    useEffect(()=>{
        if(localStorage.getItem("findouts"))
            navigate('/hstud');
        else if(localStorage.getItem("findoutc"))
          navigate('/hcamp');
        else if(localStorage.getItem("findoutco"))
          navigate('/hcomp');
        else if(localStorage.getItem("findoutg"))
          navigate('/hgrad');
    },[])

    const clisubmission= async(event)=>{
        event.preventDefault();
        if(validentry()){
            const { password,username,email,typerole}=values;
            const {data}= await axios.post(registerRoute,{
                username,
                email,
                password,
                typerole
            });
            if(data.status === false){
                toast.error(data.msg,toastoptions);
            }
            if(data.status === true){
              console.log(values);
                if(typerole === "student"){
                  navigate("/student",{state:values});
                 
                }
                  else if(typerole === "cpc"){
                    navigate("/campus",{state:values});
                    
                  }
                  else if(typerole === "hr"){
                    navigate("/company",{state:values});
                    
                  }
                  else if(typerole === "gra"){
                    navigate("/grad",{state:values});
                   
                  }
                  
            }
           
        }
    };


 

    const validentry= ()=>{
        const { password,confirmpassword,username,email,typerole}=values;
        if(password!==confirmpassword){
            toast.error("Password and Confirm Password are not same",toastoptions);
            return false;
        }
        else if(username.length<4){
            toast.error("Username should contain atleast 4 letters",toastoptions);
            return false;
        }
        else if(password.length<8){
            toast.error("Password should contain atleast 8 letters",toastoptions);
            return false;
        }
        else if(email.length<11){
            toast.error("Enter valid E-Mail",toastoptions);
            return false;
        }
        else if(email.length>=11){
            const lastmail=email.substring(email.length-10,email.length);
            // console.log(`${lastmail}`);
            if(lastmail !="@gmail.com"){
                toast.error("Enter valid E-Mail",toastoptions);
                return false;
            }
        }
        else if(typerole===undefined){
          toast.error("Enter Role",toastoptions);
        }
        return true;

    };

    const textchan= (event)=>{
        setvalues({...values,[event.target.name]:event.target.value})
    };
  return (
     <div>
      <Formfiller>
        <form action="" onSubmit={(event)=>clisubmission(event)}>

        <div className="brand">
            <img src={Logo} alt="" />
        </div>
        <input type='text' placeholder='Username' name="username" onChange={(ev)=>textchan(ev)}></input>
        <input type='text' placeholder='Email' name="email" onChange={(ev)=>textchan(ev)}></input>
        <input type='password' placeholder='Password' name="password" onChange={(ev)=>textchan(ev)}></input>
        <input type='password' placeholder='Confirm Password' name="confirmpassword" onChange={(ev)=>textchan(ev)}></input>
        <select name="typerole" onChange={(ev) => textchan(ev)}>
        <option value="" disabled selected hidden>Are you a </option>
        <option value="student">Student</option>
        <option value="gra">Graduated</option>
        <option value="hr">Hiring Manager</option>
        <option value="cpc">Campus Placement Cell</option>
         </select>

        <button type='submit'>Start</button>
    <span>Already have an account? <Link to="/login">Login</Link></span>

        </form>
        
      </Formfiller>
    
    <ToastContainer/>
     </div>
  )
}

const Formfiller = stylerr.div`
height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: white;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 3rem;
      transform: scale(2.8);
      margin-bottom:1.3rem;
      margin-top:0.2rem;
    }
    h1 {
      color: #148A4E;
      padding-top: 15px;
      text-transform: uppercase;
    }
  }

  form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: rgb(300,300,300);
  border-radius: 2rem;
  padding: 3rem 5rem;
    filter: drop-shadow(-1rem 1rem 1rem rgb(51, 51, 51));
}
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #148A4E;
    border-radius: 0.4rem;
    color: black;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  select {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #148A4E;
    border-radius: 0.4rem;
    color: black;
    width: 100%;
    font-family: "Poppins", sans-serif;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #148A4E;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #148A4E;
    }
  }
  span {
    color: black;
    text-transform: uppercase;
    a {
      color: #148A4E;
      text-decoration: none;
      font-weight: bold;
    }
  }

`;

export default Register
