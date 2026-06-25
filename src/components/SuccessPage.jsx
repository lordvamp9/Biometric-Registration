import React from 'react';

const SuccessPage = () => {
    return (
        <div className="success-wrapper">
            <div className="success-card">
                <div className="icon-circle">
                    <svg viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <h1>Registration Successful</h1>
                <p>Your biometric data has been verified and your driver profile is now active on the BioLogistics network.</p>
                <a href="/" className="btn-dashboard">Return to Start</a>
            </div>
        </div>
    );
};

export default SuccessPage;
