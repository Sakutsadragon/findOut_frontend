import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../assets/logoo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { OnCampusRoute } from '../utils/APIRoutes';

function OnCampus() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentUser = location.state;
    
    const [vals, setVals] = useState({
        userId: currentUser,
        roleName: "",
        jobDescription: "",
        jtype: "",
        duration: "",
        location: "",
        stipend: 0,
        cgpaReq: 0,
        nirfReq: 0,
        ratingReq: 0,
        applicationLink: "",
        deadline: "",
        applied: [],
    });

    const toastOptions = {
        position: "bottom-right",
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validEntry()) {
            const { userId, roleName, jobDescription, jtype, duration, location, stipend, cgpaReq, nirfReq, ratingReq, applicationLink, deadline } = vals;

            try {
                const { data } = await axios.post(OnCampusRoute, {
                    userId,
                    roleName,
                    jobDescription,
                    jtype,
                    duration,
                    location,
                    stipend,
                    cgpaReq,
                    nirfReq,
                    ratingReq,
                    applicationLink,
                    deadline
                });

                if (data.status === false) {
                    toast.error(data.msg, toastOptions);
                } else {
                    toast.success("On-campus opportunity posted successfully!", toastOptions);
                }
            } catch (error) {
                toast.error('Submission failed. Please try again.', toastOptions);
            }
        }
    };

    const validEntry = () => {
        const { roleName, jobDescription, jtype, location, stipend, cgpaReq } = vals;
        if (!roleName || !jobDescription || !jtype || !location || !stipend || !cgpaReq) {
            toast.error('Please fill out all required fields.', toastOptions);
            return false;
        }
        return true;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setVals({ ...vals, [name]: value });
    };

    const handleNirfChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
        setVals({ ...vals, nirfReq: selectedOptions });
    };

    return (
        <FormWrapper>
            <form onSubmit={handleSubmit}>
                <div className="brand">
                    <img src={Logo} alt="Logo" />
                </div>
                <input type='text' placeholder='Role Name' name="roleName" onChange={handleChange} />
                <input type='text' placeholder='Job Description' name="jobDescription" onChange={handleChange} />
                
                <select name="jtype" onChange={handleChange}>
                    <option value="" disabled selected hidden>Select Job Type</option>
                    <option value="full">Full-Time</option>
                    <option value="inte">Internship</option>
                </select>
                
                {vals.jtype === "inte" && (
                    <>
                        <input type='text' placeholder='Internship Duration' name="duration" onChange={handleChange} />
                        <input type='number' placeholder='Stipend (per month)' name="stipend" min={0} onChange={handleChange} />
                    </>
                )}

                {vals.jtype === "full" && (
                    <input type='number' placeholder='CTC (in Lakhs per annum)' name="stipend" min={0} onChange={handleChange} />
                )}
                
                <input type='text' placeholder='Location' name="location" onChange={handleChange} />

                <select name="cgpaReq" onChange={handleChange}>
                    <option value="" disabled selected hidden>Minimum CGPA</option>
                    <option value="9" >Greater than 9</option>
                    <option value="8.5">Above 8.5</option>
                    <option value="8">Above 8</option>
                    <option value="7.5">Above 7.5</option>
                    <option value="7">Above 7</option>
                    <option value="6.5">Any</option>
                </select>

                <input type='number' placeholder='NIRF Ranking Required:' name="nirfReq" min={0} onChange={handleChange}></input>

                <input type='number' placeholder='FindOut Rating Required:' name="ratingReq" min={0} max={10} step="0.1" onChange={handleChange}></input>
                <input type='text' placeholder='Application Link' name="applicationLink" onChange={handleChange} />
                <input type="date" placeholder='Application Closing Date' name="deadline" onChange={handleChange} />
                <button type='submit'>Post Opportunity</button>
            </form>
            <ToastContainer />
        </FormWrapper>
    );
}

const FormWrapper = styled.div`
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
  height:110vh;
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

export default OnCampus;
