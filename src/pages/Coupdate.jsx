import React ,{ useState,useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from "styled-components"
import Logo from"../assets/logoo.png"
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/ReactToastify.css"
import axios from "axios";
import { CoupdateRoute, CgetdetailsRoute } from '../utils/APIRoutes';

function Cupdate() {
    const navigate = useNavigate();
    const [companyDetails, setCompanyDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [companyName, setCompanyName] = useState("");
    const [companyId, setCompanyId] = useState("");
    const [githubLink, setGithubLink] = useState("");
    const [cbroucher, setCbroucher] = useState(null);

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem("findoutco"));
                console.log("Stored User:", storedUser); // Debugging line
    
                if (!storedUser) {
                    navigate("/login");
                    return;
                }
    
                const { data } = await axios.get(`${CgetdetailsRoute}${storedUser}`);
                if (data.status) {
                    const company = data.data;
                    setCompanyDetails(company);
                    setCompanyName(company.companyName || "");
                    setCompanyId(company.companyId || "");
                    setGithubLink(company.githubLink || "");
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching company details:", error);
                toast.error("Failed to load company details");
                setLoading(false);
            }
        };
    
        fetchCompanyDetails();
    }, [navigate]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const storedUser = JSON.parse(localStorage.getItem("findoutco"));
            const formData = new FormData();
            formData.append("companyName", companyName);
            formData.append("companyId", companyId);
            formData.append("githubLink", githubLink);
            if (cbroucher) {
                formData.append("cbroucher", cbroucher);
            }

            const response = await axios.put(`${CoupdateRoute}${storedUser}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.data.status) {
                toast.success("Company details updated successfully");
                navigate("/dashboard");
            } else {
                toast.error("Failed to update company details");
            }
        } catch (error) {
            toast.error("Error updating company details");
        }
    };

    return (
        <Formfiller>
        <div>
            {loading ? (
                <h4>Loading...</h4>
            ) : (
                <form onSubmit={handleSubmit}>
                     <div className="brand">
                      <img src={Logo} alt="" />
                  </div>
                    <div>
                        <label>Company Name:</label>
                        <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Company ID:</label>
                        <input
                            type="text"
                            value={companyId}
                            onChange={(e) => setCompanyId(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Github Link:</label>
                        <input
                            type="text"
                            value={githubLink}
                            onChange={(e) => setGithubLink(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Upload Broucher:</label>
                        <input
                            type="file"
                            onChange={(e) => setCbroucher(e.target.files[0])}
                        />
                    </div>
                    <button type="submit">Update Company</button>
                </form>
            )}
            <ToastContainer />
        </div>
        </Formfiller>
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
  padding-bottom:1rem;
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

export default Cupdate;
