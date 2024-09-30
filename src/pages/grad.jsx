import React ,{ useState,useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from "styled-components"
import Logo from"../assets/logoo.png"
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/ReactToastify.css"
import axios from "axios";
import { gradRoute } from '../utils/APIRoutes';
function Grad() {
  const location = useLocation();
    const navigate = useNavigate();
    const values  = location.state;
    const [vals, setvals] = useState({
        userId: values.username,
        collageName: "",
        completionYear: 0,
        dtype: "",
        branch: "",
        exp:"",
        jtype:"",
        previoussal:"",
        skills: [],
        githubLink: "",
        resume: null,
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
          const {userId,
            collageName,
            completionYear,
            dtype,
            branch,
            exp,
            jtype,
            previoussal,
            skills,
            githubLink,
            resume, } = vals;

            try {
                const { data } = await axios.post(gradRoute,{
                  userId,
                  collageName,
                  completionYear,
                  dtype,
                  branch,
                  exp,
                  jtype,
                  previoussal,
                  skills,
                  githubLink,
                  resume,
              });
                
                if (data.status === false) {
                    toast.error(data.msg, toastOptions);
                }
                if (data.status === true) {
                  localStorage.setItem("findoutg", JSON.stringify(values.username));
                    navigate("/hgrad");
                }
            } catch (error) {
                toast.error('Submission failed. Please try again.', toastOptions);
            }
        }
    };

    const validentry = () => {
        const {
          collageName,
          completionYear,
          dtype,
          branch,
          exp,
          jtype,
          previoussal,
          skills,
          githubLink,
          resume, } = vals;
          console.log(exp);
        if (collageName.length === 0) {
            toast.error('Enter College Name');
            return false;
        }
        if (dtype.length === 0) {
            toast.error('Enter Degree Type');
            return false;
        }
        if (branch.length === 0) {
            toast.error('Enter Valid Branch');
            return false;
        }
        if (githubLink.length === 0) {
            toast.error('Please Provide your Github link');
            return false;
        }
        if (!vals.resume) {
            toast.error('Please upload your resume');
            return false;
        }
        return true;
    };

    const textchan = (event) => {
        const { name, value } = event.target;
        setvals({ ...vals, [name]: value });
    };

    const handleFileChange = (event) => {
        setvals({ ...vals, resume: event.target.files[0] });
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
                    <input type='text' placeholder='University Name' name="collageName" onChange={textchan}></input>
                    <input type='date' placeholder='Expected Completion Date' name="completionYear" onChange={textchan}></input>                    
                    <select name="dtype" onChange={textchan}>
                        <option value="" disabled selected hidden>Select Degree</option>
                        <option value="bte">B.Tech</option>
                        <option value="mte">M.Tech</option>
                        <option value="dual">Dual Degree</option>
                    </select>
                    <input type='text' placeholder='Major Course  (Eg.Computer Science)' name="branch" onChange={textchan}></input>
                    <input type='number' placeholder='Experience in Years' name="exp" min={0} onChange={textchan}></input>

                   <select name="jtype" onChange={textchan}>
                        <option value="" disabled selected hidden>Searching for Job</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select> 
                   {vals.jtype === "yes" && (
                    <select name="previoussal" onChange={textchan}>
                      <option value="" disabled selected hidden>Previous Salary per Annum</option>
                      <option value="10"> Less than 10 lakhs</option>
                      <option value="15">10-15 lakhs</option>
                      <option value="20">15-20 lakhs</option>
                      <option value="25">20-25 lakhs</option>
                      <option value="35">25-35 lakhs</option>
                      <option value="45">35-45 lakhs</option>
                      <option value="50">Greater than 50 lakhs</option>
                    </select>
                  )}
                    <select name="skills" multiple onChange={handleSkillChange}>
                        <option value="" disabled selected hidden>Add Skills</option>
                        <option value="fst">Full Stack Developer</option>
                        <option value="frnt">Frontend Developer</option>
                        <option value="backend">Backend Developer</option>
                        <option value="ml">Machine Learning</option>
                        <option value="dl">Deep Learning</option>
                        <option value="fan">Finance Analyst</option>
                        <option value="mark">Marketing Analyst</option>
                        <option value="dataanlyst">Data Analyst</option>
                        <option value="appdev">App Development</option>
                        <option value="gamedev">Game Development</option>
                        <option value="uiux">UI/UX Design</option>
                    </select>

                    <label htmlFor="resume">Upload Resume:</label>
                    <input type="text" id="resume" name="resume" placeholder='Your Resume Link' onChange={textchan}></input>

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


export default Grad;
