import React, { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import SuccessPage from './components/SuccessPage';

function App() {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegistrationComplete = () => {
    setIsRegistered(true);
  };

  return (
    <>
      {isRegistered ? (
        <SuccessPage />
      ) : (
        <RegistrationForm onComplete={handleRegistrationComplete} />
      )}
    </>
  );
}

export default App;
