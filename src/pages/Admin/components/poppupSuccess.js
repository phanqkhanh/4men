import React from 'react';

const PoppupSuccess = ({ success }) => {
    return (
        <div className="success">
            <div>
                <h3>{success}</h3>
            </div>
        </div>
    );
};

export default PoppupSuccess;
