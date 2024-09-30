import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../assets/logoo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { SupdateRoute, SgetdetailsRoute } from '../utils/APIRoutes';

function Supdate() {
    const navigate = useNavigate();
    const [vals, setVals] = useState({
        collageName: "",
        completionYear: "",
        dtype: "",
        branch: "",
        cgpa: 0,
        skills: [],
        githubLink: "",
        resume: null,
    });

    useEffect(() => {
        fetchStudentDetails();
    }, []);

    const fetchStudentDetails = async () => {
        try {
            const userId = JSON.parse(localStorage.getItem("findouts"));
            const { data } = await axios.get(`${SgetdetailsRoute}${userId}`);
            if (data) {
                setVals({
                    collageName: data.data.collageName,
                    completionYear: data.data.completionYear,
                    dtype: data.data.dtype,
                    branch: data.data.branch,
                    cgpa: data.data.cgpa,
                    skills: data.data.skills,
                    githubLink: data.data.githubLink,
                    resume: null, 
                });
            }
        } catch (error) {
            toast.error('Failed to load student details');
        }
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        if (validentry()) {
            const userId = JSON.parse(localStorage.getItem("findouts"));
            const formData = new FormData();
            Object.keys(vals).forEach(key => {
                formData.append(key, vals[key]);
            });
            formData.append("userId", userId);

            try {
                const { data } = await axios.put(`${SupdateRoute}${userId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                if (data.status === true) {
                    navigate("/hstud");
                } else {
                    toast.error(data.msg);
                }
            } catch (error) {
                toast.error('Update failed. Please try again.');
            }
        }
    };

    const validentry = () => {
        const { collageName, completionYear, dtype, branch, cgpa, githubLink } = vals;
        if (collageName.length === 0) {
            toast.error('Enter College Name');
            return false;
        }
        if (completionYear < 2000 || completionYear > 2035) {
            toast.error('Enter Valid Completion Year');
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
        if (cgpa < 6.5) {
            toast.error('Select Your CGPA range');
            return false;
        }
        if (githubLink.length === 0) {
            toast.error('Please Provide your Github link');
            return false;
        }
        return true;
    };

    const handleFileChange = (event) => {
        setVals({ ...vals, resume: event.target.files[0] });
    };

    const handleSkillChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
        setVals({ ...vals, skills: selectedOptions });
    };

    const textchan = (event) => {
        const { name, value } = event.target;
        setVals({ ...vals, [name]: value });
    };

    return (
        <div>
            <Formfiller>
                <form onSubmit={handleUpdate}>
                    <div className="brand">
                        <img src={Logo} alt="" />
                    </div>
                    <input type='text' placeholder='University Name' name="collageName" value={vals.collageName} onChange={textchan}></input>
                    <input type='date' placeholder='Expected Completion Date' name="completionYear" value={vals.completionYear} onChange={textchan}></input>

                    <select name="dtype" value={vals.dtype} onChange={textchan}>
                        <option value="" disabled>Select Degree</option>
                        <option value="bte">B.Tech</option>
                        <option value="mte">M.Tech</option>
                        <option value="dual">Dual Degree</option>
                    </select>

                    <input type='text' placeholder='Major Course' name="branch" value={vals.branch} onChange={textchan}></input>

                    <select name="cgpa" value={vals.cgpa} onChange={textchan}>
                        <option value="" disabled>Select CGPA</option>
                        <option value="9">Greater than 9</option>
                        <option value="8.5">8.5 to 9</option>
                        <option value="8">8 to 8.5</option>
                        <option value="7.5">7.5 to 8</option>
                        <option value="7">7 to 7.5</option>
                        <option value="6.5">Below 7</option>
                    </select>

                    <select name="skills" multiple value={vals.skills} onChange={handleSkillChange}>
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

                    <label htmlFor="resume">Upload Resume:</label>
                    <input type="file" id="resume" name="resume" onChange={handleFileChange}></input>

                    <input type="text" placeholder='Github Link' name="githubLink" value={vals.githubLink} onChange={textchan}></input>
                    <button type='submit'>Update</button>
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

export default Supdate;
