import React, { useState } from 'react';

const JobForm = ({ addJob }) => {
    const [jobData, setJobData] = useState({
        CompanyName: '',
        StartDate: '',
        EndDate: '' || null,
        Position: '',
        Salary: '',
    });
    const submitJob = (e) => {
        e.preventDefault();
        addJob(jobData)
        setJobData({ CompanyName: '', StartDate: '', EndDate: '', Position: '', Salary: '' });
    };
    return (<form onSubmit={submitJob} className="job-form">

        <input
            type="text"
            value={jobData.CompanyName}
            onChange={(e) => setJobData({ ...jobData, CompanyName: e.target.value })}
            placeholder="Company Name"
            pattern="[A-Za-z]+"
            required
        />


        <input
            type="date"
            value={jobData.StartDate}
            onChange={(e) => setJobData({ ...jobData, StartDate: e.target.value })}
            placeholder="Start Date"
            required
        />


        <input
            type="date"
            value={jobData.EndDate}
            onChange={(e) => setJobData({ ...jobData, EndDate: e.target.value })}
            placeholder="End Date"
        />



        <input
            type="text"
            value={jobData.Position}
            onChange={(e) => setJobData({ ...jobData, Position: e.target.value })}
            placeholder="Position"
            pattern="[A-Za-z]+"
            required
        />



        <input
            type="number"
            value={jobData.Salary}
            onChange={(e) => setJobData({ ...jobData, Salary: e.target.value })}
            placeholder="Salary"
            min="0"
            step="0.01"
            required
        />


        <button type="submit">Add</button>
    </form>)
}
export default JobForm;