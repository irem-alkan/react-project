import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../List.css';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useState({
        name: '',
        surname: '',
        tc: ''
    });
    const navigate = useNavigate();

    // Veriyi API'den çekme
    const fetchCustomerData = async () => {
        try {
            // Arama terimlerini URLSearchParams ile oluştur
            const query = new URLSearchParams(searchParams).toString();

            // Eğer query string boşsa, veriyi çekme
            if (query) {
                const response = await fetch(`https://localhost:44358/api/customer?${query}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok.");
                }
                const data = await response.json();
                setCustomers(data);
            } else {
                setCustomers([]); // Filtreleme kriteri yoksa boş liste göster
            }
        } catch (err) {
            console.error("Failed to fetch customers:", err);
            setError("Failed to fetch customers.");
        }
    };


    // searchParams değiştiğinde veri çekme
    useEffect(() => {
        fetchCustomerData();
    }, [searchParams]);

    // Arama terimlerini güncelleme
    const handleSearchChange = (e) => {
        setSearchParams(prevParams => ({
            ...prevParams,
            [e.target.name]: e.target.value
        }));
    };

    // Müşteri düzenleme işlevi
    const handleEditClick = (customer) => {
        navigate(`/edit-customer/${customer.id}`);
    };

    // Müşteri silme işlevi
    const handleDelete = async (customerId) => {
        try {
            const response = await fetch(`https://localhost:44358/api/customer/${customerId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const responseData = await response.json();
                throw new Error(`Failed to delete customer: ${responseData.message || 'Unknown error'}`);
            }

            fetchCustomerData(); // Verileri tekrar getirme
        } catch (err) {
            console.error("Failed to delete customer:", err);
            setError(`Failed to delete customer: ${err.message}`);
        }
    };

    return (
        <div className="customer-list-container">
            <button className="refresh-button" onClick={fetchCustomerData}>Refresh Data</button>
            {error && <p className="error-message">{error}</p>}

            <div className="customer-section">
                <h2>Customer List</h2>
            <div className="search-container">
                <input
                    type="text"
                    name="name"
                    placeholder="Search by name"
                    value={searchParams.name}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <input
                    type="text"
                    name="surname"
                    placeholder="Search by surname"
                    value={searchParams.surname}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <input
                    type="text"
                    name="tc"
                    placeholder="Search by TC"
                    value={searchParams.tc}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Customer Type</th>
                            <th>Net Income Amount</th>
                            <th>TC</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.length > 0 ? (
                            customers.map(customer => (
                                <tr key={customer.id}>
                                    <td>{customer.id || 'N/A'}</td>
                                    <td>{customer.name || 'N/A'}</td>
                                    <td>{customer.surname || 'N/A'}</td>
                                    <td>{customer.customerType || 'N/A'}</td>
                                    <td>
                                        {typeof customer.netIncomeAmount === 'number' && !isNaN(customer.netIncomeAmount)
                                            ? customer.netIncomeAmount.toLocaleString()
                                            : 'N/A'}
                                    </td>
                                    <td>{customer.tc || 'N/A'}</td>
                                    <td>
                                        <button onClick={() => handleEditClick(customer)}>Edit</button>
                                        <button onClick={() => handleDelete(customer.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No customers found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomerList;
