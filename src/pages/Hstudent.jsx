import React ,{ useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components"
import Logo from"../assets/logo2.png"
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/ReactToastify.css"
import axios from "axios";
import LoadJobs from '../components/LoadJobs';

function Hstudent() {
  const navigate = useNavigate();
  const [currentUser,setCurrentUser]=useState(undefined);
  const [loadingUser,setLoadingUser]=useState(true);
  const [isLoaded, setIsLoaded] =useState(false);

  const setUser = async ()=>{
      if(!localStorage.getItem("findouts")){
        navigate('/login');
      }
      else{
        setCurrentUser(await JSON.parse(localStorage.getItem("findouts")));
        setIsLoaded(true);
        setTimeout(async()=>{
          setLoadingUser(false);
        },1000)
      }
    }
    
    async function logout() {
      await localStorage.clear();
      navigate("/login");
  }

  function updat(){
    navigate("/Supdate");
  }

    useEffect(()=>{
      setUser();
    },[])
    
  return (
    <HstudentWrapper>
    <div className='header'>
    <div className="brand">
         <img src={Logo} alt="" />
     </div>
     <h4>{currentUser ? currentUser : "Loading.."}</h4>
     <button onClick={updat}>Update</button>
     <button onClick={logout}>Logout</button>
     </div>
     <LoadJobs></LoadJobs>
 <ToastContainer/>
  </HstudentWrapper>
  )
}


const HstudentWrapper = styled.div`
   width: 100vw;
  height: 100vh; /* Full height of the viewport */
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;

  .mainbody {
    background-color: white;
    width: 70vw;
    max-width: 100%; /* Ensures it fits on small screens */
    filter: drop-shadow(-1rem 1rem 1rem rgb(51, 51, 51));
    overflow-y: auto; /* Enables scrolling */
    scrollbar-width: none;
    
    height: calc(100vh); /* Full height minus header */
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%; /* Full width */
    max-width: 100%; /* Ensures it scales on smaller screens */
    background-color: rgb(300, 300, 300);
    padding: 1rem 2rem;
    border-bottom: 1px solid #ddd;
    filter: drop-shadow(-0.2rem 0.2rem 0.2rem rgb(51, 51, 51));
    position: fixed;
    top: 0;
    z-index: 1000;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      height: 1.8rem;
      transform: scale(1.8);
      align-items: center;
      margin-left: 2rem;
    }
  }

  h4 {
    color: black;
  }

  button {
    background-color: #148A4E;
    color: white;
    padding: 0.8rem 1.5rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    &:hover {
      background-color: #148A4E;
    }
  }

  @media (max-width: 768px) {
    .mainbody {
      width: 90vw;
      margin-top: 5rem; /* Adjust for smaller screens */
      height: calc(100vh - 5rem);
    }
    .header {
      padding: 0.5rem 1rem;
    }
  }
`;



export default Hstudent
