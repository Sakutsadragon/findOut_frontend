import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import styled from "styled-components";
import { debounce } from 'lodash'; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { JobLoadRoute, ApplyJobRoute } from '../utils/APIRoutes';
import { useNavigate, useLocation } from 'react-router-dom';

function LoadJobs() {
    const lakhs = 100000;
    const navigate = useNavigate();
    const location = useLocation();
    const [jobs, setJobs] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const jobIdsFetched = useRef(new Set()); // To keep track of job IDs

    function jobdeta(job) {
        navigate('/jdet', { state: { job } });
    }

    const loadJobs = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        const userId = JSON.parse(localStorage.getItem("findouts"));
        try {
            const response = await axios.get(`${JobLoadRoute}${userId}`, {
                params: { page, limit: 10 },
            });

            const newJobs = response.data.data;

            // Filter out jobs that have already been added
            const uniqueJobs = newJobs.filter(job => !jobIdsFetched.current.has(job._id));

            // Add new jobs to set to keep track of already fetched jobs
            uniqueJobs.forEach(job => jobIdsFetched.current.add(job._id));

            if (uniqueJobs.length === 0) {
                setHasMore(false);
            } else {
                setJobs((prevJobs) => [...prevJobs, ...uniqueJobs]);
                setPage((prevPage) => prevPage + 1);
            }

        } catch (error) {
            console.error('Error loading jobs:', error);
        }
        setLoading(false);
    }, [page, hasMore, loading]);

    useEffect(() => {
        loadJobs();
    }, []);

    const applyForJob = async (jobId, applicationLink) => {
        const userId = JSON.parse(localStorage.getItem("findouts"));

        try {
            const response = await axios.post(ApplyJobRoute, { userId, jobId });

            if (response.data.status) {
                window.open(applicationLink, '_blank');
                toast.success("Successfully applied for the job!");
            } else {
                toast.error(response.data.msg);
            }
        } catch (error) {
            toast.error('Failed to apply for the job.');
            console.error('Error applying for the job:', error);
        }
    };

    const handleScroll = useCallback(
        debounce(() => {
            if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
                loadJobs();
            }
        }, 200),
        [loadJobs]
    );

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <LoadJobsWrapper>
            <div>
                <h2>Job Listings</h2>
                <ul>
                    {jobs.map((job, index) => (
                        <li key={index} className='jobsblock'>
                            <h3>{job.userId}</h3>
                            <p>{job.roleName}</p>
                            <p>{job.location}</p>
                            <p>
                                <strong>Stipend:</strong> Rs. {job.stipend < 1 ? job.stipend * lakhs : job.stipend} {job.stipend < 1 ? '' : 'lakhs'}
                            </p>
                            <p><strong>Required CGPA:</strong> {job.cgpaReq}</p>
                            <p>{job.duration}</p>
                            <p><strong>Deadline:</strong> {job.deadline}</p>
                            <p className='knowMore' onClick={() => jobdeta(job)}>Know More</p>
                            <button onClick={() => applyForJob(job._id, job.applicationLink)}>Apply Now</button>
                        </li>
                    ))}
                </ul>
                {loading && <p>Loading more jobs...</p>}
                {!hasMore && <p>No more jobs to load.</p>}
            </div>
            <ToastContainer />
        </LoadJobsWrapper>
    );
};

const LoadJobsWrapper = styled.div`
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
    .knowMore{
    cursor:pointer;
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

export default LoadJobs;
