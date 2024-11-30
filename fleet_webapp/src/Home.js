import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to My React App</h1>
      <p>Click the button below to Login or Register:</p>
      <Link to="/auth">
        <button style={{ padding: '10px 20px', fontSize: '16px' }}>Go to Login/Register</button>
      </Link>
    </div>
  );
}

export default Home;
