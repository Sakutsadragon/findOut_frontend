import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../assets/logoo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { caDetailsRoute, caUpdateRoute } from '../utils/APIRoutes';

function Caupdate() {
    const navigate = useNavigate();
    const storedUserId = JSON.parse(localStorage.getItem("findoutc"));

    const [vals, setvals] = useState({
        userId: storedUserId,
        collageName: "",
        collageId: "",
        nirf: 0,
        rating: 0,
        ctype: "",
        placementMail: "",
        address: "",
        placeBroucher: null,
    });

    const toastOptions = {
        position: "bottom-right",
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
    };

    useEffect(() => {
        const fetchCampusDetails = async () => {
            try {
                const { data } = await axios.get(`${caDetailsRoute}${storedUserId}`);
                if (data.status) {
                    console.log(data);
                    setvals(data.user);  // Populate with the existing campus data
                }
            } catch (error) {
                toast.error('Failed to fetch campus details.', toastOptions);
            }
        };

        fetchCampusDetails();
    }, [storedUserId]);

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
                placeBroucher
            } = vals;

            const formData = new FormData();
            formData.append("userId", userId);
            formData.append("collageName", collageName);
            formData.append("collageId", collageId);
            formData.append("nirf", nirf);
            formData.append("rating", rating);
            formData.append("ctype", ctype);
            formData.append("placementMail", placementMail);
            formData.append("address", address);
            if (placeBroucher) {
                formData.append("placeBroucher", placeBroucher);
            }

            try {
                const { data } = await axios.put(`${caUpdateRoute}${storedUserId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (data.status === false) {
                    toast.error(data.msg, toastOptions);
                }
                if (data.status === true) {
                    toast.success('Details updated successfully', toastOptions);
                    navigate("/hcamp");
                }
            } catch (error) {
                toast.error('Update failed. Please try again.', toastOptions);
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
        } = vals;

        if (!collageName || !collageId || !nirf || !rating || !ctype || !placementMail || !address) {
            toast.error('All fields are required.', toastOptions);
            return false;
        }

        return true;
    };

    const textchan = (event) => {
        const { name, value } = event.target;
        setvals({ ...vals, [name]: value });
    };

    const handleFileChange = (event) => {
        setvals({ ...vals, placeBroucher: event.target.files[0] });
    };

    return (
        <div>
            <Formfiller>
            <form onSubmit={clisubmission}>
    <div className="brand">
        <img src={Logo} alt="" />
    </div>
    <label htmlFor="userId">User ID</label>
    <input type='text' id="userId" value={vals.userId} readOnly />

    <label htmlFor="collageName">University Name</label>
    <input type='text' id="collageName" placeholder='University Name' name="collageName" value={vals.collageName} onChange={textchan} />

    <label htmlFor="collageId">University ID</label>
    <input type='text' id="collageId" placeholder='University Id:' name="collageId" value={vals.collageId} onChange={textchan} />

    <label htmlFor="nirf">NIRF Ranking</label>
    <input type='number' id="nirf" placeholder='NIRF Ranking:' name="nirf" value={vals.nirf} min={0} onChange={textchan} />

    <label htmlFor="rating">FindOut Rating</label>
    <input type='number' id="rating" placeholder='FindOut Rating:' name="rating" value={vals.rating} min={0} max={10} step="0.1" onChange={textchan} />

    <label htmlFor="ctype">Collage Type</label>
    <select id="ctype" name="ctype" value={vals.ctype} onChange={textchan}>
        <option value="" disabled>Collage Type</option>
        <option value="iit">IIT</option>
        <option value="nit">NIT</option>
        <option value="iiit">IIIT</option>
        <option value="bits">BITS</option>
        <option value="other">Others</option>
    </select>

    <label htmlFor="placementMail">Placement-Cell Mail ID</label>
    <input type='text' id="placementMail" placeholder='Placement-Cell Mail Id:' name="placementMail" value={vals.placementMail} onChange={textchan} />

    <label htmlFor="address">Location City</label>
    <input type='text' id="address" placeholder='Location City:' name="address" value={vals.address} onChange={textchan} />

    <label htmlFor="placBroucher">Upload Placement Broucher (optional)</label>
    <input type="file" id="placBroucher" name="placeBroucher" onChange={handleFileChange} />

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
label {
  font-weight: bold;
  margin-bottom: -1rem;
  margin-top: -0.5rem;
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

export default Caupdate;
