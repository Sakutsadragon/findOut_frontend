import React, { useState } from 'react'; // Remove useLocation from here
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import useLocation from react-router-dom
import styled from "styled-components";
import Logo from "../assets/logoo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { campusRoute } from '../utils/APIRoutes';
function Campus() {
  const location = useLocation();
    const navigate = useNavigate();
    const  values  = location.state;
    const [vals, setvals] = useState({
        userId: values.username,
        collageName: "",
        collageId: "",
        nirf: 0,
        rating: 0,
        ctype: "",
        placementMail:"",
        address:"",
        placeBroucher: null,
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
            collageName,
                      collageId,
                      nirf,
                      rating,
                      ctype,
                      placementMail,
                      address,
                      placeBroucher, } = vals;

            try {
                const { data } = await axios.post(campusRoute,{
                      userId,
                      collageName,
                      collageId,
                      nirf,
                      rating,
                      ctype,
                      placementMail,
                      address,
                      placeBroucher,
              });
                
                if (data.status === false) {
                    toast.error(data.msg, toastOptions);
                }
                if (data.status === true) {
                  localStorage.setItem("findoutc", JSON.stringify(values.username));
                    navigate("/hcamp");
                }
            } catch (error) {
                toast.error('Submission failed. Please try again.', toastOptions);
            }
        }
    };

    const validentry = () => {
        const {
          collageName,
          collageId,
          nirf,
          rating,
          ctype,
          placementMail,
          address,
          placeBroucher, } = vals;
        
        return true;
    };

    const textchan = (event) => {
        const { name, value } = event.target;
        setvals({ ...vals, [name]: value });
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
                    <input type='text' placeholder='University Id:' name="collageId" onChange={textchan}></input>
                    <input type='number' placeholder='NIRF Ranking:' name="nirf" min={0} onChange={textchan}></input>
                    <input type='number' placeholder='FindOut Rating:' name="rating" min={0} max={10} step="0.1" onChange={textchan}></input>

                    <select name="ctype" onChange={textchan}>
                        <option value="" disabled selected hidden>Collage Type</option>
                        <option value="iit">IIT</option>
                        <option value="nit">NIT</option>
                        <option value="iiit">IIIT</option>
                        <option value="bits">BITS</option>
                        <option value="other">Others</option>
                    </select>
                    <input type='text' placeholder='Placement-Cell Mail Id:' name="placementMail" onChange={textchan}></input>
                    <input type='text' placeholder='Location City:' name="address" onChange={textchan}></input>

                    <label htmlFor="resume">Upload Placement Broucher:</label>
                    <input type="text" id="placBroucher" name="placeBroucher" placeholder='Placement Broucher Link' onChange={textchan}></input>
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

  

export default Campus;
