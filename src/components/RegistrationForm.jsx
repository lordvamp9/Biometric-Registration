import React, { useState } from 'react';
import BiometricScanner from './BiometricScanner';

const RegistrationForm = ({ onComplete }) => {
    const [isVerified, setIsVerified] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isVerified) {
            onComplete();
        }
    };

    return (
        <div className="main-wrapper">
            <div className="visual-panel">
                <div className="panel-overlay"></div>
                <div className="brand-container">
                    <img src="/logo.png" alt="BioLogistics Logo" className="brand-logo" />
                    <div className="brand-text">
                        <h2>Secure Logistics Network</h2>
                        <p>Next-generation identity verification for the global supply chain.</p>
                    </div>
                </div>
            </div>

            <div className="form-panel">
                <div className="form-container">
                    <header>
                        <h1>Driver Registration</h1>
                        <p>Complete your profile to join the fleet.</p>
                    </header>

                    <form id="registrationForm" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="fullName">Full Name</label>
                            <div className="input-wrapper">
                                <svg className="input-icon" viewBox="0 0 24 24">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                <input type="text" id="fullName" placeholder="Enter full name" required />
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="email">Email Address</label>
                            <div className="input-wrapper">
                                <svg className="input-icon" viewBox="0 0 24 24">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                                <input type="email" id="email" placeholder="name@company.com" required />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="input-group">
                                <label htmlFor="vehicleType">Vehicle Type</label>
                                <div className="select-wrapper">
                                    <select id="vehicleType" required defaultValue="">
                                        <option value="" disabled>Select type</option>
                                        <option value="truck">Heavy Truck</option>
                                        <option value="van">Delivery Van</option>
                                        <option value="fleet">Fleet Car</option>
                                    </select>
                                    <svg className="chevron-icon" viewBox="0 0 24 24">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </div>
                            </div>
                            <div className="input-group">
                                <label htmlFor="plate">License Plate</label>
                                <input type="text" id="plate" placeholder="ABC-1234" required />
                            </div>
                        </div>

                        <BiometricScanner onVerify={() => setIsVerified(true)} />

                        <div className="form-footer">
                            <button type="submit" id="submitBtn" className="btn-submit" disabled={!isVerified}>
                                Complete Registration
                            </button>
                        </div>
                    </form>

                    <footer className="legal-footer">
                        <p>&copy; {new Date().getFullYear()} BioLogistics Inc. Secure Enrollment.</p>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
