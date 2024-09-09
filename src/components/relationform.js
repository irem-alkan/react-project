import React, { useState } from 'react';

const Relationform = ({ addRelation }) => {
    const [relationData, setrelationData] = useState({
        RelationType: '',
        RelatedPersonFullName: '',
    });

    const submitRelation = (e) => {
        e.preventDefault();
        addRelation(relationData)
        setrelationData({ RelationType: '', RelatedPersonFullName: ''});
    };

    return (
        <form onSubmit={submitRelation} className="relation-form">

            <input
                type="text"
                value={relationData.RelationType}
                onChange={(e) => setrelationData({ ...relationData, RelationType: e.target.value })}
                placeholder="Relation Type"
                pattern="[A-Za-z]+"
                required
            />

            <input
                type="text"
                value={relationData.RelatedPersonFullName}
                onChange={(e) => setrelationData({ ...relationData, RelatedPersonFullName: e.target.value })}
                placeholder="Related Person Full Name"
                pattern="[A-Za-z]+"
                required
            />

            <button type="submit">Add</button>
        </form>
    );
};

export default Relationform;