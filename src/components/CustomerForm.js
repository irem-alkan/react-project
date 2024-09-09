import React, { useState } from 'react';

const CustomerForm = ({ addCustomerData }) => {
    const [customerData, setCustomerData] = useState({
        Name: '',
        Surname: '',
        CustomerType: '',
        NetIncomeAmount: '',
        TC: '',
        Email: ''
    });

    const [tcError, setTcError] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleTCChange = (e) => {
        const { value } = e.target;
        if (/^\d*$/.test(value) && value.length <= 11) {
            setCustomerData(prevState => {
                const newCustomerData = { ...prevState, TC: value };
                if (value.length === 11) {
                    setTcError('');
                    addCustomerData(newCustomerData);
                } else {
                    setTcError('TC kimlik numarası 11 haneli olmalıdır.');
                }
                return newCustomerData;
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerData(prevState => {
            const newCustomerData = { ...prevState, [name]: value };

            if (name === 'Email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    setEmailError('Geçerli bir e-posta adresi girin.');
                } else {
                    setEmailError('');
                }
            }

            addCustomerData(newCustomerData);
            return newCustomerData;
        });
    };

    return (
        <form>
            <div className="form-group">
                <label style={{ textAlign: 'left' }}>Name:</label>
                <input
                    type="text"
                    name="Name"
                    value={customerData.Name}
                    onChange={handleChange}
                    placeholder="First Name"
                    pattern="[A-Za-z]+"
                    required
                    style={{ marginLeft: '10px' }}
                />
            </div>

            <div className="form-group">
                <label style={{ textAlign: 'left' }}>Surname:</label>
                <input
                    type="text"
                    name="Surname"
                    value={customerData.Surname}
                    onChange={handleChange}
                    placeholder="Last Name"
                    pattern="[A-Za-z]+"
                    required
                    style={{ marginLeft: '10px' }}
                />
            </div>

            <div className="form-group">
                <label style={{ textAlign: 'left' }}>Customer Type:</label>
                <select
                    name="CustomerType"
                    value={customerData.CustomerType}
                    onChange={handleChange}
                    required
                    style={{ marginLeft: '10px' }}
                >
                    <option value="">Select Customer Type</option>
                    <option value="Personal">Personal</option>
                    <option value="Non-personal">Non-personal</option>
                </select>
            </div>

            <div className="form-group">
                <label style={{ textAlign: 'left' }}>Net Income Amount:</label>
                <input
                    type="number"
                    name="NetIncomeAmount"
                    value={customerData.NetIncomeAmount}
                    onChange={handleChange}
                    placeholder="Net Income Amount"
                    min="0"
                    step="0.01"
                    required
                    style={{ marginLeft: '10px' }}
                />
            </div>

            <div className="form-group">
                <label style={{ textAlign: 'left' }}>TC:</label>
                <input
                    type="text"
                    name="TC"
                    value={customerData.TC}
                    onChange={handleTCChange}
                    placeholder="TC"
                    maxLength="11"
                    pattern="\d*"
                    required
                    style={{ marginLeft: '10px' }}
                />
                {tcError && <p style={{ color: 'red', marginLeft: '10px' }}>{tcError}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="Email">Email:</label>
                <input
                    type="email"
                    id="Email"
                    name="Email"
                    value={customerData.Email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    style={{ marginLeft: '10px' }}
                />
                {emailError && <p style={{ color: 'red', marginLeft: '10px' }}>{emailError}</p>}
            </div>
        </form>
    );
};

export default CustomerForm;
