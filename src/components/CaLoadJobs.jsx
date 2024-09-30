import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CJobLoadRoute, CApplyJobRoute } from '../utils/APIRoutes';

const lakhs = 100000;

const CaLoadJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [page, setPage] = useState(1); 
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadJobs = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        const userId = JSON.parse(localStorage.getItem("findoutc"));
        console.log(userId);
        try {
            const response = await axios.get(`${CJobLoadRoute}${userId}`, {
                params: {
                    page,
                    limit: 10,
                },
            });

            const newJobs = response.data.data;
            if (newJobs.length === 0) {
                setHasMore(false);
            } else {
                setJobs((prevJobs) => [...prevJobs, ...newJobs]);
                setPage((prevPage) => prevPage + 1);
            }
        } catch (error) {
            console.error('Error loading jobs:', error);
        }
        setLoading(false);
    }, [page, hasMore, loading]);

    const applyForJob = async (jobId) => {
        const userId = JSON.parse(localStorage.getItem("findoutc"));

        try {
            const response = await axios.post(CApplyJobRoute, {
                userId,
                jobId,
            });

            if (response.data.status) {
                toast.success("Successfully applied for the job!");
            } else {
                toast.error(response.data.msg);
            }
        } catch (error) {
            toast.error('Failed to apply for the job.');
            console.error('Error applying for the job:', error);
        }
    };

    useEffect(() => {
        loadJobs();
    }, [loadJobs]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            loadJobs();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <CaLoadJobsWrapper>
            <h2>On-Campus Recruiting Posts</h2>
            <ul>
                {jobs.map((job, index) => (
                    <li key={index} className='jobsblock'>
                        <h3>{job.roleName}</h3>
                        <p><strong>Job Description:</strong> {job.jobDescription}</p>
                        <p><strong>Location:</strong> {job.location}</p>
                        <p>
                            <strong>Stipend:</strong> Rs. {job.stipend < 1 ? job.stipend * lakhs : job.stipend} {job.stipend < 1 ? '' : 'lakhs'}
                        </p>
                        <p><strong>Required CGPA:</strong> {job.cgpaReq}</p>
                        <p><strong>Required NIRF Ranking:</strong> {job.nirfReq}</p>
                        <p><strong>Required Rating:</strong> {job.ratingReq}</p>
                        <p><strong>Duration:</strong> {job.duration}</p>
                        <p><strong>Deadline:</strong> {job.deadline}</p>
                        <a href={job.applicationLink} target="_blank" rel="noopener noreferrer">Apply Link</a>
                        <button onClick={() => applyForJob(job._id)}>Apply Now</button>
                    </li>
                ))}
            </ul>
            {loading && <p>Loading more jobs...</p>}
            {!hasMore && <p>No more jobs to load.</p>}
        </CaLoadJobsWrapper>
    );
};

const CaLoadJobsWrapper = styled.div`
  width: 70vw;
  max-width: 600px;
  background-color: rgb(300, 300, 300);
  padding-top: 7rem;
  padding-left:4rem;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: none;

  h2 {
    color: #148A4E;
    margin-bottom:1rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  button{
    margin-top:1rem;
  }

  .jobsblock{
     border: 1px solid #ddd;
     border-radius:5px;
     padding: 2rem;
  }

  li {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
  }

  h3 {
    color: #148A4E;
  }

  p {
    color: black;
    strong {
      font-weight: bold;
    }
  }

  p:last-child {
    color: #888;
  }

  @media (max-width: 768px) {
    width: 90vw;
    padding: 1rem;
    ul {
      padding: 0;
    }
  }
`;


export default CaLoadJobs;
