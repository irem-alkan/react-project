// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CustomerList from './components/CustomerList';
import CustomerSave from './components/CustomerSave';
import EditCustomer from './components/EditCustomer';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="container">
                <nav className="navbar">
                    <h2>Customer Entry</h2>
                    <Link to="/save" className="button-link">Customer Save</Link>
                    <Link to="/list" className="button-link">Customer List</Link>
                </nav>
                <div className="content">
                    <Routes>
                        <Route path="/save" element={<CustomerSave />} />
                        <Route path="/list" element={<CustomerList />} />
                        <Route path="/edit-customer/:id" element={<EditCustomer />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
