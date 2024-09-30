import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../assets/logoo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { jobRoute } from '../utils/APIRoutes';

function Jobpost() {
    const navigate = useNavigate();
    const location = useLocation();
     const currentUser = location.state;
    const [vals, setvals] = useState({
        userId:currentUser,
        roleName:"",
        jtype:"",
        jobDescription:"",
        duration:0,
        location:"",
        stipend:0,
        cgpaReq:0,
        skillsReq:[],
        experienceReq:0,
        applicationLink:"",
        deadline:"",
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
            roleName,
            jobDescription,
            jtype,
            duration,
            location,
            stipend,
            cgpaReq,
            skillsReq,
            experienceReq,
            applicationLink,
            deadline, } = vals;
            console.log(userId);
            console.log(roleName);
            console.log(skillsReq);
            console.log(jtype);
            console.log(duration);
            console.log(location);

            try {
                const { data } = await axios.post(jobRoute,{
                    userId,
                    roleName,
                    jobDescription,
                    jtype,
                    duration,
                    location,
                    stipend,
                    cgpaReq,
                    skillsReq,
                    experienceReq,
                    applicationLink,
                    deadline,
              } );
                
                if (data.status === false) {
                    toast.error(data.msg, toastOptions);
                    alert("Job posted Successfully!!");
                }
            } catch (error) {
                toast.error('Submission failed. Please try again.', toastOptions);
            }
        }
    };

    const validentry = () => {
        const {userId,
            roleName,
            jobDescription,
            jtype,
            duration,
            location,
            stipend,
            cgpaReq,
            skillsReq,
            experienceReq,
            applicationLink,
            deadline, } = vals;
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
      setvals({ ...vals, skillsReq: selectedOptions });
    };

    return (







        <div>
            <Formfiller>
                <form onSubmit={clisubmission}>
                    <div className="brand">
                        <img src={Logo} alt="" />
                    </div>
                    <input type='text' placeholder='Role Name' name="roleName" onChange={textchan}></input>
                    <input type='text' placeholder='Job Description' name="jobDescription" onChange={textchan}></input>
                    <select name="jtype" onChange={textchan}>
                        <option value="" disabled selected hidden>Select Job type</option>
                        <option value="full">Full-Time</option>
                        <option value="inte">Internship</option>
                        <option value="train">Training </option>
                    </select>
                    {vals.jtype==="inte" && (<><input type='text' placeholder='Intern Duration' name="duration" onChange={textchan}></input>
                  <input type='number' placeholder='Stipend mention per month or total in lakhs' min={0} step={0.01} name="stipend" onChange={textchan}></input></>)}
                  {vals.jtype==="full" && (<input type='number' placeholder='CTC per Annum in Lakhs' name="stipend" min={0} step={0.01} onChange={textchan}></input>)}
                  <input type='text' placeholder='Location' name="location" onChange={textchan}></input>

                  <select name="cgpaReq" onChange={textchan}>
                        <option value="" disabled selected hidden>Grade(CGPA)</option>
                        <option value="9">Greater than 9</option>
                        <option value="8.5">Above 8.5</option>
                        <option value="8">Above 8</option>
                        <option value="7.5">Above 7.5</option>
                        <option value="7">Above 7</option>
                        <option value="6.5">Any</option>
                    </select>
                  <select name="skillsReq" multiple onChange={handleSkillChange}>
                        <option value="" disabled selected hidden>Add Skills</option>
                        <option value="fst">Full Stack Developer</option>
                        <option value="frnt">Frontend Developer</option>
                        <option value="backend">Backend Developer</option>
                        <option value="ml">Machine Learning</option>
                        <option value="dl">Deep Learning</option>
                        <option value="fan">Finance Analyst</option>
                        <option value="dataanlyst">Data Analyst</option>
                        <option value="appdev">App Development</option>
                        <option value="gamedev">Game Development</option>
                        <option value="uiux">UI/UX Design</option>
                    </select>
                    <input type="number" placeholder='Experience Required in Years' name="experienceReq" min={0} onChange={textchan}></input>
                    <input type="text" placeholder='Application Link' name="applicationLink" onChange={textchan}></input>
                    <input type="date" placeholder='Application Closing Date' name="deadline" onChange={textchan}></input>
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
;
`
export default Jobpost;

