import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Campus from './pages/Campus';
import Students from './pages/Student';
import Company from './pages/Company';
import Grad from './pages/grad';
import Hstudent from './pages/Hstudent';
import Hcompany from './pages/Hcompany';
import Hcampus from './pages/Hcampus';
import Hgrad from './pages/Hgrad';
import Jobpost from './pages/jobpost';
import Coupdate from './pages/Coupdate';
import Supdate from './pages/Supdate';
import Gupdate from './pages/Gupdate';
import Caupdate from './pages/Caupdate';
import OnCampus from './pages/Oncampus';
import Jobdetai from './pages/jobdetai';



export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/campus" element={<Campus/>}/>
          <Route path="/student" element={<Students/>}/>
          <Route path="/company" element={<Company/>}/>
          <Route path="/grad" element={<Grad/>}/>
          <Route path="/hstud" element={<Hstudent/>}/>
          <Route path="/hcomp" element={<Hcompany/>}/>
          <Route path="/hcamp" element={<Hcampus/>}/>
          <Route path="/hgrad" element={<Hgrad/>}/>
          <Route path="/hcomp/jobs" element={<Jobpost/>}/>
          <Route path="/Coupdate" element={<Coupdate/>}/>
          <Route path="/Supdate" element={<Supdate/>}/>
          <Route path="/Gupdate" element={<Gupdate/>}/>
          <Route path="/Caupdate" element={<Caupdate/>}/>
          <Route path="/oncamp" element={<OnCampus/>}/>
          <Route path="/jdet" element={<Jobdetai/>}/>
        </Routes>
      </BrowserRouter>
  );
}
