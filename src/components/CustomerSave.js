import React, { useState } from 'react';
import axios from 'axios';
import CustomerForm from './CustomerForm';
import CustomerRelationForm from './CustomerRelationForm';
import CustomerJobForm from './CustomerJobForm';
import '../Save.css';

const CustomerSave = () => {
    const [customerData, setCustomerData] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [relations, setRelations] = useState([]);
    const [message, setMessage] = useState(null);
    const [jobFormVisible, setJobFormVisible] = useState(false);
    const [relationFormVisible, setRelationFormVisible] = useState(false);

    const handleSubmitToDB = async () => {
        if (!customerData) {
            setMessage('Please fill out customer data first.');
            return;
        }

        try {
            customerData.customerJobs = jobs;
            customerData.customerRelations = relations;

            console.log('Sending data:', customerData);

            await axios.post('https://localhost:44358/api/customer', customerData);
            setMessage('Customer, jobs, and relations saved successfully!');
            setJobs([]);
            setRelations([]);
            setCustomerData(null);

        } catch (error) {
            console.error('Failed to save data:', error.response ? error.response.data : error.message);
            setMessage('Failed to save data.');
        }
    };

    const addCustomerData = (data) => {
        setCustomerData(data);
    };

    const addJobToList = (newJob) => {
        setJobs([...jobs, newJob]);
        setJobFormVisible(false);
    };

    const addRelationToList = (newRelation) => {
        setRelations([...relations, newRelation]);
        setRelationFormVisible(false);
    };

    return (
        <div className="customerForm">
            <CustomerForm addCustomerData={addCustomerData} />
            <CustomerRelationForm addRelation={addRelationToList} />
            <CustomerJobForm addJob={addJobToList} />
            <button onClick={handleSubmitToDB}>Save Customer, Jobs, and Relations to DB</button>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default CustomerSave;
