import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const DebugAuth = () => {
  const { user, isAuthenticated, loading } = useAuth();
  
  useEffect(() => {
    console.log('🔍 Debug Auth Context:');
    console.log('  - Loading:', loading);
    console.log('  - Authenticated:', isAuthenticated);
    console.log('  - User:', user);
    console.log('  - User Role:', user?.role);
    console.log('  - User Email:', user?.email);
    console.log('  - Token:', localStorage.getItem('token') ? 'Present' : 'Missing');
    console.log('  - Stored User:', localStorage.getItem('user'));
  }, [user, isAuthenticated, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px', background: '#1e1e2a', color: 'white', minHeight: '100vh' }}>
      <h1>Debug Auth Context</h1>
      <pre style={{ background: '#2a2a3a', padding: '10px', borderRadius: '5px' }}>
        {JSON.stringify({ user, isAuthenticated, loading }, null, 2)}
      </pre>
    </div>
  );
};

export default DebugAuth;
