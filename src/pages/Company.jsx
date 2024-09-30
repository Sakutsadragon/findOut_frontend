import React ,{ useState,useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from "styled-components"
import Logo from"../assets/logoo.png"
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/ReactToastify.css"
import axios from "axios";
import { compRoute } from '../utils/APIRoutes';
function Company() {
  const location = useLocation();
  const navigate = useNavigate();
  const values  = location.state;
  const [vals, setvals] = useState({
      userId: values.username,
      companyName: "",
      companyId:"",
      githubLink: "",
      cbroucher: null,
  });



  const toastOptions = {
      position: "bottom-right",
      autoClose: 4000,
      pauseOnHover: true,
      draggable: true,
  };

  const clisubmission = async (event) => {
      event.preventDefault();
      if (validentry()) {
        const {   
          userId,
          companyName,
          companyId,
          githubLink,
          cbroucher, } = vals;
          console.log(companyName);
          console.log(companyId);
          console.log(githubLink);

          try {
            
              const { data } = await axios.post(compRoute,{
                userId,
                companyName,
                companyId,
                githubLink,
                cbroucher,
            });
              
              if (data.status === false) {
                  toast.error(data.msg, toastOptions);
              }
              if (data.status === true) {
                localStorage.setItem("findoutco", JSON.stringify(values.username));
          
                  navigate("/hcomp");
              }
          } catch (error) {
              console.log(error);
              toast.error('Submission failed. Please try again.', toastOptions);
          }
      }
  };

  const validentry = () => {
      return true;
  };

  const textchan = (event) => {
      const { name, value } = event.target;
      setvals({ ...vals, [name]: value });
  };

  const handleFileChange = (event) => {
      setvals({ ...vals, cbroucher: event.target.files[0] });
  };

  const handleSkillChange = (ev) => {
      const selectedOptions = Array.from(ev.target.selectedOptions).map(option => option.value);
      setvals({ ...vals, skills: selectedOptions });
  };

  return (
      <div>
          <Formfiller>
              <form onSubmit={clisubmission}>
                  <div className="brand">
                      <img src={Logo} alt="" />
                  </div>
                  <input type='text' placeholder={values.username} readOnly></input>
                  <input type='text' placeholder={values.email} readOnly></input>
                  <input type='text' placeholder='Company Name' name="companyName" onChange={textchan}></input>
                  <input type='text' placeholder='Company Id:' name="companyId" onChange={textchan}></input>
                  <label htmlFor="resume">Upload Company Broucher:</label>
                  <input type="text" id="cbroucher" name="cbroucher" placeholder='Company Broucher' onChange={textchan}></input>
                  <input type="text" placeholder='Github Link' name="githubLink" onChange={textchan}></input>
                  <button type='submit'>Continue</button>
              </form>
          </Formfiller>
          <ToastContainer />
      </div>
  );
}

const Formfiller = styled.div`
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
    height: 2.8rem;
    transform: scale(2.8);
    margin-bottom:2rem;
    margin-top: 0.3rem;
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
width:80vw;
max-width:600px;
  overflow-y:scroll;
  scrollbar-width:none;
gap: 1.5rem;
background-color: rgb(300,300,300);
border-radius-bottom: 2rem;
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
  label{
  margin-bottom:-1rem;
  margin-top:-0.5rem;
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


export default Company;
