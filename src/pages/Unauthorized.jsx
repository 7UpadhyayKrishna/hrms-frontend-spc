import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Unauthorized = () => {
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    // Debug logging removed for production
  }, [user, isAuthenticated]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950 text-gray-200 px-6">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-3xl font-bold text-white">Unauthorized</h1>
        <p className="text-gray-400">
          You don't have permission to access this area.
        </p>

        {/* Debug Info */}
        <div className="bg-gray-800 p-4 rounded-lg text-left text-sm">
          <h3 className="font-bold mb-2">Debug Info:</h3>
          <p><strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
          <p><strong>User Role:</strong> {user?.role || 'None'}</p>
          <p><strong>User Email:</strong> {user?.email || 'None'}</p>
          <p><strong>Token:</strong> {localStorage.getItem('token') ? 'Present' : 'Missing'}</p>
        </div>

        <Link to="/" className="btn-primary inline-flex justify-center">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
