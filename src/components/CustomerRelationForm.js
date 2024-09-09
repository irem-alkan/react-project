import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelationForm from './relationform';

const CustomerRelationForm = ({ addRelation }) => {
   // const [customerData, setCustomerData] = useState(null);
    const [relations, setRelations] = useState([]);
    const [relationType, setRelationType] = useState('');
    const [relatedPersonFullName, setRelatedPersonFullName] = useState('');
    const [relationFormvisiable, setRelationFormVisiable] = useState(false);
    const [message, setMessage] = useState(null);

    const addRelationToList = (newRelation) => {
        setRelations([...relations, newRelation]);
        addRelation(newRelation);//
        setRelationFormVisiable(false);
    };

    return (
        <div>

            <div className="relation-list-container">
                <h2 style={{ color: '#333' }}>Relation:</h2>
                {relations.length === 0 ? (
                    <p>No relations added yet.</p>
                ) : (
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Relation Type</th>
                                <th>Related Person Full Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {relations.map((relation, index) => (
                                <tr key={index}>
                                    <td>{relation.RelationType}</td>
                                    <td>{relation.RelatedPersonFullName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <button onClick={() => setRelationFormVisiable(true)}>
                Add New Relation
            </button>
            {relationFormvisiable && <RelationForm addRelation={addRelationToList} />}
        </div>
    );
};

export default CustomerRelationForm;

