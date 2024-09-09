import React, { useState } from 'react';
import axios from 'axios';
import JobForm from './jobform';


const CustomerJobForm = ({ addJob }) => {
    const [jobs, setJobs] = useState([]);
    const [companyName, setCompanyName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [position, setPosition] = useState('');
    const [salary, setSalary] = useState('');
    const [message, setMessage] = useState(null);
    const [jobFormvisiable, setjobFormvisiable] = useState(false);
    
    const addJobToList = (newJob) => {       
        setJobs([...jobs, newJob]);
        addJob(newJob);
        setjobFormvisiable(false);
    };  

    return (
        <div>

            <div className="job-list-container">

                <h2 style={{ color: '#333' }}>Jobs:</h2>

                {jobs.length === 0 ? (
                    <p>No jobs added yet.</p>
                ) : (
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Company Name</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Position</th>
                                <th>Salary</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job, index) => (
                                <tr key={index}>
                                    <td>{job.CompanyName}</td>
                                    <td>{job.StartDate}</td>
                                    <td>{job.EndDate}</td>
                                    <td>{job.Position}</td>
                                    <td>{job.Salary}</td>
                                  
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <button onClick={()=>setjobFormvisiable(true)}>
                Add New Job.
            </button>
            {jobFormvisiable && <JobForm addJob={addJobToList} />}             
           
             

        </div>
    );
};

export default CustomerJobForm;
