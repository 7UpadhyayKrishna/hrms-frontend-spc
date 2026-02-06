import React from 'react';
import { useAuth } from '../../context/AuthContext';

const TestManagerHome = () => {
  const { user, isAuthenticated } = useAuth();
  
  console.log('🧪 TestManagerHome - Component rendered');
  console.log('🧪 User:', user);
  console.log('🧪 Authenticated:', isAuthenticated);
  
  return (
    <div style={{ padding: '20px', background: '#1e1e2a', color: 'white', minHeight: '100vh' }}>
      <h1>Test Manager Dashboard</h1>
      <div style={{ background: '#2a2a3a', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
        <h2>Debug Information:</h2>
        <pre style={{ background: '#1a1a2a', padding: '10px', borderRadius: '5px' }}>
          {JSON.stringify({ user, isAuthenticated }, null, 2)}
        </pre>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Welcome, {user?.firstName} {user?.lastName}!</h3>
        <p>Your role: {user?.role}</p>
        <p>Your email: {user?.email}</p>
        <p>Status: {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</p>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={() => window.location.href = '/debug'}
          style={{ 
            background: '#4a5568', 
            color: 'white', 
            padding: '10px 20px', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Go to Debug Page
        </button>
      </div>
    </div>
  );
};

export default TestManagerHome;
