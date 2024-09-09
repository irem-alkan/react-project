import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../edit.css';

const EditCustomer = ({ onSave, onCancel, onDelete }) => {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);
    const [updatedCustomer, setUpdatedCustomer] = useState(null);
    const [error, setError] = useState(null);
    const [tempJobs, setTempJobs] = useState([]);
    const [tempRelations, setTempRelations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await fetch(`https://localhost:44358/api/customer/${id}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch customer with id ${id}`);
                }
                const data = await response.json();
                setCustomer(data);
                setUpdatedCustomer(data);
                setTempJobs(data.customerJobs || []);
                setTempRelations(data.customerRelations || []);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch customer.");
            }
        };

        fetchCustomer();
    }, [id]);

    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().split('T')[0];
    };

    const handleInputChange = (e, type, index) => {
        const { name, value } = e.target;

        if (type === 'job') {
            const updatedJobs = [...tempJobs];
            updatedJobs[index] = {
                ...updatedJobs[index],
                [name]: name.includes('Date') ? new Date(value).toISOString() : value
            };
            setTempJobs(updatedJobs);
        } else if (type === 'relation') {
            const updatedRelations = [...tempRelations];
            updatedRelations[index] = { ...updatedRelations[index], [name]: value };
            setTempRelations(updatedRelations);
        } else {
            setUpdatedCustomer(prevState => ({ ...prevState, [name]: value }));
        }
    };

    const handleAction = (actionType, type, index) => {
        switch (actionType) {
            case 'add':
                if (type === 'job') {
                    setTempJobs([...tempJobs, { companyName: '', startDate: '', endDate: '', salary: '', position: '' }]);
                } else if (type === 'relation') {
                    setTempRelations([...tempRelations, { relationType: '', relatedPersonFullName: '' }]);
                }
                break;
            case 'save':
                handleSave(updatedCustomer);
                break;
            case 'delete':
                handleDelete();
                break;
            default:
                break;
        }
    };


    const handleSave = async (updatedCustomer) => {

        try {
            const response = await fetch(`https://localhost:44358/api/customer/${updatedCustomer.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...updatedCustomer,
                    customerJobs: tempJobs,
                    customerRelations: tempRelations
                }),
            });

            const responseData = await response.json(); // Yanıt verisini al

            if (!response.ok) {
                throw new Error(`Failed to save customer: ${responseData.message || 'Unknown error'}`);
            }

            console.log('Customer saved successfully');
            if (onSave) {
                onSave();
            }
            navigate('/list'); // Liste ekranına yönlendiriyoruz
        } catch (error) {
            console.error('Error saving customer:', error);
            setError(`Error saving customer: ${error.message}`);
        }
    };


    const handleDelete = async () => {
        try {
            const response = await fetch(`https://localhost:44358/api/customer/${updatedCustomer.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                console.log('Customer deleted successfully');
                if (onDelete) {
                    onDelete();
                }
                navigate('/list');
            } else {
                console.error('Failed to delete customer');
            }
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    const handleRemoveJob = (index) => {
        const updatedJobs = tempJobs.filter((_, jobIndex) => jobIndex !== index);
        setTempJobs(updatedJobs);
    };

    const handleRemoveRelation = (index) => {
        const updatedRelations = tempRelations.filter((_, relationIndex) => relationIndex !== index);
        setTempRelations(updatedRelations);
    };

    const handleCancel = (type) => {
        if (type === 'job') {
            setTempJobs([...customer.customerJobs]);
        } else if (type === 'relation') {
            setTempRelations([...customer.customerRelations]);
        }
    };

    if (error) return <p className="error-message">{error}</p>;

    if (!updatedCustomer) return <p>Loading...</p>;

    return (
        <div className="edit-customer-form">
            <h2>Edit Customer</h2>
            <form>
                <label>
                    Name:
                    <input type="text" name="name" value={updatedCustomer.name || ''} onChange={(e) => handleInputChange(e)} />
                </label>
                <label>
                    Surname:
                    <input type="text" name="surname" value={updatedCustomer.surname || ''} onChange={(e) => handleInputChange(e)} />
                </label>
                <label>
                    Customer Type:
                    <input type="text" name="customerType" value={updatedCustomer.customerType || ''} onChange={(e) => handleInputChange(e)} />
                </label>
                <label>
                    Net Income Amount:
                    <input type="number" name="netIncomeAmount" value={updatedCustomer.netIncomeAmount || ''} onChange={(e) => handleInputChange(e)} />
                </label>
                <label>
                    TC:
                    <input type="text" name="tc" value={updatedCustomer.tc || ''} onChange={(e) => handleInputChange(e)} />
                </label>

                <div className="customer-jobs-section">
                    <h3>Customer Jobs</h3>
                    {tempJobs.map((job, index) => (
                        <div key={index} className="job-form">
                            <label>
                                Company Name:
                                <input type="text" name="companyName" value={job.companyName || ''} onChange={(e) => handleInputChange(e, 'job', index)} />
                            </label>
                            <label>
                                Start Date:
                                <input type="date" name="startDate" value={formatDate(job.startDate)} onChange={(e) => handleInputChange(e, 'job', index)} />
                            </label>
                            <label>
                                End Date:
                                <input type="date" name="endDate" value={formatDate(job.endDate)} onChange={(e) => handleInputChange(e, 'job', index)} />
                            </label>
                            <label>
                                Salary:
                                <input type="number" name="salary" value={job.salary || ''} onChange={(e) => handleInputChange(e, 'job', index)} />
                            </label>
                            <label>
                                Position:
                                <input type="text" name="position" value={job.position || ''} onChange={(e) => handleInputChange(e, 'job', index)} />
                            </label>
                            <button type="button" onClick={() => handleRemoveJob(index)}>Remove Job</button>
                            <button type="button" onClick={() => handleCancel('job')}>Cancel Job</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => handleAction('add', 'job')}>Add Job</button>
                </div>

                <div className="customer-relations-section">
                    <h3>Customer Relations</h3>
                    {tempRelations.map((relation, index) => (
                        <div key={index} className="relation-form">
                            <label>
                                Relation Type:
                                <input type="text" name="relationType" value={relation.relationType || ''} onChange={(e) => handleInputChange(e, 'relation', index)} />
                            </label>
                            <label>
                                Related Person Full Name:
                                <input type="text" name="relatedPersonFullName" value={relation.relatedPersonFullName || ''} onChange={(e) => handleInputChange(e, 'relation', index)} />
                            </label>
                            <button type="button" onClick={() => handleRemoveRelation(index)}>Remove Relation</button>
                            <button type="button" onClick={() => handleCancel('relation')}>Cancel Relation</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => handleAction('add', 'relation')}>Add Relation</button>
                </div>

                <button type="button" onClick={() => handleAction('save')}>Save</button>
                <button type="button" onClick={() => handleAction('delete')}>Delete</button>
                <button type="button" onClick={onCancel}>Cancel All Changes</button>
            </form>
        </div>
    );
};

export default EditCustomer;
