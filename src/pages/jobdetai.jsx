import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../assets/logoo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Jobdetai() {
    const lakhs = 100000;
    const navigate = useNavigate();
    const location = useLocation();
    const vals = location.state;
    const currentUser = vals.job;

    return (
        <JobDetailsWrapper>
            <JobContainer>
                <div className="brand">
                    <img src={Logo} alt="Company Logo" />
                </div>
                <JobInfo>
                    <h3>{currentUser.userId}</h3>
                    <h2>{currentUser.rolename}</h2>
                    <p>{currentUser.jobDescription}</p>

                    {currentUser.jtype === "inte" && (
                        <>
                            <p><strong>Internship</strong></p>
                            <p><strong>Duration:</strong> {currentUser.duration}</p>
                            <p><strong>Stipend:</strong> Rs. {currentUser.stipend < 1 ? currentUser.stipend * lakhs : currentUser.stipend} {currentUser.stipend < 1 ? '' : 'lakhs'}</p>
                        </>
                    )}

                    {currentUser.jtype === "full" && (
                        <p><strong>CTC per Annum:</strong> Rs. {currentUser.stipend}</p>
                    )}

                    <p><strong>Location:</strong> {currentUser.location}</p>
                    <p><strong>CGPA Required:</strong> {currentUser.cgpaReq}</p>
                    <p><strong>Experience Required:</strong> {currentUser.experienceReq} years</p>
                    <p><strong>Application Link:</strong> <a href={currentUser.applicationLink} target="_blank" rel="noopener noreferrer">{currentUser.applicationLink}</a></p>
                    <p><strong>Deadline:</strong> {currentUser.deadline}</p>
                </JobInfo>

                <ApplyButton onClick={() => window.open(currentUser.applicationLink, '_blank')}>Apply Now</ApplyButton>
            </JobContainer>
            <ToastContainer />
        </JobDetailsWrapper>
    );
}

const JobDetailsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
  padding: 1rem;
`;

const JobContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  width: 35%;
  max-width: 800px;
  padding: 1rem;
  border-radius:2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;

  .brand img {
    height: 100px;
    margin-bottom: 1.5rem;
  }
`;

const JobInfo = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h2 {
    color: #148A4E;
    margin-bottom: 0.5rem;
  }

  h3 {
    color: #333;
    margin-bottom: 1rem;
  }

  p {
    color: #555;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    strong {
      color: #333;
    }
    a {
      color: #148A4E;
      text-decoration: none;
    }
  }
`;

const ApplyButton = styled.button`
  background-color: #148A4E;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  text-transform: uppercase;
  transition: background-color 0.3s;

  &:hover {
    background-color: #106E3B;
  }
`;

export default Jobdetai;
